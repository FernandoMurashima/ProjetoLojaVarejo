# Generated by Django 4.2.11 on 2024-07-23 01:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('systakapp', '0043_remove_vendaitem_idvenda'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='venda',
            name='Data_venda',
        ),
    ]
