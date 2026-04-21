from pathlib import Path
from datetime import timedelta

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-key'

DEBUG = False

ALLOWED_HOSTS = [
    "watch-store-nc7y.onrender.com",
    "127.0.0.1",
    "localhost"
]


# ✅ INSTALLED APPS
INSTALLED_APPS = [
    'store',
    'accounts',
    'cart',
    'orders',
    'newsletter',

    'corsheaders',
    'rest_framework',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]


# ✅ MIDDLEWARE
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',

    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',

    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


ROOT_URLCONF = 'config.urls'


# ✅ TEMPLATES
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


WSGI_APPLICATION = 'config.wsgi.application'


# ✅ DATABASE
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# ✅ PASSWORD VALIDATION
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]


# ✅ LANGUAGE
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# ✅ STATIC FILES
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'   # ✅ important for deploy


# ✅ MEDIA FILES
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'


# ✅ EMAIL (⚠️ move to .env in production)
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True

EMAIL_HOST_USER = 'your_email@gmail.com'
EMAIL_HOST_PASSWORD = 'your_app_password'


# ✅ RAZORPAY (⚠️ move to .env)
RAZORPAY_KEY_ID = "your_key"
RAZORPAY_KEY_SECRET = "your_secret"


# ✅ CORS
CORS_ALLOW_ALL_ORIGINS = True


# ✅ DRF
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}


# ✅ JWT
SIMPLE_JWT = {
    'AUTH_HEADER_TYPES': ('Bearer',),
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
}


# ✅ AUTH BACKEND
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
]

import cloudinary
import cloudinary.uploader
import cloudinary.api

cloudinary.config(
    cloud_name="dsm5nz7xb",
    api_key="346983176462263",
    api_secret="vyhE9Prto1fa9PtoZL4QqOkpKG8"
)

DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'