USE [Systak]
go


CREATE TABLE [Loja] (
  [Idloja] int PRIMARY KEY,
  [nome_loja] varchar(50) NOT NULL,
  [Apelido_loja] varchar(20) NOT NULL,
  [cnpj] varchar(18) NOT NULL,
  [Logradouro] varchar(10) NULL,
  [Endereco] varchar(50) NULL,
  [numero] varchar(10) NULL,
  [Complemento] varchar(100) NULL,
  [Cep] varchar(10) NULL,
  [Bairro] varchar(30) NULL,
  [Cidade] varchar(50) NULL,
  [Telefone1] varchar(15) NULL,
  [Telefone2] varchar(15) NULL,
  [email] varchar(50) NULL,
  [EstoqueNegativo] varchar(1) NULL,
  [Rede] varchar(1) NULL,
  [DataAbertura] Date NOT NULL,
  [ContaContabil] varchar(50) NULL,
  [DataEnceramento] Date NULL,
  [Matriz] varchar(1) NULL,
  [DataCadastro] date NOT NULL
);


CREATE TABLE [Cliente] (
  [Idcliente] int PRIMARY KEY,
  [Nome_cliente] varchar(50) NOT NULL,
  [Apelido] varchar(18) NOT NULL,
  [cpf] varchar(15) NOT NULL,
  [Logradouro] varchar(10) NULL,
  [Endereco] varchar(50) NULL,
  [numero] varchar(10) NULL,
  [Complemento] varchar(100) NULL,
  [Cep] varchar(10) NULL,
  [Bairro] varchar(30) NULL,
  [Cidade] varchar(50) NULL,
  [Telefone1] varchar(15) NULL,
  [Telefone2] varchar(15) NULL,
  [email] varchar(50) NULL,
  [Categoria] varchar(15) NULL,
  [Bloqueio] varchar(5) NULL,
  [Aniversario] Date NULL,
  [MalaDireta] varchar(1) NULL,
  [ContaContabil] varchar(15) NULL,
  [DataCadastro] date NOT NULL
);

CREATE TABLE [Fornecedor] (
  [Idfornecedor] int PRIMARY KEY,
  [Nome_fornecedor] varchar(50) NOT NULL,
  [Apelido] varchar(18) NOT NULL,
  [Documento] varchar(15) NOT NULL,
  [Logradouro] varchar(10) NULL,
  [Endereco] varchar(50) NULL,
  [numero] varchar(10) NULL,
  [Complemento] varchar(100) NULL,
  [Cep] varchar(10) NULL,
  [Bairro] varchar(30) NULL,
  [Cidade] varchar(50) NULL,
  [Telefone1] varchar(15) NULL,
  [Telefone2] varchar(15) NULL,
  [email] varchar(50) NULL,
  [Categoria] varchar(15) NULL,
  [Bloqueio] varchar(5) NULL,
  [Aniversario] Date NULL,
  [MalaDireta] varchar(1) NULL,
  [ContaContabil] varchar(15) NULL,
  [DataCadastro] date NOT NULL
);

