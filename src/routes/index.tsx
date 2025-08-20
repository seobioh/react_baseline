import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import About from '../pages/AboutPage';
import Account from '../pages/AccountPage';

const router = createBrowserRouter([
    {
    path: '/',
    element: <Layout />,
    children: [
        { index: true, element: <Navigate to="/about" replace /> },
      ],
    },
    {
        path: '/about',
        element: <Layout />,
        children: [
            { index: true, element: <About /> },
        ],
    },
    {
        path: '/menu1',
        element: <Layout />,
        children: [
        ],
    },
    {
        path: '/menu2',
        element: <Layout />,
        children: [
        ],
    },
    {
        path: '/menu3',
        element: <Layout />,
        children: [
        ],
    },
    {
        path: '/accounts',
        element: <Layout />,
        children: [
            { index: true, element: <Account /> },
        ],
    },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export { AppRouter as Router };
