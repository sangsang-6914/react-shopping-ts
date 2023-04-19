import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MyCart from './pages/MyCart';
import Home from './pages/Home';
import NewProduct from './pages/NewProduct';
import ProductDetail from './pages/ProductDetail';
import Products from './pages/Products';
import NotFound from './components/NotFound';
import './index.css';
import App from './App';
import ProtectedRoute from './components/ProtectedRoute';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        index: true,
        element: <Home />,
      },
      { path: '/products', element: <Products /> },
      {
        path: '/products/:id',
        element: <ProductDetail />,
      },
      {
        path: '/products/new',
        element: (
          <ProtectedRoute requiredAdmin>
            <NewProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: '/carts',
        element: (
          <ProtectedRoute>
            <MyCart />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
