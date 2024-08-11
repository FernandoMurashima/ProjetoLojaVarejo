import csv
import os
import django

# Configurar o Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'systakback.settings')
django.setup()

from systakapp.models import Ncm

Ncm.objects.all().delete()
def populate_ncm(csv_file_path):

    with open(csv_file_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        for row in reader:
            if len(row) >= 4:
                ncm = row[0]
                campo1 = row[1]
                descricao = row[2]
                aliquota = row[3] if row[3] != 'NT' and row[3] else 0.0
                Ncm.objects.create(ncm=ncm, campo1=campo1, descricao=descricao, aliquota=aliquota)

if __name__ == '__main__':
    populate_ncm('tipi_varejo.csv')
