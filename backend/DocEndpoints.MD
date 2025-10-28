# Endpoints

## Tabelas (/tabelas)
Usado para conseguir informacoes de tabelas especificas
- ### GET (/)
    - Retorna o nome de todas tabelas disponiveis no banco de dados
- ### GET (/NOMETABELA)
    - Retorna todos os atributos da tabela no seguinte formato:
        `column_name | is_nullable | data_type`

## Produtos (/produtos)
Usado para manipular e inserir qualquer produto na base de dados
- ### GET(/)
    -   Retorna todos os produtos da base de dados no formato:
        `id | nome | preco_unitario`
- ### GET(/:id)
    -   Retorna as informações de um produto especifico dado seu ID, também no formato
        `id | nome | preco_unitario`
- ### POST(/)
    - Cria um novo produto
    #####
    - O body da requisicao deve ser um JSON na seguinte interface:
    `{
        	"Nome": "StringNomeProduto",
	"Preco_Unitario": Number
    }`
    #####
    - O retorno será no formato:
    `{		"id": Number,
		"nome": "StringNomeProduto",
		"preco_unitario": Number}`

## Descontos (/descontos)

- ### GET(/)
    -   Retorna todos os descontos registrados

- ### GET(/:id)
    -   Retorna o desconto com o ID associado

- ### GET(/?AssociadoComProdutoId = Number)
    - Faz um Join dos produtos com todos os descontos no qual ele é associado
    ######
    - Retorno:
    `prodid | descid | data_inicio | data_fim | porcentagem`

- ### POST(/)
    -  Cria um novo desconto, a validade das datas nao sao checadas, use essa informação com cuidado
    ####
    -  Body:
    `{"data_inicio": "YYYY-MM-DD",
	"data_fim": "YYYY-MM-DD",
	"porcentagem": 0 < Number <= 1
    }`
    ####
    - Return
    `{"id": Number,
    "data_inicio": "YYYY-MM-DD",
	"data_fim": "YYYY-MM-DD",
	"porcentagem": 0 < Number <= 1
    }`