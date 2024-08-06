from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import (
    Loja, Cliente, Fornecedor, Vendedor, Funcionarios, Tamanho, Cor,
    Nat_Lancamento, ContaBancaria, Produto, ProdutoDetalhe, Tabelapreco, Estoque,
    Venda, VendaItem, MovimentacaoFinanceira, MovimentacaoProdutos, Inventario,
    InventarioItem, Receber, ReceberItens, Pagar, PagarItem, Compra, CompraItem,
    PedidoCompra, PedidoCompraItem, Grupo, Unidade, Material, Familia, Colecao, Grade, Ncm, Subgrupo, GrupoDetalhe,
    Codigos, TabelaPrecoItem, Imposto
)

User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password', 'type']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Este nome de usuário já está em uso.")
        return value

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

class TabelaPrecoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TabelaPrecoItem
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

class UnidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unidade
        fields = '__all__'        

class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = '__all__'                

class FamiliaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Familia
        fields = '__all__'                

class ColecaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Colecao
        fields = '__all__'        

class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = '__all__'

class NcmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ncm
        fields = '__all__'        

class GrupoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grupo
        fields = '__all__'

class GrupoDetalheSerializer(serializers.ModelSerializer):
    class Meta:
        model = GrupoDetalhe
        fields = '__all__'
    
    def validate(self, data):
        if GrupoDetalhe.objects.filter(idgrupo=data['idgrupo'], idsubgrupo=data['idsubgrupo']).exists():
            raise serializers.ValidationError("Essa combinação de grupo e subgrupo já foi cadastrada.")
        return data

class SubGrupoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subgrupo
        fields = '__all__'       

class CodigosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Codigos
        fields = '__all__'      


class ImpostoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Imposto
        fields = '__all__'