import ResponseTable from '@components/ResponseTable/ResponseTable';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import './style.scss';

const produtoTable = [
  { Coluna: 'ID', Tipo: 'SERIAL', 'Obrigatório': 'sim', 'Chave Primária': 'sim', 'Chave Estrangeira': 'Não', Referencia: '-' },
  { Coluna: 'Nome', Tipo: 'VARCHAR(64)', 'Obrigatório': 'sim', 'Chave Primária': 'não', 'Chave Estrangeira': 'Não', Referencia: '-' },
  { Coluna: 'Preco_Unitario', Tipo: 'MONEY', 'Obrigatório': 'sim', 'Chave Primária': 'não', 'Chave Estrangeira': 'Não', Referencia: '-' },
];

const descontoTable = [
  { Coluna: 'ID', Tipo: 'SERIAL', 'Obrigatório': 'sim', 'Chave Primária': 'sim', 'Chave Estrangeira': 'Não', Referencia: '-' },
  { Coluna: 'Data_Inicio', Tipo: 'DATE', 'Obrigatório': 'sim', 'Chave Primária': 'não', 'Chave Estrangeira': 'Não', Referencia: '-' },
  { Coluna: 'Data_Fim', Tipo: 'DATE', 'Obrigatório': 'sim', 'Chave Primária': 'não', 'Chave Estrangeira': 'Não', Referencia: '-' },
  { Coluna: 'Porcentagem', Tipo: 'NUMERIC(3, 2)', 'Obrigatório': 'sim', 'Chave Primária': 'não', 'Chave Estrangeira': 'Não', Referencia: '-' },
];

const produtoDescontoTable = [
  { Coluna: 'Produto_ID', Tipo: 'SERIAL', 'Obrigatório': 'sim', 'Chave Primária': 'sim', 'Chave Estrangeira': 'sim', Referencia: 'Produto' },
  { Coluna: 'Desconto_ID', Tipo: 'SERIAL', 'Obrigatório': 'sim', 'Chave Primária': 'sim', 'Chave Estrangeira': 'sim', Referencia: 'Desconto' },
];

export default function AvailableTables() {
  return (
    <Box className="available-tables-page">
      <Paper className='table1'>
        <Typography variant='h3'> Produto </Typography>
        <ResponseTable data={produtoTable} />
      </Paper>

      <Paper className='table2'>
        <Typography variant='h3'> Desconto </Typography>
        <ResponseTable data={descontoTable} />
      </Paper>

      <Paper className='table3'>
        <Typography variant='h3'> ProdutoDesconto </Typography>
        <ResponseTable data={produtoDescontoTable} />
      </Paper>
    </Box>
  );

};
