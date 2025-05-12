import jwt
from django.http import JsonResponse
from decouple import config

class JWTAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.secret_key = config('SECRET_KEY')

    def __call__(self, request):
        auth_header = request.headers.get('Authorization')
        print(request.headers)
        if auth_header:
            try:
                token = auth_header.split(' ')[1]
                payload = jwt.decode(token, self.secret_key, algorithms=['HS256'])
                request.user_payload = payload 
            except jwt.ExpiredSignatureError:
                return JsonResponse({'error': 'Token expired'}, status=401)
            except jwt.InvalidTokenError:
                return JsonResponse({'error': 'Invalid token'}, status=401)
        else:
            return JsonResponse({'error': 'Authorization header missing'}, status=401)

        return self.get_response(request)
