# Generated by Django 4.2.11 on 2024-07-08 13:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('systakapp', '0031_tamanho_descricao'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tabelapreco',
            old_name='Data',
            new_name='DataFim',
        ),
        migrations.RenameField(
            model_name='tabelapreco',
            old_name='validade',
            new_name='DataInicio',
        ),
        migrations.RenameField(
            model_name='tabelapreco',
            old_name='Idprodutotabela',
            new_name='Idtabela',
        ),
        migrations.RemoveField(
            model_name='tabelapreco',
            name='CodigodeBarra',
        ),
        migrations.RemoveField(
            model_name='tabelapreco',
            name='Idloja',
        ),
        migrations.RemoveField(
            model_name='tabelapreco',
            name='Idprodutodetalhe',
        ),
        migrations.RemoveField(
            model_name='tabelapreco',
            name='preco',
        ),
        migrations.CreateModel(
            name='TabelaPrecoItem',
            fields=[
                ('Idtabelaitem', models.AutoField(primary_key=True, serialize=False)),
                ('codigoproduto', models.CharField(max_length=11)),
                ('codigodebarra', models.CharField(max_length=20)),
                ('preco', models.DecimalField(decimal_places=2, max_digits=18)),
                ('idtabela', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.tabelapreco')),
            ],
        ),
    ]
