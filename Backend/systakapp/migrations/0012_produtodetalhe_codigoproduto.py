# Generated by Django 4.2.11 on 2024-06-24 00:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('systakapp', '0011_grade_remove_tamanho_descricao_tamanho_idgrade'),
    ]

    operations = [
        migrations.AddField(
            model_name='produtodetalhe',
            name='Codigoproduto',
            field=models.CharField(default=1, max_length=6),
            preserve_default=False,
        ),
    ]
