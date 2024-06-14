from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken import views as auth_views
from rest_framework.authtoken.views import obtain_auth_token
from django.contrib import admin
from systakapp import views 
from systakapp.views import NatLancamentoList  # Certifique-se de importar a classe NatLancamentoList

router = routers.DefaultRouter()

router.register(r'users', views.UserViewSet)
router.register(r'lojas', views.LojaViewSet)
router.register(r'clientes', views.ClienteViewSet)
router.register(r'fornecedores', views.FornecedorViewSet)
router.register(r'vendedores', views.VendedorViewSet)
router.register(r'funcionarios', views.FuncionariosViewSet)
router.register(r'tamanhos', views.TamanhoViewSet)
router.register(r'cores', views.CorViewSet)
router.register(r'natureza-lancamentos', views.NaturezaLancamentoViewSet)  # Aqui está a ViewSet que você já registrou
router.register(r'contas-bancarias', views.ContaBancariaViewSet)
router.register(r'produtos', views.ProdutoViewSet)
router.register(r'produto-detalhes', views.ProdutoDetalheViewSet)
router.register(r'tabela-precos', views.TabelaprecoViewSet)
router.register(r'estoque', views.EstoqueViewSet)
router.register(r'vendas', views.VendaViewSet)
router.register(r'venda-itens', views.VendaItemViewSet)
router.register(r'movimentacao-financeira', views.MovimentacaoFinanceiraViewSet)
router.register(r'movimentacao-produtos', views.MovimentacaoProdutosViewSet)
router.register(r'inventarios', views.InventarioViewSet)
router.register(r'inventario-itens', views.InventarioItemViewSet)
router.register(r'receber', views.ReceberViewSet)
router.register(r'receber-itens', views.ReceberItensViewSet)
router.register(r'pagar', views.PagarViewSet)
router.register(r'pagar-itens', views.PagarItemViewSet)
router.register(r'compras', views.CompraViewSet)
router.register(r'compra-itens', views.CompraItemViewSet)
router.register(r'pedido-compras', views.PedidoCompraViewSet)
router.register(r'pedido-compra-itens', views.PedidoCompraItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api-token-auth/', auth_views.obtain_auth_token),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('natureza_lancamentos/', NatLancamentoList.as_view(), name='natureza_lancamentos'),
]
