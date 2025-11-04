CREATE SCHEMA ecommerce;
SET search_path TO ecommerce, public;

CREATE TABLE Produto (
  ID serial NOT NULL PRIMARY KEY,
  Nome varchar(64) NOT NULL UNIQUE,
  Preco_Unitario money NOT NULL
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
