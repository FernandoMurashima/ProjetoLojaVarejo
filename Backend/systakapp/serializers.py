from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (
    Loja, Cliente, Fornecedor, Vendedor, Funcionarios, Tamanho, Cor,
    Nat_Lancamento, ContaBancaria, Produto, ProdutoDetalhe, Tabelapreco, Estoque,
    Venda, VendaItem, MovimentacaoFinanceira, MovimentacaoProdutos, Inventario,
    InventarioItem, Receber, ReceberItens, Pagar, PagarItem, Compra, CompraItem,
    PedidoCompra, PedidoCompraItem, Grupo, Subgrupo 
)

class UserSerializer(serializers.ModelSerializer):
    """
    User serializer.
    """
    class Meta:
        model = get_user_model()
        fields = '__all__'

class LojaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loja
        fields = '__all__'
        read_only_fields = ['Idloja']

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class FornecedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fornecedor
        fields = '__all__'

class VendedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendedor
        fields = '__all__'

class FuncionariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Funcionarios
        fields = '__all__'

class TamanhoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tamanho
        fields = '__all__'

class CorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cor
        fields = '__all__'

class NaturezaLancamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nat_Lancamento
        fields = '__all__'

class ContaBancariaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContaBancaria
        fields = '__all__'

class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = '__all__'

class ProdutoDetalheSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProdutoDetalhe
        fields = '__all__'

class TabelaprecoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tabelapreco
        fields = '__all__'

class EstoqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estoque
        fields = '__all__'

class VendaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venda
        fields = '__all__'

class VendaItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = VendaItem
        fields = '__all__'

class MovimentacaoFinanceiraSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovimentacaoFinanceira
        fields = '__all__'

class MovimentacaoProdutosSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovimentacaoProdutos
        fields = '__all__'

class InventarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventario
        fields = '__all__'

class InventarioItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventarioItem
        fields = '__all__'

class ReceberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receber
        fields = '__all__'

class ReceberItensSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReceberItens
        fields = '__all__'

class PagarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pagar
        fields = '__all__'

class PagarItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PagarItem
        fields = '__all__'

class CompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compra
        fields = '__all__'

class CompraItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompraItem
        fields = '__all__'

class PedidoCompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = PedidoCompra
        fields = '__all__'

class PedidoCompraItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PedidoCompraItem
        fields = '__all__'

class GrupoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grupo
        fields = '__all__'

class SubgrupoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subgrupo
        fields = '__all__'