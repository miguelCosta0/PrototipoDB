import { useState } from 'react';
import { createDeleteQuery } from '@utils/createSqlQuery';
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

export default function DeletePage() {
  const [table, setTable] = useState<TTables>('Produto');
  const [where, setWhere] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TData | null>(null);
  const [responseTable, setResponseTable] = useState<TTables>('Produto');

  return (
    <Box className="delete-page">
      <Paper className='form'>
        <Box>
          <Typography variant='body1'> DELETE FROM: </Typography>

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
          <Typography variant='body1'> WHERE: </Typography>
          <TextField onBlur={(e) => setWhere(e.target.value.trim())} />
        </Box>

        <Button onClick={handleQuerySubmit}>
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
                Nenhuma linha foi apagada.
              </Alert>
            ) : (
              <Alert variant="filled" severity="success">
                {
                  data.length === 1
                    ? `1 linha foi apagada na tabela ${responseTable}.` :
                    `${data.length} linhas foram apagadas na tabela ${responseTable}.`
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
          sql: createDeleteQuery({
            fromTable: table,
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
