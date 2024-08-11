import requests

# Defina a URL do endpoint que você deseja testar
url = 'http://127.0.0.1:8000/colecoes/1/update_contador/'  # Substitua '1' pelo ID da coleção desejada

# Defina o token de autenticação obtido anteriormente
token = 'ce5dacaac7691c4370f4641c1d325c2704765852'  # Substitua com o token real

# Defina os cabeçalhos da solicitação, incluindo o token de autenticação
headers = {
    'Authorization': f'Token {token}',
    'Content-Type': 'application/json'
}

# Defina os dados que você deseja enviar na requisição POST
data = {
    'contador': 1  # Ajuste o valor do contador conforme necessário
}

# Envie a requisição POST para o servidor
response = requests.post(url, headers=headers, json=data)

# Exiba o status da resposta e o conteúdo da resposta em JSON
print("Status Code:", response.status_code)
print("Response JSON:", response.json())

