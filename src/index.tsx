import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router';
import { DataStructuresPageRoute } from '@/pages/data-structures';
import { AlgorithmsPageRoute } from '@/pages/algorithms';
import { createRoot } from 'react-dom/client';
import { App } from '@/pages';

import '@/index.css';

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { path: 'algorithms', Component: AlgorithmsPageRoute },
      { path: 'data-structures', Component: DataStructuresPageRoute },
    ],
  },
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
