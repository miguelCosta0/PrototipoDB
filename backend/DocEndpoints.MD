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
## Descontos (/descontos)

- ### GET(/)
    -   Retorna todos os descontos registrados

- ### GET(/?AssociadoComProdutoId = Number)
    -   Faz um Join dos produtos com todos os descontos no qual ele é associado
    - Retorno:
    `prodid | descid | data_inicio | data_fim | porcentagem`
- ### GET(/:id)
    -   Retorna o desconto com o ID associado