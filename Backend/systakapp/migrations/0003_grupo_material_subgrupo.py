# Generated by Django 4.2.11 on 2024-06-18 18:59

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('systakapp', '0002_alter_funcionarios_categoria'),
    ]

    operations = [
        migrations.CreateModel(
            name='Grupo',
            fields=[
                ('Idgrupo', models.AutoField(primary_key=True, serialize=False)),
                ('Codigo', models.CharField(max_length=12)),
                ('Descricao', models.CharField(max_length=100)),
                ('Margem', models.DecimalField(decimal_places=2, max_digits=6)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Material',
            fields=[
                ('Idmaterial', models.AutoField(primary_key=True, serialize=False)),
                ('Descricao', models.CharField(max_length=100)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='Subgrupo',
            fields=[
                ('Idsubgrupo', models.AutoField(primary_key=True, serialize=False)),
                ('Codigo', models.CharField(max_length=12)),
                ('Descricao', models.CharField(max_length=100)),
                ('Margem', models.DecimalField(decimal_places=2, max_digits=6)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
                ('idgrupo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.grupo')),
            ],
        ),
    ]
