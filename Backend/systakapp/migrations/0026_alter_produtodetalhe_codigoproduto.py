# Generated by Django 4.2.11 on 2024-07-03 12:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('systakapp', '0025_alter_colecao_contador'),
    ]

    operations = [
        migrations.AlterField(
            model_name='produtodetalhe',
            name='Codigoproduto',
            field=models.CharField(default='00.00.00000', max_length=11),
        ),
    ]
