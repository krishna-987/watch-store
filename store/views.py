from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.conf import settings

from .models import Product, Category, Favorite, Payment, Review
from .serializers import ProductSerializer, CategorySerializer

import razorpay


# ================= PRODUCTS =================
@api_view(['GET'])
def get_products(request):
    products = Product.objects.all().select_related('category')

    serializer = ProductSerializer(
        products,
        many=True,
        context={'request': request}   # ✅ IMPORTANT FIX
    )

    return Response(serializer.data)


# ================= CATEGORIES =================
@api_view(['GET'])
def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


# ================= CATEGORY PRODUCTS =================
@api_view(['GET'])
def get_category_products(request, category_id):
    products = Product.objects.filter(category_id=category_id).select_related('category')

    serializer = ProductSerializer(
        products,
        many=True,
        context={'request': request}   # ✅ FIX
    )

    return Response(serializer.data)


# ================= EYEWEAR ONLY =================
@api_view(['GET'])
def get_eyewear_products(request):
    products = Product.objects.filter(category__name__iexact="Eyewear")

    serializer = ProductSerializer(
        products,
        many=True,
        context={'request': request}   # ✅ FIX
    )

    return Response(serializer.data)


# ================= RAZORPAY =================
client = razorpay.Client(
    auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
)


# ================= CREATE ORDER =================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    amount = int(request.data.get('total', 0))

    if amount <= 0:
        return Response({"error": "Invalid amount"}, status=400)

    order = client.order.create({
        "amount": amount * 100,
        "currency": "INR",
        "payment_capture": 1
    })

    Payment.objects.create(
        user=request.user,
        order_id=order['id'],
        amount=amount,
        status="created"
    )

    return Response({
        "success": True,
        "order": order
    })


# ================= VERIFY PAYMENT =================
@api_view(['POST'])
def verify_payment(request):
    try:
        params = {
            'razorpay_order_id': request.data.get('razorpay_order_id'),
            'razorpay_payment_id': request.data.get('razorpay_payment_id'),
            'razorpay_signature': request.data.get('razorpay_signature')
        }

        client.utility.verify_payment_signature(params)

        payment = Payment.objects.get(order_id=params['razorpay_order_id'])
        payment.payment_id = params['razorpay_payment_id']
        payment.status = "success"
        payment.save()

        return Response({"status": "success"})

    except Exception as e:
        return Response({
            "status": "failed",
            "error": str(e)
        })


# ================= FAVORITES =================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_favorites(request):
    favs = Favorite.objects.filter(user=request.user)
    return Response([
        {"product_id": f.product.id} for f in favs
    ])


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_favorite(request):
    product_id = request.data.get("product_id")

    Favorite.objects.get_or_create(
        user=request.user,
        product_id=product_id
    )

    return Response({"added": True})


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_favorite(request, product_id):
    Favorite.objects.filter(
        user=request.user,
        product_id=product_id
    ).delete()

    return Response({"removed": True})


# ================= ADD REVIEW =================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_review(request, product_id):
    try:
        product = Product.objects.get(id=product_id)

        rating = int(request.data.get("rating", 0))
        comment = request.data.get("comment", "")

        if rating < 1 or rating > 5:
            return Response({"error": "Rating must be 1-5"})

        Review.objects.update_or_create(
            user=request.user,
            product=product,
            defaults={
                "rating": rating,
                "comment": comment
            }
        )

        return Response({"success": True})

    except Product.DoesNotExist:
        return Response({"error": "Product not found"})


# ================= GET REVIEWS =================
@api_view(['GET'])
def get_reviews(request, product_id):
    try:
        product = Product.objects.get(id=product_id)

        reviews = product.reviews.all().order_by("-created_at")

        data = [
            {
                "user": r.user.username,
                "rating": r.rating,
                "comment": r.comment,
                "date": r.created_at
            }
            for r in reviews
        ]

        avg = (
            sum([r.rating for r in reviews]) / len(reviews)
            if reviews else 0
        )

        return Response({
            "reviews": data,
            "average": round(avg, 1)
        })

    except Product.DoesNotExist:
        return Response({"error": "Product not found"})