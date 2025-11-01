import { useEffect, useContext, useState, use } from 'react';
import { Outlet, useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import './style.scss';

export default function Layout() {
  const nav = useNavigate();

  return (
    <Box id="home">

      <AppBar position='static' className='navbar'>
        <Toolbar>
          <Box onClick={() => nav('selecao')}>
            <Typography> seleção </Typography>
          </Box>
          <Box onClick={() => nav('adicionar')}>
            <Typography> adicionar </Typography>
          </Box>
          <Box onClick={() => nav('alterar')}>
            <Typography> alterar </Typography>
          </Box>
          <Box onClick={() => nav('deletar')}>
            <Typography> deletar </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Box id="content">
        <Outlet />
      </Box>
    </Box>
  )
};


