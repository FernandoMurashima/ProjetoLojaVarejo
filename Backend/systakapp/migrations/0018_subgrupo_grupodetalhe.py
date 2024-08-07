# Generated by Django 4.2.11 on 2024-06-27 14:30

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('systakapp', '0017_remove_subgrupo_idgrupo_delete_tiposdesubgrupo_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Subgrupo',
            fields=[
                ('Idsubgrupo', models.AutoField(primary_key=True, serialize=False)),
                ('Descricao', models.CharField(max_length=100)),
                ('Margem', models.DecimalField(decimal_places=2, max_digits=6)),
                ('data_cadastro', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='GrupoDetalhe',
            fields=[
                ('IdGrupoDetalhe', models.AutoField(primary_key=True, serialize=False)),
                ('idgrupo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.grupo')),
                ('idsubgrupo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='systakapp.subgrupo')),
            ],
        ),
    ]
