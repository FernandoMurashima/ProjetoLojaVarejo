from django.core.management.base import BaseCommand
from django.db import connection, transaction
from systakapp.models import Estoque

class Command(BaseCommand):
    help = 'Reset tables and set estoque to 100'

    def handle(self, *args, **kwargs):
        tables_to_reset = [
            'systakapp_vendaitem',
            'systakapp_venda',
            'systakapp_receberitens',
            'systakapp_receber',
            'systakapp_movimentacaofinanceira',
            'systakapp_movimentacaoprodutos'
        ]

        for table in tables_to_reset:
            self.reset_table(table)

        self.update_estoque()
        self.stdout.write(self.style.SUCCESS('Successfully reset tables and updated estoque.'))

    def reset_table(self, table_name):
        with connection.cursor() as cursor:
            try:
                cursor.execute(f'DELETE FROM {table_name};')
                cursor.execute(f'ALTER TABLE {table_name} AUTO_INCREMENT = 1;')
                self.stdout.write(self.style.SUCCESS(f'Deleted data from table {table_name} and reset auto-increment.'))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Error resetting table {table_name}: {e}'))

    def update_estoque(self):
        try:
            with transaction.atomic():
                Estoque.objects.all().update(Estoque=100)
            self.stdout.write(self.style.SUCCESS('Updated estoque to 100 in systakapp_estoque.'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error updating estoque: {e}'))



