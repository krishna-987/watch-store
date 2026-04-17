from django.urls import path
from . import views
from .views import add_review, get_reviews

from .views import get_products, get_categories, get_category_products
urlpatterns = [
    path('products/', views.get_products),
    path('categories/', views.get_categories),
    path('products/category/<int:category_id>/', views.get_category_products),

    path('create-order/', views.create_order),
    path('verify-payment/', views.verify_payment),

    path('favorites/', views.get_favorites),
    path('favorites/add/', views.add_favorite),
    path('favorites/remove/<int:product_id>/', views.remove_favorite),
    path('eyewear/', views.get_eyewear_products),
    path('reviews/<int:product_id>/', get_reviews),
    path('reviews/add/<int:product_id>/', add_review),
]