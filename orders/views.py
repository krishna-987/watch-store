import razorpay
from django.conf import settings

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from store.models import Product
from .models import Payment, OrderItem
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from django.http import HttpResponse

# ================= RAZORPAY CLIENT =================
client = razorpay.Client(
    auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
)


# ================= CREATE ORDER =================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    try:
        total = request.data.get('total', 0)

        total = str(total).replace("₹", "").replace(",", "").strip()
        total = float(total) if total else 0

        amount = int(total * 100)

        if amount <= 0:
            return Response({"success": False, "error": "Invalid amount"})

        if amount > 50000000:
            amount = 50000000

        order = client.order.create({
            "amount": amount,
            "currency": "INR",
            "payment_capture": 1
        })

        Payment.objects.create(
            user=request.user,
            order_id=order['id'],
            amount=total,
            status="pending"
        )

        return Response({
            "success": True,
            "order": order
        })

    except Exception as e:
        print("❌ CREATE ORDER ERROR:", str(e))
        return Response({"success": False, "error": str(e)})


# ================= VERIFY PAYMENT =================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def verify_payment(request):
    try:
        print("ORDER ID:", request.data.get('razorpay_order_id'))
        print("PAYMENT ID:", request.data.get('razorpay_payment_id'))
        print("SIGNATURE:", request.data.get('razorpay_signature'))

        params_dict = {
            'razorpay_order_id': request.data.get('razorpay_order_id'),
            'razorpay_payment_id': request.data.get('razorpay_payment_id'),
            'razorpay_signature': request.data.get('razorpay_signature')
        }

        if not all(params_dict.values()):
            return Response({"success": False, "error": "Missing data"})

        # ✅ REAL VERIFICATION (IMPORTANT)
        client.utility.verify_payment_signature(params_dict)

        payment = Payment.objects.get(
            order_id=params_dict['razorpay_order_id']
        )

        payment.status = "processing"
        payment.save()

        for item in request.data.get('items', []):
            product = Product.objects.get(id=item['id'])

            OrderItem.objects.create(
                order=payment,
                product=product,
                quantity=item['qty'],
                price=item['price']
            )

        return Response({"success": True})

    except Payment.DoesNotExist:
        return Response({"success": False, "error": "Payment not found"})

    except Product.DoesNotExist:
        return Response({"success": False, "error": "Product not found"})

    except Exception as e:
        print("❌ VERIFY ERROR:", str(e))
        return Response({"success": False, "error": str(e)})


# ================= USER ORDER HISTORY =================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_history(request):
    try:
        payments = Payment.objects.filter(
            user=request.user
        ).order_by('-created_at')

        data = []

        for p in payments:
            items = [
                {
                    "name": i.product.name,
                    "qty": i.quantity,
                    "price": i.price,
                    "image": i.product.image.url if i.product.image else ""
                }
                for i in p.items.all()
            ]

            data.append({
                "id": p.id,
                "amount": p.amount,
                "status": p.status,
                "date": p.created_at,
                "items": items
            })

        return Response(data)

    except Exception as e:
        print("❌ HISTORY ERROR:", str(e))
        return Response({"error": "Failed"})


# ================= MONTHLY HISTORY =================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def monthly_history(request):
    try:
        month_param = request.GET.get('month')

        if not month_param:
            return Response({"error": "Month required YYYY-MM"}, status=400)

        year, month = map(int, month_param.split("-"))

        payments = Payment.objects.filter(
            user=request.user,
            created_at__year=year,
            created_at__month=month
        )

        data = [
            {
                "id": p.id,
                "amount": p.amount,
                "status": p.status,
                "date": p.created_at
            }
            for p in payments
        ]

        return Response(data)

    except Exception as e:
        print("❌ MONTHLY ERROR:", str(e))
        return Response({"error": "Invalid request"})


# ================= CANCEL ORDER =================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cancel_order(request, order_id):
    try:
        order = Payment.objects.get(id=order_id, user=request.user)

        if order.status in ["delivered", "shipped"]:
            return Response({"error": "Cannot cancel this order"})

        order.status = "cancelled"
        order.save()

        return Response({"success": True})

    except Payment.DoesNotExist:
        return Response({"error": "Order not found"})


# ================= ADMIN: ALL ORDERS =================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_orders(request):
    print("USER:", request.user)
    print("IS STAFF:", request.user.is_staff)

    if not request.user.is_staff:
        return Response({"error": "Admin only"}, status=403)

    try:
        orders = Payment.objects.all().order_by('-created_at')

        data = []

        for o in orders:
            items = [
                {
                    "name": i.product.name,
                    "qty": i.quantity,
                    "price": i.price,
                    "image": i.product.image.url if i.product.image else ""
                }
                for i in o.items.all()
            ]

            data.append({
                "id": o.id,
                "amount": o.amount,
                "status": o.status,
                "date": o.created_at,
                "items": items
            })

        return Response(data)

    except Exception as e:
        print("❌ ADMIN ERROR:", str(e))
        return Response({"error": "Failed"})


# ================= ADMIN: UPDATE STATUS =================
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_order_status(request, order_id):

    if not request.user.is_staff:
        return Response({"error": "Not authorized"}, status=403)

    try:
        order = Payment.objects.get(id=order_id)

        new_status = request.data.get("status")

        valid_status = ["pending", "processing", "shipped", "delivered", "cancelled"]

        if new_status not in valid_status:
            return Response({"error": "Invalid status"})

        flow = {
            "pending": ["processing", "cancelled"],
            "processing": ["shipped", "cancelled"],
            "shipped": ["delivered"],
        }

        if order.status in flow:
            if new_status not in flow[order.status]:
                return Response({
                    "error": f"Cannot change from {order.status} to {new_status}"
                })

        if order.status == "delivered":
            return Response({"error": "Already delivered"})

        order.status = new_status
        order.save()

        return Response({"success": True})

    except Payment.DoesNotExist:
        return Response({"error": "Order not found"})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def generate_invoice(request, order_id):
    try:
        order = Payment.objects.get(id=order_id, user=request.user)

        # ✅ Create PDF response
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="invoice_{order_id}.pdf"'

        doc = SimpleDocTemplate(response)
        styles = getSampleStyleSheet()

        elements = []

        # ================= HEADER =================
        elements.append(Paragraph("INVOICE", styles['Title']))
        elements.append(Spacer(1, 10))

        elements.append(Paragraph(f"Order ID: {order.id}", styles['Normal']))
        elements.append(Paragraph(f"Date: {order.created_at}", styles['Normal']))
        elements.append(Paragraph(f"Status: {order.status}", styles['Normal']))
        elements.append(Spacer(1, 10))

        # ================= USER =================
        elements.append(Paragraph(f"Customer: {order.user}", styles['Normal']))
        elements.append(Spacer(1, 10))

        # ================= ITEMS =================
        elements.append(Paragraph("Items:", styles['Heading2']))
        elements.append(Spacer(1, 10))

        total = 0

        for item in order.items.all():
            line = f"{item.product.name} - Qty: {item.quantity} - ₹{item.price}"
            elements.append(Paragraph(line, styles['Normal']))

            total += item.price * item.quantity

        elements.append(Spacer(1, 20))

        # ================= TOTAL =================
        elements.append(Paragraph(f"Total Amount: ₹{total}", styles['Heading2']))

        # ================= BUILD PDF =================
        doc.build(elements)

        return response

    except Payment.DoesNotExist:
        return Response({"error": "Order not found"}, status=404)