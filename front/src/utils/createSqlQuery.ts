import { TTables } from "../types";

type SelectQuery = {
  select: string,
  from: TTables,
  fromAlias?: string,
  join?: boolean,
  joinAlias?: string,
  where?: string,
}

export function createSelectQuery({ select, from, fromAlias, where, join, joinAlias }: SelectQuery) {
  if (!select) {
    select = '*'
  }

  let sqlQuery = `SELECT ${select} `;

  if (!join) {
    sqlQuery += ` FROM ${from} `;
    if (where) {
      sqlQuery += ` WHERE ${where} `;
    }
    return sqlQuery + ';';
  }

  const produtoAlias = (from === 'Produto' ? fromAlias : joinAlias) || 'Produto';
  const descontoAlias = (from === 'Desconto' ? fromAlias : joinAlias) || 'Desconto';

  sqlQuery += ' FROM ProdutoDesconto ___PD ';
  sqlQuery += ` INNER JOIN Produto ${produtoAlias} ON ___PD.Produto_ID = ${produtoAlias}.ID`;
  sqlQuery += ` INNER JOIN Desconto ${descontoAlias} ON ___PD.Desconto_ID = ${descontoAlias}.ID`;

  if (where) {
    sqlQuery += ` WHERE ${where} `;
  }

  return sqlQuery + ';';
}