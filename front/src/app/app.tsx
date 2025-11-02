import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import router from './router';
// import { CustomThemeProvider } from '@context/theme';
import { ThemeProvider } from '@emotion/react';

// import './style.scss';


const root = createRoot(document.getElementById('root')!);
root.render(
  // <ThemeProvider theme={{\}}>
  <RouterProvider router={router} />
  // </ThemeProvider>
);
