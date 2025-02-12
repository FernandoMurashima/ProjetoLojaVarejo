import os
import django
from django.utils import timezone

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'systakback.settings')  # Substitua 'systak' pelo nome do seu projeto
django.setup()

from systakapp.models import Cliente  # Importação dos modelos após a configuração do Django

def populate():
    # Apagar os dados existentes
    Cliente.objects.all().delete()

    # Criar novos clientes
    clientes = [
        {
            'Nome_cliente': 'Cliente 1',
            'Apelido': 'Cli1',
            'cpf': '123.456.789-01',
            'Logradouro': 'Rua',
            'Endereco': 'Rua 1',
            'numero': '123',
            'Complemento': 'Apto 1',
            'Cep': '12345-678',
            'Bairro': 'Bairro 1',
            'Cidade': 'Cidade 1',
            'Telefone1': '12345-6789',
            'Telefone2': '98765-4321',
            'email': 'cliente1@example.com',
            'Categoria': 'Categoria 1',
            'Bloqueio': '0',
            'Aniversario': '1990-01-01',
            'MalaDireta': '1',
            'ContaContabil': 'Contabil 1',
            'data_cadastro': timezone.now(),
        },
        # Adicione mais 14 clientes aqui
        {
            'Nome_cliente': 'Cliente 2',
            'Apelido': 'Cli2',
            'cpf': '123.456.789-02',
            'Logradouro': 'Avenida',
            'Endereco': 'Avenida 2',
            'numero': '456',
            'Complemento': 'Casa 2',
            'Cep': '23456-789',
            'Bairro': 'Bairro 2',
            'Cidade': 'Cidade 2',
            'Telefone1': '22345-6789',
            'Telefone2': '29765-4321',
            'email': 'cliente2@example.com',
            'Categoria': 'Categoria 2',
            'Bloqueio': '1',
            'Aniversario': '1985-02-02',
            'MalaDireta': '0',
            'ContaContabil': 'Contabil 2',
            'data_cadastro': timezone.now(),
        },
        # Continue adicionando mais clientes...
    ]

    for cliente_data in clientes:
        cliente = Cliente(**cliente_data)
        cliente.save()

if __name__ == '__main__':
    populate()
    print('População de clientes completa.')
