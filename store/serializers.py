from rest_framework import serializers
from .models import Category, Product, StoreLocation, AppDownload, Favorite, Order


# ================= CATEGORY =================
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


# ================= PRODUCT =================
class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'image', 'category', 'category_name']

    def get_image(self, obj):
        if obj.image:
            try:
                url = obj.image.url

                # ✅ If Cloudinary (already full URL)
                if url.startswith("http"):
                    return url

                # ✅ If local media → convert to full URL
                return f"https://watch-store-nc7y.onrender.com{url}"

            except:
                return None
        return None


# ================= STORE LOCATION =================
class StoreLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreLocation
        fields = '__all__'


# ================= APP DOWNLOAD =================
class AppDownloadSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppDownload
        fields = '__all__'


# ================= FAVORITE =================
class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = "__all__"


# ================= ORDER =================
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'