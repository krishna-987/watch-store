from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Cart, CartItem
from store.models import Product


# =========================
# VIEW CART
# =========================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_cart(request):
    try:
        user = request.user

        # ✅ FIX: correct user relation
        cart, _ = Cart.objects.get_or_create(user=user)

        items = CartItem.objects.filter(cart=cart)

        data = []
        total = 0

        for item in items:
            subtotal = item.product.price * item.quantity
            total += subtotal

            data.append({
                'item_id': item.id,
                'product_id': item.product.id,
                'product': item.product.name,
                'price': item.product.price,
                'quantity': item.quantity,
                'subtotal': subtotal,
                # ✅ SAFE IMAGE
                'image': item.product.image.url if item.product.image and hasattr(item.product.image, 'url') else ''
            })

        return Response({
            'items': data,
            'total': total
        })

    except Exception as e:
        print("VIEW CART ERROR:", e)
        return Response({'error': str(e)}, status=500)


# =========================
# ADD TO CART
# =========================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    try:
        user = request.user

        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))

        print("USER:", user)
        print("PRODUCT ID:", product_id)
        print("QUANTITY:", quantity)

        if not product_id:
            return Response({'error': 'Product ID required'}, status=400)

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=404)

        # ✅ FIX
        cart, _ = Cart.objects.get_or_create(user=user)

        item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product
        )

        if not created:
            item.quantity += quantity
        else:
            item.quantity = quantity

        item.save()

        return Response({'message': 'Added to cart'})

    except Exception as e:
        print("ADD CART ERROR:", e)
        return Response({'error': str(e)}, status=500)


# =========================
# REMOVE FROM CART
# =========================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):
    try:
        user = request.user
        item_id = request.data.get('item_id')

        item = CartItem.objects.get(
            id=item_id,
            cart__user=user
        )

        item.delete()

        return Response({'message': 'Removed'})

    except CartItem.DoesNotExist:
        return Response({'error': 'Item not found'}, status=404)

    except Exception as e:
        print("REMOVE ERROR:", e)
        return Response({'error': str(e)}, status=500)


# =========================
# UPDATE CART
# =========================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_cart(request):
    try:
        user = request.user

        item_id = request.data.get('item_id')
        quantity = int(request.data.get('quantity', 1))

        item = CartItem.objects.get(
            id=item_id,
            cart__user=user
        )

        item.quantity = quantity
        item.save()

        return Response({'message': 'Cart updated'})

    except CartItem.DoesNotExist:
        return Response({'error': 'Item not found'}, status=404)

    except Exception as e:
        print("UPDATE ERROR:", e)
        return Response({'error': str(e)}, status=500)