import { createBrowserRouter } from 'react-router';

import Layout from '@components/Layout/Layout';
import SelectPage from '@pages/Select/SelectPage';
import Redirect from '@components/Redirect/Redirect';

const router = createBrowserRouter([
  {
    element: <Layout />,

    children: [
      {
        path: '/selecao',
        element: <SelectPage />,
      },
      {
        path: '*',
        element: <Redirect />,
      },
    ],
  },
]);

export default router;
