# Generated by Django 4.2.11 on 2024-07-25 21:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('systakapp', '0045_remove_venda_idvendedor_venda_idfuncionario'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='receber',
            name='Data',
        ),
        migrations.RemoveField(
            model_name='receber',
            name='Data_vencimento',
        ),
        migrations.RemoveField(
            model_name='receber',
            name='Idnatureza',
        ),
        migrations.RemoveField(
            model_name='receber',
            name='Parcelado',
        ),
        migrations.RemoveField(
            model_name='receber',
            name='idcliente',
        ),
        migrations.RemoveField(
            model_name='receber',
            name='idvenda',
        ),
        migrations.RemoveField(
            model_name='receberitens',
            name='parcela',
        ),
        migrations.AddField(
            model_name='receber',
            name='Documento',
            field=models.CharField(default='0000000000', max_length=10),
        ),
        migrations.AddField(
            model_name='receber',
            name='Nat_Lancamento',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AddField(
            model_name='receberitens',
            name='Datavencimento',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='receber',
            name='ContaContabil',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='receber',
            name='TipoRecebimento',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AlterField(
            model_name='receber',
            name='Titulo',
            field=models.CharField(default='00000000-0', max_length=10),
        ),
        migrations.AlterField(
            model_name='venda',
            name='Documento',
            field=models.CharField(default='0000000000', max_length=10),
        ),
    ]