from django.test import TestCase, Client
from django.urls import reverse
from .models import Estoque  # Substitua pelo caminho correto do seu modelo

class EstoqueViewTest(TestCase):
    def setUp(self):
        # Setup necessário, crie objetos necessários para o teste
        self.client = Client()
        self.estoque = Estoque.objects.create(
            CodigodeBarra='789123401579',
            Idloja=2,
            Estoque=100
        )
    
    def test_update_estoque(self):
        url = reverse('estoque_update')  # Substitua 'estoque_update' pelo nome correto da URL
        data = {
            'CodigodeBarra': '789123401579',
            'Idloja': 2,
            'Estoque': 90
        }
        response = self.client.put(url + f'?CodigodeBarra={data["CodigodeBarra"]}&Idloja={data["Idloja"]}/', data, content_type='application/json')
        
        # Verifique se a resposta é 200 OK
        self.assertEqual(response.status_code, 200)
        
        # Verifique se o estoque foi atualizado corretamente
        self.estoque.refresh_from_db()
        self.assertEqual(self.estoque.Estoque, data['Estoque'])

