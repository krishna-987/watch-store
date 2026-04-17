from django.db import models
from store.models import Payment, Product

class OrderItem(models.Model):
    order = models.ForeignKey(Payment, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.FloatField()