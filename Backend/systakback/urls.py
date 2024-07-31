from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken import views as auth_views
from django.contrib import admin
from systakapp import views

router = routers.DefaultRouter()

# Registrando os ViewSets
router.register(r'users', views.UserViewSet)
router.register(r'clientes', views.ClienteViewSet)
router.register(r'fornecedores', views.FornecedorViewSet)
router.register(r'vendedores', views.VendedorViewSet)
router.register(r'funcionarios', views.FuncionariosViewSet)
router.register(r'tamanhos', views.TamanhoViewSet)
router.register(r'cores', views.CorViewSet)
router.register(r'natureza-lancamento', views.NaturezaLancamentoViewSet)
router.register(r'contasbancarias', views.ContaBancariaViewSet)
router.register(r'produtos', views.ProdutoViewSet)
router.register(r'produtodetalhes', views.ProdutoDetalheViewSet)
router.register(r'tabelas', views.TabelaprecoViewSet)
router.register(r'tabelaprecoitems', views.TabelaPrecoItemViewSet)
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
    path('api-token-auth/', auth_views.obtain_auth_token, name='api_token_auth'),
    path('users/me/', views.get_user_data, name='get_user_data'),
    path('vendas/create_venda/', views.create_venda, name='create_venda'),
    path('codigos/incrementar/', views.incrementar_codigo, name='incrementar_codigo'),
    path('estoques/', views.EstoqueDetail.as_view(), name='estoque-detail'),
    path('recebers/create_receber/', views.create_financeiro, name='create_financeiro'),  # Nova rota para create_financeiro
    path('recebers/create_financeiro/', views.create_financeiro, name='create_financeiro'),  # Nova rota para create_financeiro
    path('verificar_documento/<str:documento>/', views.verificar_documento, name='verificar_documento'),
    # path('vendas/', include('vendas.urls')),  # Inclua o caminho para o aplicativo vendas
    path('', include(router.urls)),
    path('grupos/<int:grupo_id>/codigo/', views.get_codigo_grupo, name='get_codigo_grupo'),
    path('colecoes/<int:colecao_id>/update_contador/', views.update_contador, name='update_contador'),
    path('produtos/check_unique_reference/<str:referencia>/', views.ProdutoViewSet.as_view({'get': 'check_unique_reference'}), name='check_unique_reference'),
    path('codigos/empresa/', views.get_empresa_codigo, name='get_empresa_codigo'),
    path('codigos/empresa/increment/', views.increment_empresa_codigo, name='increment_empresa_codigo'),
    path('produtos/detalhes/<str:referencia>/', views.get_produto_detalhes_by_referencia, name='get_produto_detalhes_by_referencia'),  # Adicionando a nova rota
    path('tabelaprecoitems/exists/<str:codigodebarra>/<str:codigoproduto>/<int:idtabela>/', views.check_tabelaprecoitem_exists, name='check_tabelaprecoitem_exists'),
    path('estoques/exists/<str:codigodebarra>/<str:codigoproduto>/<int:idloja>/', views.check_estoque_exists, name='check_estoque_exists'),
    path('create-user/', views.create_user, name='create_user'),  # Adicionando a nova rota para criação de novos usuários.
    path('tabelaprecoitems/preco/<str:codigo_barra>/', views.get_preco_por_codigo_barra, name='get_preco_por_codigo_barra'),
    path('produtodetalhes/', views.get_produto_detalhe_by_codigo_barra, name='get_produto_detalhe_by_codigo_barra'),
    path('test-post/', views.test_post, name='test_post'),
     
]
