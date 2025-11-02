import { TTables } from "@types";

type SelectQueryArgs = {
  select: string,
  from: TTables,
  fromAlias?: string,
  join?: boolean,
  joinAlias?: string,
  where?: string,
}

export function createSelectQuery({ select, from, fromAlias, where, join, joinAlias }: SelectQueryArgs) {
  if (!select) {
    select = '*'
  }

  let sqlQuery = `SELECT ${select} `;

  if (!join) {
    sqlQuery += ` FROM ${from} ${fromAlias}`;
    if (where) {
      sqlQuery += ` WHERE ${where} `;
    }
    return sqlQuery + ';';
  }

  const produtoAlias = (from === 'Produto' ? fromAlias : joinAlias) || 'Produto';

  const descontoAlias = (from === 'Desconto' ? fromAlias : joinAlias) || 'Desconto';
  console.log(produtoAlias, descontoAlias);

  sqlQuery += ' FROM ProdutoDesconto ___PD ';
  sqlQuery += ` INNER JOIN Produto ${produtoAlias} ON ___PD.Produto_ID = ${produtoAlias}.ID`;
  sqlQuery += ` INNER JOIN Desconto ${descontoAlias} ON ___PD.Desconto_ID = ${descontoAlias}.ID`;

  if (where) {
    sqlQuery += ` WHERE ${where} `;
  }

  return sqlQuery + ';';
}

type DeleteQueryArgs = {
  fromTable: TTables,
  where?: string,
}

export function createDeleteQuery({ fromTable, where }: DeleteQueryArgs) {
  let sqlQuery = `DELETE FROM ${fromTable} `;
  if (where) {
    sqlQuery += ` WHERE ${where} `;
  }
  return sqlQuery + ' RETURNING *;';
}

type UpdateQueryArgs = {
  table: TTables,
  set: string,
  where?: string,
}

export function createUpdateQuery({ table, set, where }: UpdateQueryArgs) {
  let sqlQuery = `UPDATE ${table} SET ${set} `;
  if (where) {
    sqlQuery += ` WHERE ${where} `;
  }
  return sqlQuery + ' RETURNING *;';
}


export function createInsertProdutoQuery(nome: string, preco: number) {
  let sqlQuery = `INSERT INTO Produto (Nome, Preco_unitario) `;
  sqlQuery += ` VALUES ('${nome}', ${preco})`;
  return sqlQuery + ' RETURNING *;';
}

export function createInsertDescontoQuery(dataInicio: string, dataFim: string, porcentagem: number) {
  let sqlQuery = `INSERT INTO Desconto (Data_inicio, Data_fim, Porcentagem) `;
  sqlQuery += ` VALUES ('${dataInicio}', '${dataFim}', ${porcentagem})`;
  return sqlQuery + ' RETURNING *;';
}

export function createInsertProdutoDescontoQuery(produto_id: number, desconto_id: number) {
  let sqlQuery = `INSERT INTO ProdutoDesconto (Produto_id, Desconto_id) `;
  sqlQuery += ` VALUES (${produto_id}, ${desconto_id})`;
  return sqlQuery + ' RETURNING *;';
}