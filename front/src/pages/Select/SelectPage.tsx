import { useState } from 'react';
import { createSelectQuery } from '@utils/createSqlQuery';
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
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import './style.scss';

export default function SelectPage() {
  const [select, setSelect] = useState('');
  const [table, setTable] = useState<TTables>('Produto');
  const [tableAlias, setTableAlias] = useState('');
  const [where, setWhere] = useState('');
  const [canJoin, setCanJoin] = useState(false);
  const [joinAlias, setJoinAlias] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TData | null>(null);

  return (
    <Box className="select-page">
      <Paper className='form'>
        <Box>
          <Typography variant='body1'> SELECT: </Typography>
          <TextField onBlur={(e) => setSelect(e.target.value.trim())} />
        </Box>

        <Box>
          <Typography variant='body1'> FROM: </Typography>

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

          <Typography variant='body1'> AS: </Typography>
          <TextField onBlur={(e) => setTableAlias(e.target.value.trim())} />
        </Box>

        {
          table !== 'ProdutoDesconto' && (
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    size='small'
                    checked={canJoin}
                    onChange={(e) => setCanJoin(e.target.checked)}
                  />
                }
                label={
                  <Typography
                    variant='body1'
                    color={canJoin ? 'textPrimary' : 'textDisabled'}
                  >
                    {`Join ${table === 'Produto' ? 'Desconto' : 'Produto'}`}
                  </Typography>
                }
              />

              <Typography
                variant='body1'
                color={canJoin ? 'textPrimary' : 'textDisabled'}
              >
                AS:
              </Typography>
              <TextField
                onBlur={(e) => setJoinAlias(e.target.value.trim())}
                disabled={!canJoin}
              />
            </Box>
          )
        }

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
                Não foi encontrada nenhuma linha.
              </Alert>
            ) : (
              <ResponseTable data={data} />
            )
          )
        }
      </Paper>
    </Box>
  );

  function handleTableChange(e: SelectChangeEvent<TTables>) {
    setTable(e.target.value);
    if (e.target.value === 'ProdutoDesconto') {
      setCanJoin(false);
    }
  }

  async function handleQuerySubmit() {
    try {
      const res = await fetch(`${process.env.DB_URL}/rawsql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sql: createSelectQuery({
            select,
            from: table,
            fromAlias: tableAlias,
            where,
            join: canJoin,
            joinAlias
          })
        })
      });

      const data = await res.json();

      if (data.error) {
        setData(null);
        setError(data.error);
      } else {
        setData(data);
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
