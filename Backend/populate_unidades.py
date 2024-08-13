import os
import django

# Configurar as variáveis de ambiente do Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'systakback.settings')
django.setup()

from systakapp.models import Unidade

def populate_unidades():
    unidades = [
        {"Descricao": "Medida de Volume - Litro", "Codigo": "L"},
        {"Descricao": "Medida de Comprimento - Metro", "Codigo": "M"},
        {"Descricao": "Medida de Quantidade - Caixa", "Codigo": "CX"},
        {"Descricao": "Medida de Quantidade - Peça", "Codigo": "P"},
        {"Descricao": "Medida de Quantidade - Resma", "Codigo": "R"},
        {"Descricao": "Medida de Peso - Quilograma", "Codigo": "KG"},
        {"Descricao": "Medida de Volume - Mililitro", "Codigo": "ML"},
        {"Descricao": "Medida de Comprimento - Centímetro", "Codigo": "CM"},
        {"Descricao": "Medida de Volume - Metro Cúbico", "Codigo": "M3"},
        {"Descricao": "Medida de Área - Metro Quadrado", "Codigo": "M2"},
        {"Descricao": "Medida de Tempo - Hora", "Codigo": "H"},
    ]

    for unidade_data in unidades:
        unidade, created = Unidade.objects.get_or_create(**unidade_data)
        if created:
            print(f'Unidade "{unidade.Descricao}" criada com sucesso.')
        else:
            print(f'Unidade "{unidade.Descricao}" já existe.')

if __name__ == '__main__':
    populate_unidades()
