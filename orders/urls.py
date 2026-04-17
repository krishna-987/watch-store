from django.urls import path
from .views import generate_invoice
from .views import (
    create_order,
    verify_payment,
    order_history,
    monthly_history,
    cancel_order,
    get_all_orders,
    update_order_status,
)

urlpatterns = [
    path('create-order/', create_order),
    path('verify-payment/', verify_payment),
    path('history/', order_history),
    path('monthly/', monthly_history),
    path('cancel/<int:order_id>/', cancel_order),

    # ADMIN
    path('all/', get_all_orders),
    path('update-status/<int:order_id>/', update_order_status),

    path('invoice/<int:order_id>/', generate_invoice),
]