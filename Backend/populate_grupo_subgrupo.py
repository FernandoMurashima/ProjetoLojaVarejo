import os
import django
from django.utils import timezone

# Configurar o Django para rodar fora do servidor
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'systakback.settings')
django.setup()

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

# Margem padrão para os grupos e subgrupos
MARGEM_PADRAO = 10.00

def populate():
    for grupo_nome, subgrupos in dados.items():
        grupo, created = Grupo.objects.get_or_create(
            Codigo=grupo_codigos[grupo_nome],
            defaults={
                'Descricao': grupo_nome,
                'Margem': MARGEM_PADRAO,
                'data_cadastro': timezone.now()
            }
        )
        
        for subgrupo_nome in subgrupos:
            Subgrupo.objects.get_or_create(
                Descricao=subgrupo_nome,
                defaults={
                    'Margem': MARGEM_PADRAO,
                    'data_cadastro': timezone.now()
                }
            )
    
    print("Grupos e subgrupos populados com sucesso!")

if __name__ == "__main__":
    populate()