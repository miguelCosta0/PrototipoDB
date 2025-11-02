import { useEffect, useState } from 'react';
import { createSelectQuery } from '@utils/createSqlQuery';
import ResponseTable from '@components/ResponseTable/ResponseTable';
import { TTables } from '../../types';

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

const URL_DB = 'http://127.0.0.1:3333'; // tira isso

export default function SelectPage() {
  const [select, setSelect] = useState('');
  const [table, setTable] = useState<TTables>('Produto');
  const [tableAlias, setTableAlias] = useState('');
  const [where, setWhere] = useState('');
  const [canJoin, setCanJoin] = useState(false);
  const [joinAlias, setJoinAlias] = useState('');

  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<Array<Record<string, any>> | undefined>();

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
            </Select>
          </FormControl>

          <Typography variant='body1'> AS: </Typography>
          <TextField onBlur={(e) => setTableAlias(e.target.value.trim())} />
        </Box>

        <Box>
          <FormControlLabel
            control={
              <Checkbox
                size='small'
                value={canJoin}
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
    // setJoinTable(e.target.value === 'Produto' ? 'Desconto' : 'Produto');
  }

  async function handleQuerySubmit() {

    try {
      const res = await fetch(`${URL_DB}/rawsql`, {
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

      // console.log('teve erro mas passou aq');

      const data = await res.json();
      // console.log(data);

      if (data.error) {
        setError(data.error);
        setData(undefined);
      } else {
        setError(undefined);
        setData(data);
      }
    } catch (e) {
      console.log(e);

      if (e instanceof Error) {
        setError(e.message);
      }

      setData(undefined);
    }
  }

};


{/* <Box className='join-clause'>
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  size='small'
                  value={canJoin}
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

            <Typography variant='body1'> AS: </Typography>
            <TextField onBlur={(e) => setJoinAlias(e.target.value.trim())} />

             <FormControl>
              <Select
                value={joinType}
                onChange={handleJoinTypeChange}
                disabled={!canJoin}
              >
                <MenuItem value='inner'> Inner Join </MenuItem>
                <MenuItem value='left'> Left Join </MenuItem>
                <MenuItem value='right'> Right Join </MenuItem>
              </Select>
            </FormControl> 
          </Box>

          <Box>
            <Typography
              variant='body1'
              color={canJoin ? 'textPrimary' : 'textDisabled'}
            > ON:
            </Typography>

            <TextField
              disabled={!canJoin}
              onChange={handleJoinConditionChange}
            />
          </Box> 
        </Box> */}


// function handleJoinTypeChange(e: SelectChangeEvent<TJoin['type']>) {
//   setJoinType(e.target.value);
// }

// function handleJoinConditionChange(e: ChangeEvent<HTMLInputElement>) {
//   setJoinCondition(e.target.value);
// }