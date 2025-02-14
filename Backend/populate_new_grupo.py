import os
import django

# Configure o Django para rodar fora do servidor
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'systakback.settings')
django.setup()

from django.utils import timezone
from systakapp.models import Grupo, Subgrupo  # Importação após setup()

# Dados para popular a tabela Grupo e Subgrupo
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

# Populando os grupos e subgrupos
for grupo_nome, subgrupos in dados.items():
    grupo, created = Grupo.objects.get_or_create(
        codigo=grupo_codigos[grupo_nome],
        defaults={'nome': grupo_nome}
    )

    for subgrupo_nome in subgrupos:
        Subgrupo.objects.get_or_create(
            codigo=subgrupo_codigos[subgrupo_nome],
            grupo=grupo,
            defaults={'nome': subgrupo_nome}
        )

print("Grupos e subgrupos populados com sucesso!")
