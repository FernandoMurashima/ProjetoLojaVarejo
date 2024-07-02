from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken import views as auth_views
from rest_framework.authtoken.views import obtain_auth_token
from django.contrib import admin
from systakapp import views

router = routers.DefaultRouter()

router.register(r'users', views.UserViewSet)
router.register(r'clientes', views.ClienteViewSet)
router.register(r'fornecedores', views.FornecedorViewSet)
router.register(r'vendedores', views.VendedorViewSet)
router.register(r'funcionarios', views.FuncionariosViewSet)
router.register(r'tamanhos', views.TamanhoViewSet)
router.register(r'cores', views.CorViewSet)
router.register(r'naturezaslancamento', views.NaturezaLancamentoViewSet)
router.register(r'contasbancarias', views.ContaBancariaViewSet)
router.register(r'produtos', views.ProdutoViewSet)
router.register(r'produtodetalhes', views.ProdutoDetalheViewSet)
router.register(r'tabelaspreco', views.TabelaprecoViewSet)
router.register(r'estoques', views.EstoqueViewSet)
router.register(r'vendas', views.VendaViewSet)
router.register(r'vendaitens', views.VendaItemViewSet)
router.register(r'movimentacoesfinanceiras', views.MovimentacaoFinanceiraViewSet)
router.register(r'movimentacoesprodutos', views.MovimentacaoProdutosViewSet)
router.register(r'inventarios', views.InventarioViewSet)
router.register(r'inventarioitens', views.InventarioItemViewSet)
router.register(r'recebers', views.ReceberViewSet)
router.register(r'receberitens', views.ReceberItensViewSet)
router.register(r'pagars', views.PagarViewSet)
router.register(r'pagaritens', views.PagarItemViewSet)
router.register(r'compras', views.CompraViewSet)
router.register(r'compraitens', views.CompraItemViewSet)
router.register(r'pedidoscompra', views.PedidoCompraViewSet)
router.register(r'pedidocompraitens', views.PedidoCompraItemViewSet)
router.register(r'lojas', views.LojaViewSet)
router.register(r'unidade', views.UnidadeViewSet)
router.register(r'material', views.MaterialViewSet)
router.register(r'familia', views.FamiliaViewSet)
router.register(r'colecao', views.ColecaoViewSet)
router.register(r'grades', views.GradeViewSet)
router.register(r'ncms', views.NcmViewSet)
router.register(r'grupos', views.GrupoViewSet)
router.register(r'grupodetalhes', views.GrupoDetalheViewSet)
router.register(r'subgrupos', views.SubGrupoViewSet)
router.register(r'codigos', views.CodigosViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api-token-auth/', auth_views.obtain_auth_token),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('', include(router.urls)),
]


