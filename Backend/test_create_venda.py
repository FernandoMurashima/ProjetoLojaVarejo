import requests

url = "http://127.0.0.1:8000/vendas/create_venda/"
payload = {
    "venda": {
        "Idloja": 2,
        "Idcliente": 2,
        "Desconto": 0,
        "Cancelada": "N",
        "Documento": "14",
        "Valor": 235,
        "Tipo_documento": "NFce",
        "Idvendedor": 2,
        "comissao": 2.35,
        "acrescimo": 0,
        "tipopag": "CREDITO_A_VISTA"
    },
    "itens": [
        {
            "Documento": "14",
            "CodigodeBarra": "789123401551",
            "codigoproduto": "789123401551",
            "Qtd": 1,
            "valorunitario": 235,
            "Desconto": 0,
            "Total_item": 235
        }
    ]
}
headers = {
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)
print(response.status_code)
print(response.json())
