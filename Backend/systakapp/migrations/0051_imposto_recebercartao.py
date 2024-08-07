# Generated by Django 4.2.11 on 2024-08-05 22:58

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('systakapp', '0050_alter_venda_acrescimo_alter_venda_comissao'),
    ]

    operations = [
        migrations.CreateModel(
            name='Imposto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('icms', models.DecimalField(decimal_places=2, max_digits=5)),
                ('pis', models.DecimalField(decimal_places=2, max_digits=5)),
                ('cofins', models.DecimalField(decimal_places=2, max_digits=5)),
                ('csll', models.DecimalField(decimal_places=2, max_digits=5)),
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
    ]
