import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import ErrorPage from '../pages/ErrorPage';
import Product from "../pages/RegisterProduct";
import User from "../pages/RegisterUser";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        index: true,
        element: <Home/>,
      },
      {
        path: '/product-register',
        index: true,
        element: <Product/>,
      },
      {
        path: '/user-register',
        index: true,
        element: <User/>,
      },
    ],
  },
]);

export default router;