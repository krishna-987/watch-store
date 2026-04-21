from django.db import models
from cloudinary.models import CloudinaryField   # ✅ ADD THIS

# ---------------- CATEGORY ----------------
class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


# ---------------- PRODUCT ----------------
class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.IntegerField()

    image = CloudinaryField('image')   # ✅ CHANGED HERE

    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


# ---------------- STORE LOCATION ----------------
class StoreLocation(models.Model):
    name = models.CharField(max_length=200)
    address = models.TextField()
    city = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return self.name


# ---------------- APP DOWNLOAD ----------------
class AppDownload(models.Model):
    title = models.CharField(max_length=200)
    description1 = models.CharField(max_length=200)
    description2 = models.CharField(max_length=200)
    description3 = models.CharField(max_length=200)
    description4 = models.CharField(max_length=200)

    app_store_link = models.URLField()
    play_store_link = models.URLField()

    def __str__(self):
        return self.title


# ---------------- PAYMENT ----------------
from django.contrib.auth.models import User

class Payment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    order_id = models.CharField(max_length=200, unique=True)
    payment_id = models.CharField(max_length=200, blank=True, null=True)
    signature = models.CharField(max_length=500, blank=True, null=True)
    amount = models.IntegerField()
    status = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)


# ---------------- FAVORITE ----------------
class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey("Product", on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'product')

    def __str__(self):
        return f"{self.user.username} - {self.product}"


# ---------------- ORDER ----------------
class Order(models.Model):
    name = models.CharField(max_length=100)
    total = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# ---------------- REVIEW ----------------
class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey('Product', on_delete=models.CASCADE, related_name="reviews")
    rating = models.IntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.product} ({self.rating})"