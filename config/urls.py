from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/store/', include('store.urls')),
    path('api/accounts/', include('accounts.urls')),
    path('api/cart/', include('cart.urls')),
    path('api/orders/', include('orders.urls')),
    path('api/newsletter/', include('newsletter.urls')),
   
   
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)