CREATE TABLE [Vendedor] (
  [Idvendedor] int PRIMARY KEY,
  [idloja] int NOT NULL,
  [nomevendedor] varchar(50) NOT NULL,
  [apelido] varchar(20) NOT NULL,
  [cpf] varchar(15) NOT NULL,
  [aniversario] date NULL,
  [fim] date NULL,
  [categoria] varchar(1),
  [DataCadastro] date NOT NULL,

    FOREIGN KEY (Idloja) REFERENCES Loja(Idloja)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE [Funcionarios] (
  [Idfuncionario] int PRIMARY KEY,
  [idloja] int NOT NULL,
  [nomefuncionario] varchar(50) NOT NULL,
  [apelido] varchar(20) NOT NULL,
  [cpf] varchar(15) NOT NULL,
  [aniversario] date NULL,
  [fim] date NULL,
  [categoria] varchar(1),
  [DataCadastro] date NOT NULL,

  FOREIGN KEY (Idloja) REFERENCES Loja(Idloja)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE [Tamanho] (
  [Idtamanho] int PRIMARY KEY,
  [Descricao] varchar(100) NOT NULL,
  [Tamanho] varchar(10) NOT NULL,
  [DataCadastro] date NOT NULL
);

CREATE TABLE [Cor] (
  [Idcor] int PRIMARY KEY,
  [Descricao] varchar(100) NOT NULL,
  [Cor] varchar(30) NOT NULL,
  [DataCadastro] date NOT NULL
);

CREATE TABLE [Natureza lançamento] (
  [Idnatureza] int PRIMARY KEY	,
  [descricao] varchar(100) NOT NULL,
  [Codigoreduzido] varchar(20) NULL,
  [ContaContabil] varchar(50) NULL,
  [Tipo] varchar(2) NULL,
  [status] varchar(10) NULL,
  [DataCadastro] date NOT NULL
);

CREATE TABLE [ContaBancaria] (
  [Idconta] int PRIMARY KEY,
  [descricao] varchar(30) NOT NULL,
  [banco] varchar(100) NOT NULL,
  [agencia] varchar(20) NOT NULL,
  [numero] int NOT NULL,
  [DataSaldo] date NULL,
  [Saldo] numeric(18,2) NOT NULL,
  [DataCadastro] date NOT NULL
);

CREATE TABLE [Produto] (
  [Idproduto] int PRIMARY KEY,
  [Tipoproduto] varchar(1) NOT NULL,
  [Descricao] varchar(100) NOT NULL,
  [Desc_reduzida] varchar(100) NOT NULL,
  [classificacao_fiscal] varchar(100) NOT NULL,
  [unidade] varchar(15) NOT NULL,
  [grupo] varchar(100) NULL,
  [subgrupo] varchar(100) NULL,
  [familia] varchar(100) NULL,
  [grade] varchar(100) NULL,
  [colecao] varchar(100) NULL,
  [produto_foto] varchar(100) NULL,
  [Material] varchar(50) NULL,
  [DataCadastro] date NOT NULL
  );

CREATE TABLE [Produto_detalhe] (
  [Idprodutodetalhe] int PRIMARY KEY,
  [Idproduto] int NOT NULL,
  [CodigodeBarra] varchar(20) NOT NULL,
  [Idtamanho] int NOT NULL,
  [Idcor] int NOT NULL,
  [DataCadastro] date NOT NULL,

  FOREIGN KEY (Idproduto) REFERENCES Produto(Idproduto)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


CREATE TABLE [Tabelapreco] (
  [Idprodutotabela] int PRIMARY KEY,
  [Idprodutodetalhe] int NOT NULL,
  [Idloja] int NOT NULL,
  [CodigodeBarra] varchar(20) NOT NULL,
  [preco] numeric(18,2) NOT NULL,
  [Data] date NOT NULL,
  [Promocao] varchar(1) NOT NULL,
  [validade] date NOT NULL,
  [DataCadastro] date NOT NULL
);

CREATE TABLE [Estoque] (
  [Idestoque] int PRIMARY KEY,
  [Idprodutodetalhe] int NOT NULL,
  [CodigodeBarra] varchar(20) NOT NULL,
  [Idloja] int NOT NULL,
  [Estoque] int NULL,
  [reserva] int NULL,
  [valorestoque] numeric(18,2) NULL,

  FOREIGN KEY (Idprodutodetalhe) REFERENCES Produto_detalhe(Idprodutodetalhe)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (Idloja) REFERENCES Loja(Idloja)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE [Venda] (
  [Idvenda] int PRIMARY KEY,
  [Idloja] int NOT NULL,
  [Idcliente] int NOT NULL,
  [Data] date NOT NULL, 
  [Data_entrega] date NOT NULL,
  [Desconto] numeric(18,2) NULL,
  [Cancelada] varchar(2) NULL,
  [Documento] varchar(20) NOT NULL,
  [Valor] numeric(18,2) NOT NULL,
  [Tipo_documento] nvarchar(20),
  [idvendedor] int NOT NULL,
  [comissao] numeric(18,2) NOT NULL,
  [acrescimo] numeric(18,2)NOT NULL,
  [tipopag] varchar(20) NOT NULL,
  [DataCadastro] date NOT NULL,

  FOREIGN KEY (Idcliente) REFERENCES Cliente(Idcliente)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (Idloja) REFERENCES Loja(Idloja)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


CREATE TABLE [Venda_item] (
  [Idvendaitem] int PRIMARY KEY,
  [Idvenda] int NOT NULL,
  [Idproduto] int NOT NULL,
  [Idprodutodetalhe] int NOT NULL,
  [Qtd] int NOT NULL,
  [valorunitario] numeric(18,2) NOT NULL,
  [Desconto] numeric(18,2) NOT NULL,
  [Total_item] numeric(18,2) NOT NULL,
  [DataCadastro] date NOT NULL,

  FOREIGN KEY (Idvenda) REFERENCES Venda(Idvenda)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


CREATE TABLE [MovimentaçãoFinanceira] (
  [Idmovfin] int PRIMARY KEY,
  [tipo] varchar(1) NOT NULL,
  [data_movimento] date NOT NULL,
  [idreceberitem] int NULL,
  [idpagaritem] int NULL,
  [valor] numeric(18,2)NOT NULL,
  [data_baixa] date NOT NULL,
  [Idconta] int NOT NULL,
  [DataCadastro] date NOT NULL,
);

CREATE TABLE [MovimentacaoProdutos] (
  [Idmovprod] int PRIMARY KEY,
  [Data_mov] date NOT NULL,
  [idproduto] int NOT NULL,
  [Idprodutodetalhe] int NOT NULL,
  [Documento] varchar(20) NOT NULL,
  [Tipo] varchar(2) NOT NULL,
  [Qtd] int NOT NULL,
  [Valor] numeric(18,2) NOT NULL,
  [Idloja] int NOT NULL,
  [idvendaitem] int NULL,
  [idcompraitem] int NULL,
  [DataCadastro] date NOT NULL,
);

CREATE TABLE [Inventario] (
  [Idinventario] int PRIMARY KEY,
  [Idloja] int NOT NULL,
  [Data_inventario] date NOT NULL,
  [Descricao] varchar(50) NOT NULL,
  [status] varchar(2) NOT NULL,
  [DataCadastro] date NOT NULL,
  
);

CREATE TABLE [Inventario_item] (
  [Idinventario_item] int PRIMARY KEY,
  [Idinventario] int NOT NULL,
  [Idproduto] int NOT NULL,
  [Idprodutodetalhe] int NOT NULL,
  [Valor_contado] int NOT NULL,
  [Valor_ajustado] int NOT NULL,
  [DataCadastro] date NOT NULL,

  FOREIGN KEY (Idinventario) REFERENCES Inventario(Idinventario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE [Receber] (
  [Idreceber] int PRIMARY KEY,
  [Titulo] varchar(20) NOT NULL,
  [idloja] int NOT NULL,
  [idcliente] int NOT NULL,
  [idvenda] int NOT NULL,
  [Idnatureza] int NOT NULL,
  [Parcelado] varchar(1) NOT NULL,
  [TipoRecebimento] varchar(15) NOT NULL,
  [Data] Date NOT NULL,
  [Data_vencimento] Date NOT NULL,
  [Valor] numeric(18,2) NOT NULL,
  [ContaContabil] varchar(50) NOT NULL,
  [DataCadastro] date NOT NULL,

  FOREIGN KEY (Idcliente) REFERENCES Cliente(Idcliente)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (Idloja) REFERENCES Loja(Idloja)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
);

CREATE TABLE [ReceberItens] (
  [Idreceberitens] int PRIMARY KEY,
  [Idreceber] int NOT NULL,
  [parcela] varchar(1) NOT NULL,
  [Databaixa] Date NULL,
  [valor_parcela] numeric(18,2) NOT NULL,
  [juros] numeric(18,2) NULL,
  [desconto] numeric(18,2) NOT NULL,
  [Titulo_descontado] varchar(1) NULL,
  [Data_desconto] Date NULL,
  [idconta] int,
  [DataCadastro] date NOT NULL,

  FOREIGN KEY (Idreceber) REFERENCES Receber(Idreceber)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
);

CREATE TABLE [Pagar] (
  [Idpagar] int PRIMARY KEY,
  [idloja] int NOT NULL,
  [Titulo] varchar(20) NOT NULL,
  [Parcelado] varchar(1) NOT NULL,
  [TipoRecebimento] varchar(15) NOT NULL,
  [Data] Date NOT NULL,
  [Data_vencimento] Date NOT NULL,
  [Valor] numeric(18,2) NOT NULL,
  [Idnatureza] int NOT NULL,
  [ContaContabil] varchar(50) NOT NULL,
  [idcliente] int NULL,
  [Idvendedor] int NULL,
  [Idfuncionario] int NULL,
  [idcompra] int NULL,
  [DataCadastro] date NOT NULL,
  
  FOREIGN KEY (Idloja) REFERENCES Loja(Idloja)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

);

CREATE TABLE [Pagaritem] (
  [Idpagaritem] int PRIMARY KEY,
  [Idpagar] int NOT NULL,
  [parcela] varchar(1) NOT NULL,
  [Databaixa] Date NULL,
  [valor_parcela] numeric(18,2) NOT NULL,
  [juros] numeric(18,2) NOT NULL,
  [desconto] numeric(18,2) NOT NULL,
  [Titulo_descontado] varchar(1) NOT NULL,
  [Data_desconto] Date NOT NULL,
  [idconta] int NOT NULL,
  [DataCadastro] date NOT NULL,
  
  FOREIGN KEY (Idpagar) REFERENCES Pagar(Idpagar)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
);


CREATE TABLE [Compra] (
  [Idcompra] int PRIMARY KEY,
  [Idfornecedor] int NOT NULL,
  [Idloja] int NOT NULL,
  [Datacompra] date NULL,
  [Status] varchar(2) NULL,
  [Valorpedido] numeric(18,2) NOT NULL,
  [Documento] varchar(20) NOT NULL,
  [Datadocumento] date NOT NULL,
  [Idpedidocompra] int NULL,
  [DataCadastro] date NOT NULL,
);

CREATE TABLE [Compraitem] (
  [Idcompraitem] int,
  [Idcompra] int,
  [Idproduto] int,
  [Qtd] int,
  [Valorunitario] numeric(18,2),
  [Descontoitem] numeric(18,2),
  [Totalitem] numeric(18,2),
  [DataCadastro] date NOT NULL,

  FOREIGN KEY (Idpagar) REFERENCES Pagar(Idpagar)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

);

CREATE TABLE [Pedidocompra] (
  [Idpedidocompra] int,
  [Idfornecedor] int,
  [Datapedido] date,
  [Dataentrega] date,
  [Valorpedido] numeric(18,2),
  [Status] varchar(2),
  [Documento] varchar(20),
  [data_nf] date,
  [Chave] varchar(100),
  [Idloja] int,
  [DataCadastro] date NOT NULL,
  
);

CREATE TABLE [Pedidocompraitem] (
  [Idpedidocompraitem] int,
  [Idpedidocompra] int,
  [Idproduto] int,
  [Qtp_pc] int,
  [valorunitario] numeric(18,2),
  [Desconto] numeric(18,2),
  [Total_item] numeric(18,2),
  [DataCadastro] date NOT NULL,
);
