from django.contrib.auth import get_user_model
from rest_framework import viewsets, permissions, generics

from .serializers import (
    UserSerializer, ClienteSerializer, FornecedorSerializer, VendedorSerializer,
    FuncionariosSerializer, TamanhoSerializer, CorSerializer, NaturezaLancamentoSerializer,
    ContaBancariaSerializer, ProdutoSerializer, ProdutoDetalheSerializer, TabelaprecoSerializer,
    EstoqueSerializer, VendaSerializer, VendaItemSerializer, MovimentacaoFinanceiraSerializer,
    MovimentacaoProdutosSerializer, InventarioSerializer, InventarioItemSerializer,
    ReceberSerializer, ReceberItensSerializer, PagarSerializer, PagarItemSerializer,
    CompraSerializer, CompraItemSerializer, PedidoCompraSerializer, PedidoCompraItemSerializer, LojaSerializer,
)

from .models import (
    User, Loja, Cliente, Fornecedor, Vendedor, Funcionarios, Tamanho, Cor,
    Nat_Lancamento, ContaBancaria, Produto, ProdutoDetalhe, Tabelapreco, Estoque,
    Venda, VendaItem, MovimentacaoFinanceira, MovimentacaoProdutos, Inventario,
    InventarioItem, Receber, ReceberItens, Pagar, PagarItem, Compra, CompraItem,
    PedidoCompra, PedidoCompraItem
)

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.http import JsonResponse


from rest_framework.permissions import IsAuthenticated
import logging

logger = logging.getLogger(__name__)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class LojaViewSet(viewsets.ModelViewSet):
    queryset = Loja.objects.all()
    serializer_class = LojaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        logger.debug("Dados recebidos no POST: %s", request.data)
        return super().create(request, *args, **kwargs)

    def get_lojas(request):
        lojas = Loja.objects.all().values('idloja', 'nome_loja')
        return JsonResponse(list(lojas), safe=False)

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        logger.info(f'Requisição recebida: {request.data}') # Log para verificar a solicitação
        response = super().create(request, *args, **kwargs)
        logger.info(f'Resposta enviada: {response.data}') # Log para verificar a resposta
        return response

class FornecedorViewSet(viewsets.ModelViewSet):
    queryset = Fornecedor.objects.all()
    serializer_class = FornecedorSerializer
    permission_classes = [permissions.IsAuthenticated]

class VendedorViewSet(viewsets.ModelViewSet):
    queryset = Vendedor.objects.all()
    serializer_class = VendedorSerializer
    permission_classes = [permissions.IsAuthenticated]

class FuncionariosViewSet(viewsets.ModelViewSet):
    queryset = Funcionarios.objects.all()
    serializer_class = FuncionariosSerializer
    permission_classes = [permissions.IsAuthenticated]

class TamanhoViewSet(viewsets.ModelViewSet):
    queryset = Tamanho.objects.all()
    serializer_class = TamanhoSerializer
    permission_classes = [permissions.IsAuthenticated]

class CorViewSet(viewsets.ModelViewSet):
    queryset = Cor.objects.all()
    serializer_class = CorSerializer
    permission_classes = [permissions.IsAuthenticated]

class NaturezaLancamentoViewSet(viewsets.ModelViewSet):
    queryset = Nat_Lancamento.objects.all()
    serializer_class = NaturezaLancamentoSerializer
    permission_classes = [permissions.IsAuthenticated]

class NatLancamentoList(generics.ListCreateAPIView):
    queryset = Nat_Lancamento.objects.all()
    serializer_class = NaturezaLancamentoSerializer

class ContaBancariaViewSet(viewsets.ModelViewSet):
    queryset = ContaBancaria.objects.all()
    serializer_class = ContaBancariaSerializer
    permission_classes = [permissions.IsAuthenticated]

class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer
    permission_classes = [permissions.IsAuthenticated]

class ProdutoDetalheViewSet(viewsets.ModelViewSet):
    queryset = ProdutoDetalhe.objects.all()
    serializer_class = ProdutoDetalheSerializer
    permission_classes = [permissions.IsAuthenticated]

class TabelaprecoViewSet(viewsets.ModelViewSet):
    queryset = Tabelapreco.objects.all()
    serializer_class = TabelaprecoSerializer
    permission_classes = [permissions.IsAuthenticated]

class EstoqueViewSet(viewsets.ModelViewSet):
    queryset = Estoque.objects.all()
    serializer_class = EstoqueSerializer
    permission_classes = [permissions.IsAuthenticated]

class VendaViewSet(viewsets.ModelViewSet):
    queryset = Venda.objects.all()
    serializer_class = VendaSerializer
    permission_classes = [permissions.IsAuthenticated]

class VendaItemViewSet(viewsets.ModelViewSet):
    queryset = VendaItem.objects.all()
    serializer_class = VendaItemSerializer
    permission_classes = [permissions.IsAuthenticated]

class MovimentacaoFinanceiraViewSet(viewsets.ModelViewSet):
    queryset = MovimentacaoFinanceira.objects.all()
    serializer_class = MovimentacaoFinanceiraSerializer
    permission_classes = [permissions.IsAuthenticated]

class MovimentacaoProdutosViewSet(viewsets.ModelViewSet):
    queryset = MovimentacaoProdutos.objects.all()
    serializer_class = MovimentacaoProdutosSerializer
    permission_classes = [permissions.IsAuthenticated]

class InventarioViewSet(viewsets.ModelViewSet):
    queryset = Inventario.objects.all()
    serializer_class = InventarioSerializer
    permission_classes = [permissions.IsAuthenticated]

class InventarioItemViewSet(viewsets.ModelViewSet):
    queryset = InventarioItem.objects.all()
    serializer_class = InventarioItemSerializer
    permission_classes = [permissions.IsAuthenticated]

class ReceberViewSet(viewsets.ModelViewSet):
    queryset = Receber.objects.all()
    serializer_class = ReceberSerializer
    permission_classes = [permissions.IsAuthenticated]

class ReceberItensViewSet(viewsets.ModelViewSet):
    queryset = ReceberItens.objects.all()
    serializer_class = ReceberItensSerializer
    permission_classes = [permissions.IsAuthenticated]

class PagarViewSet(viewsets.ModelViewSet):
    queryset = Pagar.objects.all()
    serializer_class = PagarSerializer
    permission_classes = [permissions.IsAuthenticated]

class PagarItemViewSet(viewsets.ModelViewSet):
    queryset = PagarItem.objects.all()
    serializer_class = PagarItemSerializer
    permission_classes = [permissions.IsAuthenticated]

class CompraViewSet(viewsets.ModelViewSet):
    queryset = Compra.objects.all()
    serializer_class = CompraSerializer
    permission_classes = [permissions.IsAuthenticated]

class CompraItemViewSet(viewsets.ModelViewSet):
    queryset = CompraItem.objects.all()
    serializer_class = CompraItemSerializer
    permission_classes = [permissions.IsAuthenticated]

class PedidoCompraViewSet(viewsets.ModelViewSet):
    queryset = PedidoCompra.objects.all()
    serializer_class = PedidoCompraSerializer
    permission_classes = [permissions.IsAuthenticated]

class PedidoCompraItemViewSet(viewsets.ModelViewSet):
    queryset = PedidoCompraItem.objects.all()
    serializer_class = PedidoCompraItemSerializer
    permission_classes = [permissions.IsAuthenticated]



class CustomAuthToken(APIView):
    """
    View personalizada para autenticação e geração de token.
    """
    def post(self, request, *args, **kwargs):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})