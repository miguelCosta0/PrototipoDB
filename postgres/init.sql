CREATE SCHEMA ecommerce;
SET search_path TO ecommerce, public;

CREATE TABLE Cliente (
  CPF varchar(11) NOT NULL PRIMARY KEY,
  Nome varchar(255) NOT NULL
);

CREATE TABLE Funcionario (
  ID serial NOT NULL PRIMARY KEY,
  Nome varchar(255) NOT NULL,
  Tipo int NOT NULL,
  Salario money NOT NULL
);

CREATE TABLE CarrinhoVenda (
  ID serial NOT NULL PRIMARY KEY,
  Cliente_CPF varchar(11) NOT NULL REFERENCES Cliente (CPF),
  Foi_Concluído boolean NOT NULL,
  Data_Hora timestamp NULL,
  Valor_Total money NULL
);

CREATE TABLE Suporte (
  Funcionario_ID serial NOT NULL REFERENCES Funcionario (ID),
  Cliente_CPF varchar(11) NOT NULL REFERENCES Cliente (CPF),
  CarrinhoVenda_ID serial NOT NULL REFERENCES CarrinhoVenda (ID),
  Protocolo varchar(15) NOT NULL,
  Data date	NOT NULL,
  CONSTRAINT Suporte_PK PRIMARY KEY (Protocolo)
);

CREATE TABLE Produto (
  ID serial NOT NULL PRIMARY KEY,
  Nome varchar(64) NOT NULL UNIQUE,
  Preco_Unitario money NOT NULL
);

CREATE TABLE CarrinhoProduto (
  CarrinhoVenda_ID serial NOT NULL REFERENCES CarrinhoVenda (ID),
  Produto_ID serial NOT NULL REFERENCES Produto (ID),
  Quantidade int NOT NULL,
  CONSTRAINT CarrinhoProduto_PK PRIMARY KEY (CarrinhoVenda_ID, Produto_ID)
);

CREATE TABLE Desconto (
  ID serial NOT NULL PRIMARY KEY,
  Data_Inicio date NOT NULL,
  Data_Fim date NOT NULL,
  Porcentagem numeric(3, 2) NOT NULL
);

CREATE TABLE ProdutoDesconto (
  Produto_ID serial NOT NULL REFERENCES Produto (ID),
  Desconto_ID serial NOT NULL REFERENCES Desconto (ID),
  CONSTRAINT ProdutoDesconto_PK PRIMARY KEY (Produto_ID, Desconto_ID)
);

CREATE TABLE Categoria (
  ID serial NOT NULL PRIMARY KEY,
  Nome varchar(64) NOT NULL UNIQUE
);

CREATE TABLE ProdutoCategoria (
  Produto_ID serial NOT NULL REFERENCES Produto (ID),
  Categoria_ID serial NOT NULL REFERENCES Categoria (ID),
  CONSTRAINT ProdutoCategoria_PK PRIMARY KEY (Produto_ID, Categoria_ID)
);

INSERT INTO Cliente (CPF, Nome) VALUES
('09746130021', 'Ana Silva'),
('23453769023', 'Bruno Mendes'),
('78722921060', 'Carla Oliveira'),
('98444992089', 'Daniel Souza'),
('49269550087', 'Eliana Santos');
INSERT INTO Funcionario (Nome, Tipo, Salario) VALUES
('Adriano Rodrigues', 1, 4500.00),
('Débora Barbosa', 2, 2800.50),
('Renato Martins', 1, 5100.00),
('Francisca Souza', 3, 3200.00);

INSERT INTO CarrinhoVenda (Cliente_CPF, Foi_Concluído, Data_Hora, Valor_Total) VALUES
('09746130021', TRUE, '2025-10-10 14:30:00', 530.73),
('23453769023', FALSE, NULL, NULL),
('78722921060', TRUE, '2025-10-13 10:05:30', 179.55),
('09746130021', FALSE, NULL, NULL),
('49269550087', TRUE, '2025-10-19 13:50:00', 760.99),
('98444992089', FALSE, NULL, NULL),
('49269550087', FALSE, NULL, NULL),
('78722921060', FALSE, NULL, NULL);

INSERT INTO Suporte (Funcionario_ID, Cliente_CPF, CarrinhoVenda_ID, Protocolo, Data) VALUES
(1, '09746130021', 1, 'SUP-0001-2025', '2025-10-14'),
(2, '23453769023', 2, 'SUP-0002-2025', '2025-10-14'),
(3, '78722921060', 3, 'SUP-0003-2025', '2025-10-15');

INSERT INTO Produto (Nome, Preco_Unitario) VALUES
('Tênis Esportivo', 189.90),
('Camiseta Branca lisa', 39.90),
('Calça Jeans Slim', 199.90),
('Relógio Smartwatch', 499.50),
('Óculos de Sol Classic', 155.49),
('Smart TV 70"', 2000.00),
('Aspirador de Pó Vertical', 820.00),
('Mouse Gamer RGB', 145.99),
('Monitor LED 24"', 1150.00);

INSERT INTO CarrinhoProduto (CarrinhoVenda_ID, Produto_ID, Quantidade) VALUES
(1, 1, 1),
(1, 3, 2),
(2, 6, 1),
(3, 2, 5),
(4, 1, 2),
(4, 4, 1),
(5, 7, 1),
(5, 8, 1);

INSERT INTO Desconto (Data_Inicio, Data_Fim, Porcentagem) VALUES
('2025-10-01', '2025-10-15', 0.10),
('2025-12-31', '2026-01-01', 0.05),
('2025-12-20', '2025-12-25', 0.25),
('2025-10-10', '2025-10-20', 0.25);

INSERT INTO ProdutoDesconto (Produto_ID, Desconto_ID) VALUES
(1, 1),
(2, 1),
(3, 1),
(7, 4),
(9, 2),
(6, 3);

INSERT INTO Categoria (Nome) VALUES
('Vestuário'),
('Acessórios'),
('Eletrodomésticos'),
('Informática');

INSERT INTO ProdutoCategoria (Produto_ID, Categoria_ID) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 2),
(4, 4),
(5, 2),
(6, 3),
(6, 4),
(7, 3),
(8, 4),
(9, 4);
