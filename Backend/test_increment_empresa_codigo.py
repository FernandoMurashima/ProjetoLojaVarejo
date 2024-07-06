from django.test import Client
client = Client()
response = client.post('/codigos/empresa/increment/')
print(response.status_code)
print(response.content)
