import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage';
import Products from '../components/Products/Products';
import SoloProduct from '../components/SoloProduct';
import ManageProducts from '../components/ManageProducts/ManageProducts';
import CreateProduct from '../components/CreateProduct/CreateProduct';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/products",
        element: <Products />
      },
      {
        path: "/products/my-products",
        element: <ManageProducts />
      },
      {
        path: "/products/:productId",
        element: <SoloProduct />
      },
      {
        path: "/products/new-product",
        element: <CreateProduct />
      }
    ],
  },
]);
