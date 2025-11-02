import { useEffect, useState } from 'react';

import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';

export type ResponseTableProps = {
  data: Array<Record<string, any>>,
};

// TODO   LIDAR COM DATAS!
// data.length > 0 !
export default function ResponseTable({ data }: ResponseTableProps) {
  const columns = Object.keys(data[0]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {
              columns.map((col, idx) => (
                <TableCell key={idx}>{col}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>

        <TableBody>
          {
            data.map((row, idx) => (
              <TableRow key={idx}>
                {
                  columns.map((col, idx) => {
                    const cell = row[col];
                    return (
                      <TableCell key={idx}>{cell}</TableCell>
                    );
                  })
                }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};
