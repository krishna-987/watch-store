from django.urls import path
from . import views

urlpatterns = [
    # ================= PRODUCTS =================
    path('products/', views.get_products),
    path('categories/', views.get_categories),
    path('products/category/<int:category_id>/', views.get_category_products),
    path('eyewear/', views.get_eyewear_products),

    # ================= ORDERS =================
    path('create-order/', views.create_order),
    path('verify-payment/', views.verify_payment),

    # ================= FAVORITES =================
    path('favorites/', views.get_favorites),
    path('favorites/add/', views.add_favorite),
    path('favorites/remove/<int:product_id>/', views.remove_favorite),

    # ================= REVIEWS =================
    path('reviews/<int:product_id>/', views.get_reviews),
    path('reviews/add/<int:product_id>/', views.add_review),
]