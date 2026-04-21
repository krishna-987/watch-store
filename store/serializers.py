from rest_framework import serializers
from .models import Category, Product, StoreLocation, AppDownload, Favorite, Order


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    image = serializers.SerializerMethodField()   # ✅ FIX

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'image', 'category', 'category_name']

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            try:
                # ✅ returns full URL (Cloudinary or local)
                return obj.image.url
            except:
                return None
        return None


class StoreLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreLocation
        fields = '__all__'


class AppDownloadSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppDownload
        fields = '__all__'


class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'