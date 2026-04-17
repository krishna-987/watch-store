from django.contrib import admin
from .models import Category, Product

admin.site.register(Category)
admin.site.register(Product)


from django.contrib import admin
from .models import StoreLocation

admin.site.register(StoreLocation)





from .models import AppDownload

admin.site.register(AppDownload)



from django.contrib import admin
from .models import Payment

admin.site.register(Payment)