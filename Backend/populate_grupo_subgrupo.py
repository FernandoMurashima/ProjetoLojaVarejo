# populate_grupo_subgrupo.py

import os
import django
from django.utils import timezone

# Configurações do Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'systakback.settings')
django.setup()

from systakapp.models import Grupo, Subgrupo

# Dados para popular a tabela Grupo e Subgrupo
dados = {
    "Calça": ["Lisa", "Estampada", "Jeans", "Malha"],
    "Saia": ["Lisa", "Estampada", "Jeans", "Malha"],
    "Blusa": ["Lisa", "Estampada", "Tricot"],
    "Vestido": ["Lisa", "Estampada", "Renda"]
}

# Populando a tabela Grupo e Subgrupo
for grupo_descricao, subgrupos in dados.items():
    grupo, created = Grupo.objects.get_or_create(
        Descricao=grupo_descricao,
        defaults={
            'Codigo': grupo_descricao[:3].upper(),  # Codigo gerado a partir dos 3 primeiros caracteres da descrição
            'Margem': 0.0,
            'data_cadastro': timezone.now()
        }
    )
    if created:
        print(f"Grupo '{grupo.Descricao}' criado.")

    for subgrupo_descricao in subgrupos:
        subgrupo, created = Subgrupo.objects.get_or_create(
            Descricao=subgrupo_descricao,
            idgrupo=grupo,
            defaults={
                'Codigo': f"{grupo.Codigo[:3].upper()}-{subgrupo_descricao[:3].upper()}",  # Codigo gerado a partir dos 3 primeiros caracteres do grupo e do subgrupo
                'Margem': 0.0,
                'data_cadastro': timezone.now()
            }
        )
        if created:
            print(f"Subgrupo '{subgrupo.Descricao}' criado para o grupo '{grupo.Descricao}'.")
