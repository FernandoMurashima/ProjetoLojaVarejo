# Generated by Django 4.2.11 on 2025-02-12 15:07

import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cliente',
            fields=[
                ('Idcliente', models.BigAutoField(primary_key=True, serialize=False)),
                ('Nome_cliente', models.CharField(max_length=50)),
                ('Apelido', models.CharField(max_length=18)),
                ('cpf', models.CharField(max_length=15)),
                ('Logradouro', models.CharField(blank=True, max_length=10, null=True)),
                ('Endereco', models.CharField(blank=True, max_length=50, null=True)),
                ('numero', models.CharField(blank=True, max_length=10, null=True)),
                ('Complemento', models.CharField(blank=True, max_length=100, null=True)),
                ('Cep', models.CharField(blank=True, max_length=10, null=True)),
                ('Bairro', models.CharField(blank=True, max_length=30, null=True)),
                ('Cidade', models.CharField(blank=True, max_length=50, null=True)),
                ('Telefone1', models.CharField(blank=True, max_length=15, null=True)),
                ('Telefone2', models.CharField(blank=True, max_length=15, null=True)),
                ('email', models.CharField(blank=True, max_length=50, null=True)),
                ('Categoria', models.CharField(blank=True, max_length=15, null=True)),
                ('Bloqueio', models.BooleanField(default=False)),
                ('Aniversario', models.DateField(blank=True, null=True)),
                ('MalaDireta', models.BooleanField(default=False)),
                ('ContaContabil', models.CharField(blank=True, max_length=15, null=True)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Codigos',
            fields=[
                ('Idcodigo', models.BigAutoField(primary_key=True, serialize=False)),
                ('variavel', models.CharField(max_length=7)),
                ('valor_var', models.CharField(max_length=15)),
            ],
        ),
        migrations.CreateModel(
            name='Colecao',
            fields=[
                ('Idcolecao', models.BigAutoField(primary_key=True, serialize=False)),
                ('Descricao', models.CharField(max_length=100)),
                ('Codigo', models.CharField(blank=True, max_length=2, null=True)),
                ('Estacao', models.CharField(blank=True, max_length=2, null=True)),
                ('Status', models.CharField(blank=True, max_length=10, null=True)),
                ('Contador', models.IntegerField(blank=True, default=0, null=True)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Compra',
            fields=[
                ('Idcompra', models.BigAutoField(primary_key=True, serialize=False)),
                ('Datacompra', models.DateField(blank=True, null=True)),
                ('Status', models.CharField(blank=True, max_length=2, null=True)),
                ('Valorpedido', models.DecimalField(decimal_places=2, max_digits=18)),
                ('Documento', models.CharField(max_length=20)),
                ('Datadocumento', models.DateField()),
                ('Idpedidocompra', models.IntegerField(blank=True, null=True)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='ContaBancaria',
            fields=[
                ('Idconta', models.BigAutoField(primary_key=True, serialize=False)),
                ('descricao', models.CharField(max_length=30)),
                ('banco', models.CharField(max_length=100)),
                ('agencia', models.CharField(max_length=20)),
                ('numero', models.IntegerField()),
                ('DataSaldo', models.DateField(blank=True, null=True)),
                ('Saldo', models.DecimalField(decimal_places=2, max_digits=18)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Cor',
            fields=[
                ('Idcor', models.BigAutoField(primary_key=True, serialize=False)),
                ('Descricao', models.CharField(max_length=100)),
                ('Codigo', models.CharField(blank=True, max_length=12, null=True)),
                ('Cor', models.CharField(max_length=30)),
                ('Status', models.CharField(blank=True, max_length=10, null=True)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Familia',
            fields=[
                ('Idfamilia', models.BigAutoField(primary_key=True, serialize=False)),
                ('Descricao', models.CharField(max_length=100)),
                ('Codigo', models.CharField(blank=True, max_length=10, null=True)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Fornecedor',
            fields=[
                ('Idfornecedor', models.BigAutoField(primary_key=True, serialize=False)),
                ('Nome_fornecedor', models.CharField(max_length=50)),
                ('Apelido', models.CharField(max_length=18)),
                ('Cnpj', models.CharField(max_length=18)),
                ('Logradouro', models.CharField(blank=True, max_length=10, null=True)),
                ('Endereco', models.CharField(blank=True, max_length=50, null=True)),
                ('numero', models.CharField(blank=True, max_length=10, null=True)),
                ('Complemento', models.CharField(blank=True, max_length=100, null=True)),
                ('Cep', models.CharField(blank=True, max_length=10, null=True)),
                ('Bairro', models.CharField(blank=True, max_length=30, null=True)),
                ('Cidade', models.CharField(blank=True, max_length=50, null=True)),
                ('Telefone1', models.CharField(blank=True, max_length=15, null=True)),
                ('Telefone2', models.CharField(blank=True, max_length=15, null=True)),
                ('email', models.CharField(blank=True, max_length=50, null=True)),
                ('Categoria', models.CharField(blank=True, max_length=15, null=True)),
                ('Bloqueio', models.BooleanField(default=False)),
                ('MalaDireta', models.BooleanField(default=False)),
                ('ContaContabil', models.CharField(blank=True, max_length=15, null=True)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Funcionarios',
            fields=[
                ('Idfuncionario', models.BigAutoField(primary_key=True, serialize=False)),
                ('nomefuncionario', models.CharField(max_length=50)),
                ('apelido', models.CharField(max_length=20)),
                ('cpf', models.CharField(max_length=15)),
                ('inicio', models.DateField(blank=True, null=True)),
                ('fim', models.DateField(blank=True, null=True)),
                ('categoria', models.CharField(blank=True, max_length=15, null=True)),
                ('meta', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Grade',
            fields=[
                ('Idgrade', models.BigAutoField(primary_key=True, serialize=False)),
                ('Descricao', models.CharField(max_length=100)),
                ('Status', models.CharField(blank=True, max_length=10, null=True)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Grupo',
            fields=[
                ('Idgrupo', models.BigAutoField(primary_key=True, serialize=False)),
                ('Codigo', models.CharField(max_length=12)),
                ('Descricao', models.CharField(max_length=100)),
                ('Margem', models.DecimalField(decimal_places=2, max_digits=6)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Inventario',
            fields=[
                ('Idinventario', models.BigAutoField(primary_key=True, serialize=False)),
                ('Data_inventario', models.DateField()),
                ('Descricao', models.CharField(max_length=50)),
                ('status', models.CharField(max_length=2)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Loja',
            fields=[
                ('Idloja', models.BigAutoField(primary_key=True, serialize=False)),
                ('nome_loja', models.CharField(max_length=50)),
                ('Apelido_loja', models.CharField(max_length=20)),
                ('cnpj', models.CharField(max_length=18)),
                ('Logradouro', models.CharField(blank=True, max_length=10, null=True)),
                ('Endereco', models.CharField(blank=True, max_length=50, null=True)),
                ('numero', models.CharField(blank=True, max_length=10, null=True)),
                ('Complemento', models.CharField(blank=True, max_length=100, null=True)),
                ('Cep', models.CharField(blank=True, max_length=10, null=True)),
                ('Bairro', models.CharField(blank=True, max_length=30, null=True)),
                ('Cidade', models.CharField(blank=True, max_length=50, null=True)),
                ('Telefone1', models.CharField(blank=True, max_length=15, null=True)),
                ('Telefone2', models.CharField(blank=True, max_length=15, null=True)),
                ('email', models.CharField(blank=True, max_length=50, null=True)),
                ('EstoqueNegativo', models.CharField(blank=True, max_length=3, null=True)),
                ('Rede', models.CharField(blank=True, max_length=3, null=True)),
                ('DataAbertura', models.DateField(blank=True, null=True)),
                ('ContaContabil', models.CharField(blank=True, max_length=50, null=True)),
                ('DataEnceramento', models.DateField(blank=True, null=True)),
                ('Matriz', models.CharField(blank=True, max_length=3, null=True)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Material',
            fields=[
                ('Idmaterial', models.BigAutoField(primary_key=True, serialize=False)),
                ('Descricao', models.CharField(max_length=100)),
                ('Codigo', models.CharField(blank=True, max_length=10, null=True)),
                ('Status', models.CharField(blank=True, max_length=10, null=True)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Nat_Lancamento',
            fields=[
                ('idnatureza', models.BigAutoField(primary_key=True, serialize=False)),
                ('codigo', models.CharField(max_length=10)),
                ('categoria_principal', models.CharField(max_length=50)),
                ('subcategoria', models.CharField(max_length=50)),
                ('descricao', models.CharField(max_length=255)),
                ('tipo', models.CharField(max_length=20)),
                ('status', models.CharField(max_length=10)),
                ('tipo_natureza', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Ncm',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ncm', models.CharField(max_length=20)),
                ('campo1', models.CharField(blank=True, max_length=25, null=True)),
                ('descricao', models.CharField(max_length=1000)),
                ('aliquota', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Pagar',
            fields=[
                ('Idpagar', models.BigAutoField(primary_key=True, serialize=False)),
                ('Titulo', models.CharField(max_length=20)),
                ('Parcelado', models.CharField(max_length=1)),
                ('TipoRecebimento', models.CharField(max_length=15)),
                ('Data', models.DateField()),
                ('Data_vencimento', models.DateField()),
                ('Valor', models.DecimalField(decimal_places=2, max_digits=18)),
                ('ContaContabil', models.CharField(max_length=50)),
                ('idcompra', models.IntegerField(blank=True, null=True)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
                ('Idfuncionario', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='systakapp.funcionarios')),
                ('Idnatureza', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.nat_lancamento')),
                ('idcliente', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='systakapp.cliente')),
                ('idloja', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.loja')),
            ],
        ),
        migrations.CreateModel(
            name='PedidoCompra',
            fields=[
                ('Idpedidocompra', models.BigAutoField(primary_key=True, serialize=False)),
                ('Datapedido', models.DateField(blank=True, null=True)),
                ('Dataentrega', models.DateField(blank=True, null=True)),
                ('Valorpedido', models.DecimalField(decimal_places=2, max_digits=18)),
                ('Status', models.CharField(blank=True, max_length=2, null=True)),
                ('Documento', models.CharField(blank=True, max_length=20, null=True)),
                ('data_nf', models.DateField(blank=True, null=True)),
                ('Chave', models.CharField(blank=True, max_length=100, null=True)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
                ('Idfornecedor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.fornecedor')),
                ('Idloja', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.loja')),
            ],
        ),
        migrations.CreateModel(
            name='Produto',
            fields=[
                ('Idproduto', models.BigAutoField(primary_key=True, serialize=False)),
                ('Tipoproduto', models.CharField(max_length=1)),
                ('Descricao', models.CharField(max_length=100)),
                ('Desc_reduzida', models.CharField(max_length=100)),
                ('referencia', models.CharField(default='00.00.00000', max_length=11, unique=True)),
                ('classificacao_fiscal', models.CharField(max_length=100)),
                ('unidade', models.CharField(max_length=15)),
                ('grupo', models.CharField(blank=True, max_length=100, null=True)),
                ('subgrupo', models.CharField(blank=True, max_length=100, null=True)),
                ('familia', models.CharField(blank=True, max_length=100, null=True)),
                ('grade', models.CharField(blank=True, max_length=100, null=True)),
                ('colecao', models.CharField(blank=True, max_length=100, null=True)),
                ('produto_foto', models.CharField(blank=True, max_length=1000, null=True)),
                ('produto_foto1', models.CharField(blank=True, max_length=1000, null=True)),
                ('produto_foto2', models.CharField(blank=True, max_length=1000, null=True)),
                ('Material', models.CharField(blank=True, max_length=50, null=True)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Receber',
            fields=[
                ('Idreceber', models.BigAutoField(primary_key=True, serialize=False)),
                ('Documento', models.CharField(default='0000000000', max_length=10)),
                ('Valor', models.DecimalField(decimal_places=2, max_digits=18)),
                ('ContaContabil', models.CharField(blank=True, max_length=50)),
                ('Nat_Lancamento', models.CharField(blank=True, max_length=50)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
                ('idloja', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.loja')),
            ],
        ),
        migrations.CreateModel(
            name='Subgrupo',
            fields=[
                ('Idsubgrupo', models.BigAutoField(primary_key=True, serialize=False)),
                ('Descricao', models.CharField(max_length=100)),
                ('Margem', models.DecimalField(decimal_places=2, max_digits=6)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Tabelapreco',
            fields=[
                ('Idtabela', models.BigAutoField(primary_key=True, serialize=False)),
                ('NomeTabela', models.CharField(default='Tabela', max_length=100)),
                ('DataInicio', models.DateField()),
                ('Promocao', models.CharField(max_length=3)),
                ('DataFim', models.DateField()),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Unidade',
            fields=[
                ('Idunidade', models.BigAutoField(primary_key=True, serialize=False)),
                ('Descricao', models.CharField(max_length=100)),
                ('Codigo', models.CharField(blank=True, max_length=10, null=True)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='VendaItem',
            fields=[
                ('Idvendaitem', models.BigAutoField(primary_key=True, serialize=False)),
                ('Documento', models.CharField(default='', max_length=20)),
                ('CodigodeBarra', models.CharField(default='0000000000000', max_length=20)),
                ('codigoproduto', models.CharField(default='00.00.00000', max_length=11)),
                ('Qtd', models.IntegerField()),
                ('valorunitario', models.DecimalField(decimal_places=2, max_digits=18)),
                ('Desconto', models.DecimalField(decimal_places=2, max_digits=18)),
                ('Total_item', models.DecimalField(decimal_places=2, max_digits=18)),
                ('iicms', models.DecimalField(decimal_places=5, default=0.0, max_digits=18)),
                ('ipis', models.DecimalField(decimal_places=5, default=0.0, max_digits=18)),
                ('icofins', models.DecimalField(decimal_places=5, default=0.0, max_digits=18)),
                ('icsll', models.DecimalField(decimal_places=5, default=0.0, max_digits=18)),
            ],
        ),
        migrations.CreateModel(
            name='Vendedor',
            fields=[
                ('Idvendedor', models.BigAutoField(primary_key=True, serialize=False)),
                ('nomevendedor', models.CharField(max_length=50)),
                ('apelido', models.CharField(max_length=20)),
                ('cpf', models.CharField(max_length=15)),
                ('aniversario', models.DateField(blank=True, null=True)),
                ('fim', models.DateField(blank=True, null=True)),
                ('categoria', models.CharField(blank=True, max_length=1, null=True)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
                ('idloja', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.loja')),
            ],
        ),
        migrations.CreateModel(
            name='Venda',
            fields=[
                ('Idvenda', models.BigAutoField(primary_key=True, serialize=False)),
                ('Data', models.DateTimeField(default=django.utils.timezone.now)),
                ('Desconto', models.DecimalField(blank=True, decimal_places=2, max_digits=18, null=True)),
                ('Cancelada', models.CharField(blank=True, max_length=2, null=True)),
                ('Documento', models.CharField(default='0000000000', max_length=10)),
                ('Valor', models.DecimalField(decimal_places=2, max_digits=18)),
                ('Tipo_documento', models.CharField(blank=True, max_length=20, null=True)),
                ('comissao', models.DecimalField(decimal_places=5, max_digits=18)),
                ('acrescimo', models.DecimalField(decimal_places=5, max_digits=18)),
                ('tipopag', models.CharField(max_length=20)),
                ('ticms', models.DecimalField(decimal_places=5, default=0.0, max_digits=18)),
                ('tpis', models.DecimalField(decimal_places=5, default=0.0, max_digits=18)),
                ('tcofins', models.DecimalField(decimal_places=5, default=0.0, max_digits=18)),
                ('tcsll', models.DecimalField(decimal_places=5, default=0.0, max_digits=18)),
                ('Idcliente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.cliente')),
                ('Idfuncionario', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='systakapp.funcionarios')),
                ('Idloja', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.loja')),
            ],
        ),
        migrations.CreateModel(
            name='Tamanho',
            fields=[
                ('Idtamanho', models.BigAutoField(primary_key=True, serialize=False)),
                ('Tamanho', models.CharField(max_length=10)),
                ('Descricao', models.CharField(default='Tamanho', max_length=100)),
                ('Status', models.CharField(blank=True, max_length=10, null=True)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
                ('idgrade', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.grade')),
            ],
        ),
        migrations.CreateModel(
            name='TabelaPrecoItem',
            fields=[
                ('Idtabelaitem', models.BigAutoField(primary_key=True, serialize=False)),
                ('codigoproduto', models.CharField(max_length=11)),
                ('codigodebarra', models.CharField(max_length=20)),
                ('preco', models.DecimalField(decimal_places=2, max_digits=18)),
                ('idtabela', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.tabelapreco')),
            ],
        ),
        migrations.CreateModel(
            name='ReceberItens',
            fields=[
                ('Idreceberitens', models.BigAutoField(primary_key=True, serialize=False)),
                ('Titulo', models.CharField(default='00000000-0', max_length=10)),
                ('Parcela', models.IntegerField(default=1)),
                ('Datavencimento', models.DateField(blank=True, null=True)),
                ('Databaixa', models.DateField(blank=True, null=True)),
                ('valor_parcela', models.DecimalField(decimal_places=2, max_digits=18)),
                ('juros', models.DecimalField(blank=True, decimal_places=2, max_digits=18, null=True)),
                ('desconto', models.DecimalField(decimal_places=2, max_digits=18)),
                ('Titulo_descontado', models.CharField(blank=True, max_length=1, null=True)),
                ('Data_desconto', models.DateField(blank=True, null=True)),
                ('idconta', models.IntegerField(blank=True, null=True)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
                ('Idreceber', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.receber')),
            ],
        ),
        migrations.CreateModel(
            name='ReceberCartao',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipo_cartao', models.CharField(choices=[('Débito', 'Débito'), ('Crédito', 'Crédito')], max_length=20)),
                ('data_transacao', models.DateTimeField(default=django.utils.timezone.now)),
                ('valor_transacao', models.DecimalField(decimal_places=2, max_digits=10)),
                ('codigo_autorizacao', models.CharField(max_length=20)),
                ('bandeira', models.CharField(max_length=50)),
                ('parcelas', models.IntegerField(default=1)),
                ('numero_titulo', models.CharField(max_length=20)),
                ('status_transacao', models.CharField(choices=[('Aprovada', 'Aprovada'), ('Negada', 'Negada'), ('Pendente', 'Pendente')], max_length=20)),
                ('mensagem_retorno', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('idvenda', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.venda')),
            ],
        ),
        migrations.CreateModel(
            name='ProdutoDetalhe',
            fields=[
                ('Idprodutodetalhe', models.BigAutoField(primary_key=True, serialize=False)),
                ('CodigodeBarra', models.CharField(max_length=20, unique=True)),
                ('Codigoproduto', models.CharField(default='00.00.00000', max_length=11)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
                ('Item', models.IntegerField(blank=True, default=0, null=True)),
                ('Idcor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.cor')),
                ('Idproduto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.produto')),
                ('Idtamanho', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.tamanho')),
            ],
        ),
        migrations.CreateModel(
            name='PedidoCompraItem',
            fields=[
                ('Idpedidocompraitem', models.BigAutoField(primary_key=True, serialize=False)),
                ('Qtp_pc', models.IntegerField()),
                ('valorunitario', models.DecimalField(decimal_places=2, max_digits=18)),
                ('Desconto', models.DecimalField(decimal_places=2, max_digits=18)),
                ('Total_item', models.DecimalField(decimal_places=2, max_digits=18)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
                ('Idpedidocompra', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.pedidocompra')),
                ('Idproduto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.produto')),
            ],
        ),
        migrations.CreateModel(
            name='PagarItem',
            fields=[
                ('Idpagaritem', models.BigAutoField(primary_key=True, serialize=False)),
                ('parcela', models.CharField(max_length=1)),
                ('Databaixa', models.DateField(blank=True, null=True)),
                ('valor_parcela', models.DecimalField(decimal_places=2, max_digits=18)),
                ('juros', models.DecimalField(decimal_places=2, max_digits=18)),
                ('desconto', models.DecimalField(decimal_places=2, max_digits=18)),
                ('Titulo_descontado', models.CharField(max_length=1)),
                ('Data_desconto', models.DateField()),
                ('idconta', models.IntegerField()),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
                ('Idpagar', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.pagar')),
            ],
        ),
        migrations.CreateModel(
            name='MovimentacaoProdutos',
            fields=[
                ('Idmovprod', models.BigAutoField(primary_key=True, serialize=False)),
                ('Data_mov', models.DateField()),
                ('Documento', models.CharField(default='0000000000', max_length=20)),
                ('Tipo', models.CharField(default='V', max_length=1)),
                ('Qtd', models.IntegerField()),
                ('Valor', models.DecimalField(decimal_places=2, max_digits=18)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
                ('CodigodeBarra', models.CharField(default='0000000000000', max_length=20)),
                ('codigoproduto', models.CharField(default='00.00.00000', max_length=11)),
                ('Idloja', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.loja')),
            ],
        ),
        migrations.CreateModel(
            name='MovimentacaoFinanceira',
            fields=[
                ('Idmovfin', models.BigAutoField(primary_key=True, serialize=False)),
                ('data_movimento', models.DateField()),
                ('Titulo', models.CharField(default='00000000-0', max_length=10)),
                ('TipoMov', models.CharField(default='C', max_length=1)),
                ('TipoFluxo', models.CharField(default='R', max_length=1)),
                ('valor', models.DecimalField(decimal_places=2, max_digits=18)),
                ('data_baixa', models.DateField(blank=True, null=True)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
                ('Idconta', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.contabancaria')),
            ],
        ),
        migrations.CreateModel(
            name='InventarioItem',
            fields=[
                ('Idinventario_item', models.BigAutoField(primary_key=True, serialize=False)),
                ('Valor_contado', models.IntegerField()),
                ('Valor_ajustado', models.IntegerField()),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
                ('Idinventario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.inventario')),
                ('Idproduto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.produto')),
                ('Idprodutodetalhe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.produtodetalhe')),
            ],
        ),
        migrations.AddField(
            model_name='inventario',
            name='Idloja',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.loja'),
        ),
        migrations.CreateModel(
            name='Imposto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('icms', models.DecimalField(decimal_places=2, max_digits=5)),
                ('pis', models.DecimalField(decimal_places=2, max_digits=5)),
                ('cofins', models.DecimalField(decimal_places=2, max_digits=5)),
                ('csll', models.DecimalField(decimal_places=2, max_digits=5)),
                ('idloja', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.loja')),
            ],
        ),
        migrations.CreateModel(
            name='GrupoDetalhe',
            fields=[
                ('IdGrupoDetalhe', models.BigAutoField(primary_key=True, serialize=False)),
                ('idgrupo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.grupo')),
                ('idsubgrupo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.subgrupo')),
            ],
        ),
        migrations.AddField(
            model_name='funcionarios',
            name='idloja',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.loja'),
        ),
        migrations.CreateModel(
            name='Estoque',
            fields=[
                ('Idestoque', models.BigAutoField(primary_key=True, serialize=False)),
                ('CodigodeBarra', models.CharField(max_length=20)),
                ('codigoproduto', models.CharField(default='00.00.00000', max_length=11)),
                ('Estoque', models.IntegerField(blank=True, null=True)),
                ('reserva', models.IntegerField(blank=True, null=True)),
                ('valorestoque', models.DecimalField(blank=True, decimal_places=2, max_digits=18, null=True)),
                ('Idloja', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.loja')),
            ],
        ),
        migrations.CreateModel(
            name='Despesa',
            fields=[
                ('iddespesa', models.AutoField(primary_key=True, serialize=False)),
                ('data', models.DateField()),
                ('descricao', models.CharField(max_length=200)),
                ('autorizado', models.CharField(max_length=20)),
                ('valor', models.DecimalField(decimal_places=2, max_digits=10)),
                ('recibo', models.CharField(max_length=20)),
                ('idloja', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.loja')),
            ],
        ),
        migrations.CreateModel(
            name='CompraItem',
            fields=[
                ('Idcompraitem', models.BigAutoField(primary_key=True, serialize=False)),
                ('Qtd', models.IntegerField()),
                ('Valorunitario', models.DecimalField(decimal_places=2, max_digits=18)),
                ('Descontoitem', models.DecimalField(decimal_places=2, max_digits=18)),
                ('Totalitem', models.DecimalField(decimal_places=2, max_digits=18)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
                ('Idcompra', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.compra')),
                ('Idproduto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.produto')),
            ],
        ),
        migrations.AddField(
            model_name='compra',
            name='Idfornecedor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.fornecedor'),
        ),
        migrations.AddField(
            model_name='compra',
            name='Idloja',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.loja'),
        ),
        migrations.CreateModel(
            name='Caixa',
            fields=[
                ('idcaixa', models.AutoField(primary_key=True, serialize=False)),
                ('data', models.DateField()),
                ('saldoanterior', models.DecimalField(decimal_places=2, max_digits=10)),
                ('saldofinal', models.DecimalField(decimal_places=2, max_digits=10)),
                ('despesas', models.DecimalField(decimal_places=2, max_digits=10)),
                ('pix', models.DecimalField(decimal_places=2, max_digits=10)),
                ('debito', models.DecimalField(decimal_places=2, max_digits=10)),
                ('credito', models.DecimalField(decimal_places=2, max_digits=10)),
                ('parcelado', models.DecimalField(decimal_places=2, max_digits=10)),
                ('dinheiro', models.DecimalField(decimal_places=2, max_digits=10)),
                ('status', models.CharField(default='A', max_length=1)),
                ('enviado', models.BooleanField(default=False)),
                ('usuario', models.CharField(default='none', max_length=100)),
                ('idloja', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.loja')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('type', models.CharField(choices=[('Regular', 'Regular'), ('Caixa', 'Caixa'), ('Gerente', 'Gerente'), ('Admin', 'Admin')], default='Regular', max_length=10)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
    ]
