import { createBrowserRouter } from 'react-router';

import Layout from '@components/Layout/Layout';
import Redirect from '@components/Redirect/Redirect';
import SelectPage from '@pages/Select/SelectPage';
import InsertPage from '@pages/Insert/InsertPage';
import UpdatePage from '@pages/Update/UpdatePage';
import DeletePage from '@pages/Delete/DeletePage';

const router = createBrowserRouter([
  {
    element: <Layout />,

    children: [
      {
        path: '/selecionar',
        element: <SelectPage />,
      },
      {
        path: '/adicionar',
        element: <InsertPage />,
      },
      {
        path: '/atualizar',
        element: <UpdatePage />,
      },
      {
        path: '/deletar',
        element: <DeletePage />,
      },
      {
        path: '*',
        element: <Redirect />,
      },
    ],
  },
]);

export default router;
