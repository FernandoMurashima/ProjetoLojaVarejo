from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import make_password
from rest_framework import viewsets, permissions, generics
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse, Http404
from django.db.models import F
from .serializers import (
    UserSerializer, ClienteSerializer, FornecedorSerializer, VendedorSerializer,
    FuncionariosSerializer, TamanhoSerializer, CorSerializer, NaturezaLancamentoSerializer,
    ContaBancariaSerializer, ProdutoSerializer, ProdutoDetalheSerializer, TabelaprecoSerializer,
    EstoqueSerializer, VendaSerializer, VendaItemSerializer, MovimentacaoFinanceiraSerializer,
    MovimentacaoProdutosSerializer, InventarioSerializer, InventarioItemSerializer,
    ReceberSerializer, ReceberItensSerializer, PagarSerializer, PagarItemSerializer,
    CompraSerializer, CompraItemSerializer, PedidoCompraSerializer, PedidoCompraItemSerializer, LojaSerializer, GrupoSerializer,
    UnidadeSerializer, MaterialSerializer, FamiliaSerializer, ColecaoSerializer, GradeSerializer, NcmSerializer, SubGrupoSerializer,
    GrupoDetalheSerializer, CodigosSerializer, TabelaPrecoItemSerializer
)

from .models import (
    User, Loja, Cliente, Fornecedor, Vendedor, Funcionarios, Tamanho, Cor,
    Nat_Lancamento, ContaBancaria, Produto, ProdutoDetalhe, Tabelapreco, Estoque,
    Venda, VendaItem, MovimentacaoFinanceira, MovimentacaoProdutos, Inventario,
    InventarioItem, Receber, ReceberItens, Pagar, PagarItem, Compra, CompraItem, Grade,
    PedidoCompra, PedidoCompraItem, Grupo, Unidade, Material, Familia, Colecao, Ncm, Subgrupo, 
    GrupoDetalhe, Codigos, TabelaPrecoItem
)

import logging

logger = logging.getLogger(__name__)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_data(request):
    logger.info("get_user_data foi chamada")  # Log para verificar a chamada da função
    user = request.user
    logger.info(f"Usuário autenticado: {user.username}")  # Log para verificar o usuário autenticado
    user_data = {
        'id': user.id,
        'username': user.username,
        'type': user.type,  # Certifique-se de que o campo 'type' está disponível no modelo User
    }
    return Response(user_data)

class UnidadeViewSet(viewsets.ModelViewSet):
    queryset = Unidade.objects.all()
    serializer_class = UnidadeSerializer
    permission_classes = [permissions.IsAuthenticated]

class MaterialViewSet(viewsets.ModelViewSet):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer
    permission_classes = [permissions.IsAuthenticated]

class FamiliaViewSet(viewsets.ModelViewSet):
    queryset = Familia.objects.all()
    serializer_class = FamiliaSerializer
    permission_classes = [permissions.IsAuthenticated]

class ColecaoViewSet(viewsets.ModelViewSet):
    queryset = Colecao.objects.all()
    serializer_class = ColecaoSerializer
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

    @action(detail=False, methods=['get'], url_path='check_unique_reference/(?P<referencia>[^/.]+)')
    def check_unique_reference(self, request, referencia=None):
        exists = Produto.objects.filter(referencia=referencia).exists()
        return Response({'isUnique': not exists})

class ProdutoDetalheViewSet(viewsets.ModelViewSet):
    queryset = ProdutoDetalhe.objects.all()
    serializer_class = ProdutoDetalheSerializer
    permission_classes = [permissions.IsAuthenticated]

class TabelaprecoViewSet(viewsets.ModelViewSet):
    queryset = Tabelapreco.objects.all()
    serializer_class = TabelaprecoSerializer
    permission_classes = [permissions.IsAuthenticated]

class TabelaPrecoItemViewSet(viewsets.ModelViewSet):
    queryset = TabelaPrecoItem.objects.all()
    serializer_class = TabelaPrecoItemSerializer

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
    def post(self, request, *args, **kwargs):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})

class GradeViewSet(viewsets.ModelViewSet):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
    permission_classes = [permissions.IsAuthenticated]

class NcmViewSet(viewsets.ModelViewSet):
    queryset = Ncm.objects.all()
    serializer_class = NcmSerializer

class GrupoViewSet(viewsets.ModelViewSet):
    queryset = Grupo.objects.all()
    serializer_class = GrupoSerializer
    permission_classes = [permissions.IsAuthenticated]

class GrupoDetalheViewSet(viewsets.ModelViewSet):
    queryset = GrupoDetalhe.objects.all()
    serializer_class = GrupoDetalheSerializer
    permission_classes = [permissions.IsAuthenticated]

class SubGrupoViewSet(viewsets.ModelViewSet):
    queryset = Subgrupo.objects.all()
    serializer_class = SubGrupoSerializer
    permission_classes = [permissions.IsAuthenticated]

class CodigosViewSet(viewsets.ModelViewSet):
    queryset = Codigos.objects.all()
    serializer_class = CodigosSerializer
    permission_classes = [permissions.IsAuthenticated]

