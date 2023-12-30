import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Component/Home/Home';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import Layout from './Layout/Layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children : [
      {
        path : '/',
        element : <Home></Home>,
      },
      {
        path : '/login',
        element : <Login></Login>

      },
      {
        path : '/register',
        element : <Register></Register>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
