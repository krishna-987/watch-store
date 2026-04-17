from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail


# =========================
# REGISTER
# =========================
@api_view(['POST'])
def register(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Missing fields'}, status=400)

    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already exists'}, status=400)

    User.objects.create_user(
        username=email,
        email=email,
        password=password
    )

    return Response({'success': True})


# =========================
# LOGIN
# =========================


from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail


@api_view(['POST'])  # 🔥 VERY IMPORTANT
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)

    if not user.check_password(password):
        return Response({'error': 'Wrong password'}, status=400)

    refresh = RefreshToken.for_user(user)

    try:
        send_mail(
            'Login Alert',
            f'Hello {user.username}, login successful',
            'krishnarudranair@gmail.com',
            [email],
            fail_silently=False,
        )
    except Exception as e:
        print("EMAIL ERROR:", e)

    return Response({
        'access': str(refresh.access_token),
        'refresh': str(refresh),
    })