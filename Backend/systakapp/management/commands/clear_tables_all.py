# systak/management/commands/clear_tables.py

from django.core.management.base import BaseCommand
from Backend.systakapp.models_desen import (
    # Loja, Cliente, Fornecedor, Vendedor, Funcionarios, Tamanho, Cor, ContaBancaria, 
    Produto, ProdutoDetalhe, Tabelapreco, TabelaPrecoItem,
    Estoque, Venda, VendaItem, MovimentacaoFinanceira, MovimentacaoProdutos,
    Inventario, InventarioItem, Receber, ReceberItens, Pagar, PagarItem,
    Compra, CompraItem, PedidoCompra, PedidoCompraItem
)

class Command(BaseCommand):
    help = 'Clear all data from specified tables'

    def handle(self, *args, **kwargs):
        models = [
            # Loja, Cliente, Fornecedor, Vendedor, Funcionarios, Tamanho, Cor, ContaBancaria, 
            Tabelapreco, TabelaPrecoItem,
            Produto, ProdutoDetalhe,
            Estoque, Venda, VendaItem, MovimentacaoFinanceira, MovimentacaoProdutos,
            Inventario, InventarioItem, Receber, ReceberItens, Pagar, PagarItem,
            Compra, CompraItem, PedidoCompra, PedidoCompraItem
        ]

        for model in models:
            self.stdout.write(f'Clearing table {model.__name__}...')
            model.objects.all().delete()
            self.stdout.write(f'Table {model.__name__} cleared successfully.')

        self.stdout.write(self.style.SUCCESS('All specified tables have been cleared.'))
