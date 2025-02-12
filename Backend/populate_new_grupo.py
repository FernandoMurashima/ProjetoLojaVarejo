import os
import django
from django.utils import timezone
from systakapp.models import Grupo, Subgrupo  # Substitua "myapp" pelo nome do seu app

# Configure o Django para rodar fora do servidor
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_project.settings')
django.setup()

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

# Função para popular os dados
def populate():
    # Primeiro, preenche a tabela Grupo
    for grupo, descricao_list in dados.items():
        grupo_codigo = grupo_codigos.get(grupo)
        if not Grupo.objects.filter(Codigo=grupo_codigo).exists():
            grupo_obj = Grupo(
                Codigo=grupo_codigo,
                Descricao=grupo,
                Margem=0.0,  # Altere conforme necessário
                data_cadastro=timezone.now()
            )
            grupo_obj.save()
            print(f"Grupo '{grupo}' criado com sucesso!")
        else:
            print(f"Grupo '{grupo}' já existe!")

    # Depois, preenche a tabela Subgrupo
    for grupo, descricao_list in dados.items():
        grupo_codigo = grupo_codigos.get(grupo)
        grupo_obj = Grupo.objects.filter(Codigo=grupo_codigo).first()

        for descricao in descricao_list:
            subgrupo_codigo = subgrupo_codigos.get(descricao)
            if grupo_obj and not Subgrupo.objects.filter(Codigo=subgrupo_codigo).exists():
                subgrupo_obj = Subgrupo(
                    Codigo=subgrupo_codigo,
                    Descricao=descricao,
                    Margem=0.0,  # Altere conforme necessário
                    data_cadastro=timezone.now(),
                    grupo=grupo_obj
                )
                subgrupo_obj.save()
                print(f"Subgrupo '{descricao}' criado com sucesso para o grupo '{grupo}'!")
            else:
                print(f"Subgrupo '{descricao}' já existe ou grupo não encontrado!")

if __name__ == "__main__":
    populate()
