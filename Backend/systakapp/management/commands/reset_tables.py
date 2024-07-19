from django.core.management.base import BaseCommand
from django.db import connection

class Command(BaseCommand):
    help = 'Reseta as tabelas produto, produtodetalhe e tabelaprecoitem e reinicia os IDs.'

    def handle(self, *args, **kwargs):
        with connection.cursor() as cursor:
            # Deletar os registros das tabelas
            cursor.execute("DELETE FROM systakapp_produto;")
            cursor.execute("DELETE FROM systakapp_produtodetalhe;")
            cursor.execute("DELETE FROM systakapp_tabelaprecoitem;")
            
            # Reiniciar os IDs das tabelas
            cursor.execute("UPDATE sqlite_sequence SET seq = 0 WHERE name = 'systakapp_produto';")
            cursor.execute("UPDATE sqlite_sequence SET seq = 0 WHERE name = 'systakapp_produtodetalhe';")
            cursor.execute("UPDATE sqlite_sequence SET seq = 0 WHERE name = 'systakapp_tabelaprecoitem';")
        
        self.stdout.write(self.style.SUCCESS('Tabelas resetadas com sucesso e IDs reiniciados!'))