@api_view(['POST'])
def add_grupo_detalhe(request):
    data = request.data
    if GrupoDetalhe.objects.filter(idgrupo=data['idgrupo'], idsubgrupo=data['idsubgrupo']).exists():
        return Response({"error": "Este subgrupo já está cadastrado para o grupo."}, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = GrupoDetalheSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_codigo_grupo(request, grupo_id):
    try:
        grupo = Grupo.objects.get(Idgrupo=grupo_id)
        return JsonResponse({"codigo": grupo.Codigo})
    except Grupo.DoesNotExist:
        return JsonResponse({"error": "Grupo não encontrado"}, status=404)

@api_view(['POST'])
def update_contador(request, colecao_id):
    try:
        colecao = Colecao.objects.get(Idcolecao=colecao_id)
        contador = request.data.get('contador', 1)
        colecao.Contador = F('Contador') + contador
        colecao.save()
        colecao.refresh_from_db()  # Certifique-se de obter o valor atualizado do banco de dados
        return JsonResponse({"success": True, "novo_contador": colecao.Contador})
    except Colecao.DoesNotExist:
        return JsonResponse({"error": "Coleção não encontrada"}, status=404)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_empresa_codigo(request):
    try:
        codigo = Codigos.objects.get(variavel='EMPRESA')
        return JsonResponse({"valor": codigo.valor})
    except Codigos.DoesNotExist:
        return JsonResponse({"error": "Código da empresa não encontrado"}, status=404)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def increment_empresa_codigo(request):
    try:
        codigo = Codigos.objects.get(variavel='EMPRESA')
        codigo.valor = F('valor') + 1
        codigo.save()
        codigo.refresh_from_db()
        return JsonResponse({"success": True, "novo_valor": codigo.valor})
    except Codigos.DoesNotExist:
        return JsonResponse({"error": "Código da empresa não encontrado"}, status=404)

def get_produto_detalhes_by_referencia(request, referencia):
    try:
        detalhes = ProdutoDetalhe.objects.filter(Codigoproduto=referencia)
        if not detalhes.exists():
            raise Http404("Detalhes do produto não encontrados")
        detalhes_list = list(detalhes.values())
        return JsonResponse(detalhes_list, safe=False)
    except ProdutoDetalhe.DoesNotExist:
        raise Http404("Detalhes do produto não encontrados")
    
def check_tabelaprecoitem_exists(request, codigodebarra, codigoproduto, idtabela):
    exists = TabelaPrecoItem.objects.filter(codigodebarra=codigodebarra, codigoproduto=codigoproduto, idtabela_id=idtabela).exists()
    return JsonResponse({'exists': exists})

def check_estoque_exists(request, codigodebarra, codigoproduto, idloja):
    exists = Estoque.objects.filter(CodigodeBarra=codigodebarra, codigoproduto=codigoproduto, Idloja_id=idloja).exists()
    return JsonResponse({'exists': exists})

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def create_user(request):
    data = request.data
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    if not username or not password or not email:
        return JsonResponse({'error': 'Missing fields'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return JsonResponse({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User(
        username=username,
        email=email,
        password=make_password(password)  # Hashing the password
    )
    user.save()

    return JsonResponse({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

def get_preco_por_codigo_barra(request, codigo_barra):
    tabela_preco_item = get_object_or_404(TabelaPrecoItem, codigodebarra=codigo_barra)
    return JsonResponse({'preco': tabela_preco_item.preco})

@csrf_exempt
def get_produto_detalhe_by_codigo_barra(request):
    if request.method == 'GET':
        codigo_barra = request.GET.get('codigoBarra', None)
        if codigo_barra:
            try:
                produto_detalhe = ProdutoDetalhe.objects.filter(CodigodeBarra=codigo_barra).first()
                if produto_detalhe:
                    response_data = {
                        'Idprodutodetalhe': produto_detalhe.Idprodutodetalhe,
                        'CodigodeBarra': produto_detalhe.CodigodeBarra,
                        'Codigoproduto': produto_detalhe.Codigoproduto,
                        'Idproduto': produto_detalhe.Idproduto.id,
                        'Idtamanho': produto_detalhe.Idtamanho,
                        'Idcor': produto_detalhe.Idcor,
                        'Item': produto_detalhe.Item,
                        'data_cadastro': produto_detalhe.data_cadastro,
                    }
                    return JsonResponse(response_data, safe=False)
                else:
                    return JsonResponse({'error': 'ProdutoDetalhe não encontrado.'}, status=404)
            except Exception as e:
                return JsonResponse({'error': str(e)}, status=500)
        else:
            return JsonResponse({'error': 'Código de barra não fornecido.'}, status=400)
    else:
        return JsonResponse({'error': 'Método não permitido.'}, status=405)

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def incrementar_codigo(request):
    print("Endpoint incrementar_codigo chamado")  # Adicione este print para verificar a chamada
    if request.method == 'POST':
        try:
            variavel = request.data.get('variavel')
            codigo = Codigos.objects.get(variavel=variavel)
            codigo.valor_var = str(int(codigo.valor_var) + 1)
            codigo.save()
            return JsonResponse({'status': 'success', 'message': 'Código incrementado com sucesso'})
        except Codigos.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Código não encontrado'}, status=404)
    return JsonResponse({'status': 'error', 'message': 'Método não permitido'}, status=405)

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def test_post(request):
    print("Endpoint test_post chamado")
    return JsonResponse({'status': 'success', 'message': 'POST request received'})
