# Generated by Django 4.2.11 on 2024-07-25 22:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('systakapp', '0048_remove_receber_titulo_alter_receberitens_titulo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='receberitens',
            name='Parcela',
            field=models.IntegerField(default=1),
        ),
    ]
