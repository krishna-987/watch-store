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
        try:
            if not obj.image:
                return None

            url = obj.image.url

            # ✅ Cloudinary (already full URL)
            if url.startswith("http"):
                return url.replace("http://", "https://")

            # ✅ Local development
            return f"http://127.0.0.1:8000{url}"

        except Exception as e:
            print("IMAGE ERROR:", e)
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