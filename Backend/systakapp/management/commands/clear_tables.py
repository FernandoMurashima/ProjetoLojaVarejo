from django.core.management.base import BaseCommand
from django.db import connection

class Command(BaseCommand):
    help = 'Limpa uma tabela especificada e reinicia o ID'

    def add_arguments(self, parser):
        parser.add_argument(
            'table',
            type=str,
            help='Nome da tabela a ser limpa'
        )

    def handle(self, *args, **options):
        table = options['table']
        cursor = connection.cursor()
        try:
            cursor.execute(f'TRUNCATE TABLE {table} RESTART IDENTITY CASCADE')
            self.stdout.write(self.style.SUCCESS(f'Tabela {table} limpa e IDs reiniciados com sucesso.'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Erro ao limpar a tabela {table}: {e}'))
