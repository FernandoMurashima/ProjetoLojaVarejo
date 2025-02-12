# Generated by Django 4.2.11 on 2024-08-20 21:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('systakapp', '0004_funcionarios_meta'),
    ]

    operations = [
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
                ('idloja', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.loja')),
            ],
        ),
    ]
