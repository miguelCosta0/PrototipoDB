import { formatInTimeZone } from 'date-fns-tz';
import { TData } from "../../types";

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';

export type ResponseTableProps = {
  data: TData,
};

// data.length > 0 !
export default function ResponseTable({ data }: ResponseTableProps) {
  const columns = Object.keys(data[0]);

  return (
    <TableContainer component={Paper}>
      <Table align='center'>
        <TableHead>
          <TableRow>
            {
              columns.map((col, idx) => (
                <TableCell key={idx} align='center'>{col}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>

        <TableBody>
          {
            data.map((row, idx) => (
              <TableRow key={idx}>
                {
                  columns.map((col, idx) =>
                    <TableCell key={idx} align='center'>
                      {formatCell(col, row[col])}
                    </TableCell>
                  )
                }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

function formatCell(colName: string, cell: any) {
  if (colName.toLowerCase().includes('data')) {
    return formatInTimeZone(cell, 'UTC', 'dd/MM/yyyy');
  }
  if (colName.toLowerCase().includes('preco')) {
    return (cell as string).replace('$', 'R$');
  }
  if (colName.toLowerCase().includes('porcentagem')) {
    return ((cell as number) * 100) + '%';
  }
  return cell;
}