BEGIN TRANSACTION;

INSERT INTO "systakapp_colecao" ("Idcolecao","Descricao","Status","data_cadastro","Codigo","Estacao","Contador") VALUES (1,'Coleção Verão 24','Ativo','2024-06-21 00:04:35.294000','24','01',8);
INSERT INTO "systakapp_colecao" ("Idcolecao","Descricao","Status","data_cadastro","Codigo","Estacao","Contador") VALUES (2,'Coleção Outono 24','Ativo','2024-06-30 14:18:30.107000','24','02',0);
INSERT INTO "systakapp_colecao" ("Idcolecao","Descricao","Status","data_cadastro","Codigo","Estacao","Contador") VALUES (3,'Coleção Inverno 24','Ativo','2024-07-31 12:45:15.808000','24','03',0);
INSERT INTO "systakapp_colecao" ("Idcolecao","Descricao","Status","data_cadastro","Codigo","Estacao","Contador") VALUES (4,'Coleção Primavera 24','Ativo','2024-07-31 12:45:57.902000','24','04',0);
INSERT INTO "systakapp_codigos" ("Idcodigo","valor_var","variavel") VALUES (0,'1','VEMPR');
INSERT INTO "systakapp_codigos" ("Idcodigo","valor_var","variavel") VALUES (1,'1','EMPRESA');
INSERT INTO "systakapp_codigos" ("Idcodigo","valor_var","variavel") VALUES (2,'1','Nfce');
COMMIT;
