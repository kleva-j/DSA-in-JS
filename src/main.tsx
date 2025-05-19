import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router';
import { AlgorithmsPageRoute } from '@/pages/algorithms';
import { createRoot } from 'react-dom/client';
import { BASE_PATH } from '@/lib/constants';

import App from './App';

import './index.css';

const router = createBrowserRouter([
  {
    path: BASE_PATH,
    Component: App,
    children: [
      { path: 'algorithms', Component: AlgorithmsPageRoute },
      { path: 'data-structures', Component: () => <div>Data Structures</div> },
    ],
  },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
