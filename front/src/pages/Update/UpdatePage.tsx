import { useState } from 'react';
import { createUpdateQuery } from '@utils/createSqlQuery';
import ResponseTable from '@components/ResponseTable/ResponseTable';
import { TData, TTables } from '@types';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import './style.scss';

const URL_DB = 'http://127.0.0.1:3333'; // tira isso

export default function UpdatePage() {
  const [table, setTable] = useState<TTables>('Produto');
  const [set, setSet] = useState('');
  const [where, setWhere] = useState('');
  const [responseTable, setResponseTable] = useState<TTables>('Produto');

  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TData | null>(null);

  return (
    <Box className="update-page">
      <Paper className='form'>
        <Box>
          <Typography variant='body1'> UPDATE: </Typography>

          <FormControl>
            <InputLabel> Tabela </InputLabel>
            <Select
              value={table}
              onChange={(e) => setTable(e.target.value)}
              label='Tabela'
            >
              <MenuItem value='Produto'> Produto </MenuItem>
              <MenuItem value='Desconto'> Desconto </MenuItem>
              <MenuItem value='ProdutoDesconto'> ProdutoDesconto </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Typography variant='body1'> SET: </Typography>
          <TextField
            value={set}
            onChange={(e) => setSet(e.target.value)}
            onBlur={(e) => setSet(e.target.value.trim())}
            helperText='Campo obrigatório'
          />
        </Box>

        <Box>
          <Typography variant='body1'> WHERE: </Typography>
          <TextField onBlur={(e) => setWhere(e.target.value.trim())} />
        </Box>

        <Button
          onClick={handleQuerySubmit}
          disabled={!set}
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


  async function handleQuerySubmit() {
    try {
      const res = await fetch(`${URL_DB}/rawsql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sql: createUpdateQuery({
            table,
            set,
            where,
          })
        })
      });

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

};
