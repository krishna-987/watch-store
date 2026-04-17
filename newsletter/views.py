from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Newsletter

@api_view(['POST'])
def subscribe(request):
    email = request.data.get("email")

    if not email:
        return Response({"message": "Email required"})

    obj, created = Newsletter.objects.get_or_create(email=email)

    if created:
        return Response({"message": "Subscribed successfully ✅"})
    else:
        return Response({"message": "Already subscribed ⚠️"})