import os
import django

# Configure o Django para acessar o banco de dados
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'systakback.settings')
django.setup()

from systakapp.models import Nat_Lancamento

# Dados a serem inseridos
dados = [
    {"codigo": "1.1", "categoria_principal": "Receitas", "subcategoria": "Receitas Operacionais", "descricao": "Receitas provenientes da venda de produtos.", "tipo": "Receita", "status": "Ativa", "tipo_natureza": "Analítica"},
    {"codigo": "1.2", "categoria_principal": "Receitas", "subcategoria": "Receitas Operacionais", "descricao": "Receitas provenientes da prestação de serviços.", "tipo": "Receita", "status": "Ativa", "tipo_natureza": "Analítica"},
    {"codigo": "1.3", "categoria_principal": "Receitas", "subcategoria": "Receitas Não Operacionais", "descricao": "Receitas provenientes do aluguel de propriedades.", "tipo": "Receita", "status": "Ativa", "tipo_natureza": "Analítica"},
    {"codigo": "1.4", "categoria_principal": "Receitas", "subcategoria": "Receitas Não Operacionais", "descricao": "Receitas provenientes de investimentos financeiros.", "tipo": "Receita", "status": "Ativa", "tipo_natureza": "Analítica"},
    {"codigo": "1.5", "categoria_principal": "Receitas", "subcategoria": "Receitas Financeiras", "descricao": "Receitas de juros sobre investimentos.", "tipo": "Receita", "status": "Ativa", "tipo_natureza": "Analítica"},
    {"codigo": "1.6", "categoria_principal": "Receitas", "subcategoria": "Receitas Financeiras", "descricao": "Receitas de dividendos de ações.", "tipo": "Receita", "status": "Ativa", "tipo_natureza": "Analítica"},
    {"codigo": "1.7", "categoria_principal": "Receitas", "subcategoria": "Receitas Financeiras", "descricao": "Receitas de provenientes de venda de servicos.", "tipo": "Receita", "status": "Ativa", "tipo_natureza": "Analítica"},
    {"codigo": "2.1", "categoria_principal": "Despesas", "subcategoria": "Despesas Operacionais", "descricao": "Pagamentos de salários e encargos trabalhistas.", "tipo": "Despesa", "status": "Ativa", "tipo_natureza": "Analítica"},
    {"codigo": "2.2", "categoria_principal": "Despesas", "subcategoria": "Despesas Operacionais", "descricao": "Despesas com materiais de escritório.", "tipo": "Despesa", "status": "Ativa", "tipo_natureza": "Analítica"},
    {"codigo": "2.3", "categoria_principal": "Despesas", "subcategoria": "Despesas Operacionais", "descricao": "Despesas com marketing e publicidade.", "tipo": "Despesa", "status": "Ativa", "tipo_natureza": "Analítica"},
    {"codigo": "2.4", "categoria_principal": "Despesas", "subcategoria": "Despesas Não Operacionais", "descricao": "Despesas com aluguel de propriedades.", "tipo": "Despesa", "status": "Ativa", "tipo_natureza": "Analítica"},
    {"codigo": "2.5", "categoria_principal": "Despesas", "subcategoria": "Despesas Não Operacionais", "descricao": "Despesas com manutenção de equipamentos.", "tipo": "Despesa", "status": "Ativa", "tipo_natureza": "Analítica"},
    {"codigo": "2.6", "categoria_principal": "Despesas", "subcategoria": "Despesas Financeiras", "descricao": "Pagamentos de juros sobre empréstimos.", "tipo": "Despesa", "status": "Ativa", "tipo_natureza": "Analítica"},
    {"codigo": "2.7", "categoria_principal": "Despesas", "subcategoria": "Despesas Financeiras", "descricao": "Pagamentos de tarifas bancárias.", "tipo": "Despesa", "status": "Ativa", "tipo_natureza": "Analítica"},
    {"codigo": "2.8", "categoria_principal": "Despesas", "subcategoria": "Despesas Financeiras", "descricao": "Pagamentos de fornecedortes produtos revenda.", "tipo": "Despesa", "status": "Ativa", "tipo_natureza": "Analítica"},
    {"codigo": "3.1", "categoria_principal": "Transferências", "subcategoria": "Transferências Internas", "descricao": "Movimentações entre contas bancárias da empresa.", "tipo": "Transferência", "status": "Ativa", "tipo_natureza": "Analítica"},
    {"codigo": "3.2", "categoria_principal": "Transferências", "subcategoria": "Transferências Internas", "descricao": "Movimentações entre centros de custo.", "tipo": "Transferência", "status": "Ativa", "tipo_natureza": "Analítica"},
    {"codigo": "3.3", "categoria_principal": "Transferências", "subcategoria": "Transferências Externas", "descricao": "Movimentações para contas de investimentos.", "tipo": "Transferência", "status": "Ativa", "tipo_natureza": "Analítica"},
    {"codigo": "3.4", "categoria_principal": "Transferências", "subcategoria": "Transferências Externas", "descricao": "Movimentações para filiais da empresa.", "tipo": "Transferência", "status": "Ativa", "tipo_natureza": "Analítica"},
    {"codigo": "4.1", "categoria_principal": "Investimentos", "subcategoria": "Investimentos em Ativos Fixos", "descricao": "Aquisição de novos equipamentos.", "tipo": "Investimento", "status": "Ativa", "tipo_natureza": "Analítica"},
    {"codigo": "4.2", "categoria_principal": "Investimentos", "subcategoria": "Investimentos em Ativos Fixos", "descricao": "Aquisição de novos imóveis.", "tipo": "Investimento", "status": "Ativa", "tipo_natureza": "Analítica"},
    {"codigo": "5.1", "categoria_principal": "Investimentos", "subcategoria": "Investimentos Financeiros", "descricao": "Investimentos em títulos financeiros.", "tipo": "Investimento", "status": "Ativa", "tipo_natureza": "Analítica"},
    {"codigo": "5.2", "categoria_principal": "Investimentos", "subcategoria": "Investimentos Financeiros", "descricao": "Investimentos em ações.", "tipo": "Investimento", "status": "Ativa", "tipo_natureza": "Analítica"},
    {"codigo": "6.1", "categoria_principal": "Outros", "subcategoria": "Provisões e Ajustes", "descricao": "Provisões para inadimplência.", "tipo": "Outro", "status": "Ativa", "tipo_natureza": "Analítica"},
    {"codigo": "6.2", "categoria_principal": "Outros", "subcategoria": "Provisões e Ajustes", "descricao": "Ajustes de valor de inventário.", "tipo": "Outro", "status": "Ativa", "tipo_natureza": "Analítica"},
]

# Inserir os dados no banco de dados
for item in dados:
    Nat_Lancamento.objects.create(**item)

print("Dados inseridos com sucesso!")
