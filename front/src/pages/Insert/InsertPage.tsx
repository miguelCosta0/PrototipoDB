import { useState } from 'react';
import { createInsertDescontoQuery, createInsertProdutoDescontoQuery, createInsertProdutoQuery } from '@utils/createSqlQuery';
import ResponseTable from '@components/ResponseTable/ResponseTable';
import { TData, TTables } from '@types';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import './style.scss';

export default function InsertPage() {
  const [table, setTable] = useState<TTables>('Produto');
  const [responseTable, setResponseTable] = useState<TTables>('Produto');

  // produto
  const [nome, setNome] = useState('');
  const [precoUnitario, setPrecoUnitario] = useState('');

  // desconto
  const [data_Inicio, setData_Inicio] = useState('');
  const [data_Fim, setData_Fim] = useState('');
  const [porcentagem, setPorcentagem] = useState('');

  // produto_desconto
  const [produto_id, setProduto_id] = useState('');
  const [desconto_id, setDesconto_id] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TData | null>(null);

  return (
    <Box className="insert-page">
      <Paper className='form'>
        <Box>
          <Typography variant='body1'> INSERT INTO: </Typography>

          <FormControl>
            <InputLabel> Tabela </InputLabel>
            <Select
              value={table}
              onChange={handleTableChange}
              label='Tabela'
            >
              <MenuItem value='Produto'> Produto </MenuItem>
              <MenuItem value='Desconto'> Desconto </MenuItem>
              <MenuItem value='ProdutoDesconto'> ProdutoDesconto </MenuItem>
            </Select>
          </FormControl>
        </Box>
        {
          table === 'Produto' &&
          <>
            <Box>
              <TextField
                onBlur={(e) => setNome(e.target.value.trim())}
                label='Nome'
                helperText='Campo obrigatório'
              />
            </Box>
            <Box>
              <TextField
                onBlur={(e) => setPrecoUnitario(e.target.value.trim())}
                label='Preço unitário'
                placeholder='Ex.: 199,50'
                helperText='Campo obrigatório'
              />
            </Box>
          </>
        }
        {
          table === 'Desconto' &&
          <>
            <Box>
              <TextField
                onBlur={(e) => setData_Inicio(e.target.value.trim())}
                label='Data Inicio'
                placeholder='AAAA-MM-DD'
                helperText='Campo obrigatório'
              />
            </Box>
            <Box>
              <TextField
                onBlur={(e) => setData_Fim(e.target.value.trim())}
                label='Data Fim'
                placeholder='AAAA-MM-DD'
                helperText='Campo obrigatório'
              />
            </Box>
            <Box>
              <TextField
                onBlur={(e) => setPorcentagem(e.target.value.trim())}
                label='Porcentagem'
                placeholder='Ex.: 20%'
                helperText='Campo obrigatório'
              />
            </Box>
          </>
        }
        {
          table === 'ProdutoDesconto' &&
          <>
            <Box>
              <TextField
                onBlur={(e) => setProduto_id(e.target.value.trim())}
                label='Produto_id'
                helperText='Campo obrigatório'
              />
            </Box>
            <Box>
              <TextField
                onBlur={(e) => setDesconto_id(e.target.value.trim())}
                label='Desconto_id'
                helperText='Campo obrigatório'
              />
            </Box>
          </>
        }

        <Button
          onClick={handleQuerySubmit}
          disabled={!canSubmit()}
        >
          Enviar
        </Button>
      </Paper>

      <Paper className="response">
        {
          error &&
          <Alert variant="filled" severity="error">
            <AlertTitle>ERRO</AlertTitle>
            {error}
          </Alert>
        }
        {
          data && (
            data.length === 0 ? (
              <Alert variant="filled" severity="warning">
                Nenhuma linha foi atualizada.
              </Alert>
            ) : (
              <Alert variant="filled" severity="success">
                {
                  data.length === 1
                    ? `1 linha foi atualizada na tabela ${responseTable}.` :
                    `${data.length} linhas foram atualizadas na tabela ${responseTable}.`
                }
              </Alert>
            )
          )
        }
        {data && data.length > 0 && <ResponseTable data={data} />}
      </Paper>
    </Box>
  );

  function handleTableChange(e: SelectChangeEvent<TTables>) {
    setTable(e.target.value);
    setNome('');
    setPrecoUnitario('');
    setData_Inicio('');
    setData_Fim('');
    setPorcentagem('');
    setProduto_id('');
    setDesconto_id('');
    setError(null);
  }

  function canSubmit() {
    switch (table) {
      case 'Produto':
        return !!(nome && precoUnitario);
      case 'Desconto':
        return !!(data_Inicio && data_Fim && porcentagem);
      case 'ProdutoDesconto':
        return !!(produto_id && desconto_id);
    }
  }

  async function handleQuerySubmit() {
    try {
      let res: Awaited<Promise<Response | undefined>>;
      switch (table) {
        case 'Produto':
          res = await insertProduto();
          break;
        case 'Desconto':
          res = await insertDesconto();
          break;
        case 'ProdutoDesconto':
          res = await insertProdutoDesconto();
          break;
      }
      if (!res) return;

      const data = await res.json();

      if (data.error) {
        setData(null);
        setError(data.error);
      } else {
        setData(data);
        setResponseTable(table);
        setError(null);
      }
    } catch (e) {
      console.log(e);
      if (e instanceof Error) {
        setError(e.message);
      }
      setData(null);
    }
  }

  async function insertProduto() {
    const _preco = parseInt(precoUnitario.replace(',', '.').replace(/$|R$/, ''));
    if (!_preco) {
      setError('Valor de Preço unitário inválido.');
      setData(null);
      return;
    }
    return fetch(`${process.env.DB_URL}/rawsql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sql: createInsertProdutoQuery(nome, _preco)
      })
    });
  }

  async function insertDesconto() {
    const _porc = parseInt(porcentagem.replace('%', '').replace(',', '.'));
    if (!data_Inicio.match(/^\d{4}-\d{2}-\d{2}$/)) {
      setError('Data Inicio inválida.');
      setData(null);
      return;
    }
    if (!data_Fim.match(/^\d{4}-\d{2}-\d{2}$/)) {
      setError('Data Fim inválida.');
      setData(null);
      return;
    }
    if (!_porc || _porc <= 0 || _porc > 50) {
      setError('Porcentagem inválida.');
      setData(null);
      return;
    }
    return fetch(`${process.env.DB_URL}/rawsql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sql: createInsertDescontoQuery(data_Inicio, data_Fim, _porc / 100)
      })
    });
  }

  async function insertProdutoDesconto() {
    const prodId = parseInt(produto_id);
    const descId = parseInt(desconto_id);

    if (Number.isNaN(prodId)) {
      setError('Produto_id inválido.');
      setData(null);
      return;
    }
    if (Number.isNaN(descId)) {
      setError('Desconto_id inválido.');
      setData(null);
      return;
    }
    return fetch(`${process.env.DB_URL}/rawsql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sql: createInsertProdutoDescontoQuery(prodId, descId)
      })
    });
  }
};
