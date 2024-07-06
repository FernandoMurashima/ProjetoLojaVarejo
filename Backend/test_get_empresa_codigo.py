from django.test import Client
client = Client()
response = client.get('/codigos/empresa/')
print(response.status_code)
print(response.content)
