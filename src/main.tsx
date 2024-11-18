import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import Summary from './companens/summary.tsx';
import Tabletekmegjelen from './companens/Tabletmegjelen.tsx';
import Tabletekfelvetel from './companens/tabletfel.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Summary></Summary>
  },
  {
    path: "/tabletek-megjelen/:tabletid",
    element: <Tabletekmegjelen></Tabletekmegjelen>

  },
  {
    path: "/hozzad",
    element: <Tabletekfelvetel></Tabletekfelvetel>

  },

]);


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)