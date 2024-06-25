# populate_grupo_subgrupo.py

import os
import django
from django.utils import timezone
from django.db import connection

# Configurações do Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'systakback.settings')
django.setup()

from systakapp.models import Grupo, Subgrupo

# Função para reiniciar a sequência de auto-incremento no SQLite
def reset_sqlite_sequence(table_name):
    with connection.cursor() as cursor:
        cursor.execute(f'DELETE FROM sqlite_sequence WHERE name="{table_name}";')

# Apagar todos os dados existentes nas tabelas Grupo e Subgrupo
Grupo.objects.all().delete()
Subgrupo.objects.all().delete()

# Reiniciar a sequência de auto-incremento das tabelas
reset_sqlite_sequence('systakapp_grupo')
reset_sqlite_sequence('systakapp_subgrupo')

""" # Dados para popular a tabela Grupo e Subgrupo
dados = {
    "Calça": ["Lisa", "Estampada", "Jeans", "Malha"],
    "Saia": ["Lisa", "Estampada", "Jeans", "Malha"],
    "Blusa": ["Lisa", "Estampada", "Tricot"],
    "Vestido": ["Lisa", "Estampada", "Renda"]
}

# Códigos para os grupos e subgrupos
grupo_codigos = {
    "Calça": "10",
    "Saia": "20",
    "Blusa": "30",
    "Vestido": "40"
}

subgrupo_codigos = {
    "Lisa": "01",
    "Estampada": "02",
    "Jeans": "03",
    "Malha": "04",
    "Tricot": "05",
    "Renda": "06"
}

# Populando a tabela Grupo e Subgrupo
for grupo_descricao, subgrupos in dados.items():
    grupo_codigo = grupo_codigos[grupo_descricao]
    grupo, created = Grupo.objects.get_or_create(
        Descricao=grupo_descricao,
        defaults={
            'Codigo': grupo_codigo,
            'Margem': 0.0,
            'data_cadastro': timezone.now()
        }
    )
    if created:
        print(f"Grupo '{grupo.Descricao}' criado.")

    for subgrupo_descricao in subgrupos:
        subgrupo_codigo = subgrupo_codigos[subgrupo_descricao]
        subgrupo, created = Subgrupo.objects.get_or_create(
            Descricao=subgrupo_descricao,
            idgrupo=grupo,
            defaults={
                'Codigo': f"{grupo.Codigo}-{subgrupo_codigo}",
                'Margem': 0.0,
                'data_cadastro': timezone.now()
            }
        )
        if created:
            print(f"Subgrupo '{subgrupo.Descricao}' criado para o grupo '{grupo.Descricao}'.")

print("População das tabelas Grupo e Subgrupo concluída.")


 """