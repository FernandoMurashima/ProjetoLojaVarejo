# Generated by Django 4.2.11 on 2024-07-25 21:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('systakapp', '0046_remove_receber_data_remove_receber_data_vencimento_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='receberitens',
            name='Parcela',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='receberitens',
            name='Titulo',
            field=models.CharField(default='00000000', max_length=10),
        ),
        migrations.AlterField(
            model_name='receber',
            name='Titulo',
            field=models.CharField(default='00000000', max_length=10),
        ),
    ]
