# Generated by Django 4.2.11 on 2024-07-06 01:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('systakapp', '0030_alter_codigos_variavel'),
    ]

    operations = [
        migrations.AddField(
            model_name='tamanho',
            name='Descricao',
            field=models.CharField(default='Tamanho', max_length=100),
        ),
    ]
