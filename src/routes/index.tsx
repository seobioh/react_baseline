import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Layout from '../components/Layout';
import PrivacyPage from '../pages/Abouts/PrivacyPage';
import TermPage from '../pages/Abouts/TermPage';
import HomePage from '../pages/Home/HomePage';
import EventsPage from '../pages/Events/EventPage';
import EventDetailPage from '../pages/Events/EventDetailPage';
import FAQPage from '../pages/FAQs/FAQPage';
import AboutPage from '../pages/Abouts/AboutPage';
import AccountPage from '../pages/Accounts/AccountPage';
import AccountSettingPage from '../pages/Accounts/AccountSettingPage';
import LoginPage from '../pages/Accounts/LoginPage';
import SignupPage from '../pages/Accounts/SignupPage';
import KakaoPage from '../pages/Accounts/KakaoPage';
import NaverPage from '../pages/Accounts/NaverPage';
import GooglePage from '../pages/Accounts/GooglePage';
import PortOnePage from '../pages/Accounts/PortOnePage';
import ResetPasswordPage from '../pages/Accounts/ResetPasswordPage';
import ChangePasswordPage from '../pages/Accounts/ChangePasswordPage';
import AccountEditPage from '../pages/Accounts/AccountEditPage';
import PointTransactionPage from '../pages/Users/PointTransactionPage';
import ReferralPage from '../pages/Users/ReferralPage';
import CouponPage from '../pages/Users/CouponPage';
import PaymentPage from '../pages/Payments/PaymentPage';
import OrderSuccessPage from '../pages/Orders/OrderSuccessPage';
import OrderFailPage from '../pages/Orders/OrderFailPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/home" />,
    },
    {
        path: '/home',
        element: <Layout isBody={false} />,
        children: [
            { index: true, element: <HomePage /> },
        ],
    },
    {
        path: '/privacy',
        element: <Layout />,
        children: [
            { index: true, element: <PrivacyPage /> },
        ],
    },
    {
        path: '/terms',
        element: <Layout />,
        children: [
            { index: true, element: <TermPage /> },
        ],
    },
    {
        path: '/products',
        element: <Layout />,
        children: [
        ],
    },
    {
        path: '/events',
        element: <Layout />,
        children: [
            { index: true, element: <EventsPage /> },
        ],
    },
    {
        path: '/events/:id',
        element: <Layout />,
        children: [
            { index: true, element: <EventDetailPage /> },
        ],
    },
    {
        path: '/faqs',
        element: <Layout />,
        children: [
            { index: true, element: <FAQPage /> },
        ],
    },
    {
        path: '/about',
        element: <Layout />,
        children: [
            { index: true, element: <AboutPage /> },
        ],
    },
    {
        path: '/accounts',
        element: <Layout />,
        children: [
            { index: true, element: <AccountPage /> },
        ],
    },
    {
        path: '/accounts/settings',
        element: <Layout />,
        children: [
            { index: true, element: <AccountSettingPage /> },
        ],
    },
    {
        path: '/accounts/login',
        element: <Layout />,
        children: [
            { index: true, element: <LoginPage /> },
        ],
    },
    {
        path: '/accounts/signup',
        element: <Layout />,
        children: [
            { index: true, element: <SignupPage /> },
        ],
    },
    {
        path: '/accounts/kakao',
        element: <Layout />,
        children: [
            { index: true, element: <KakaoPage /> },
        ],
    },
    {
        path: '/accounts/naver',
        element: <Layout />,
        children: [
            { index: true, element: <NaverPage /> },
        ],
    },
    {
        path: '/accounts/google',
        element: <Layout />,
        children: [
            { index: true, element: <GooglePage /> },
        ],
    },
    {
        path: '/accounts/portone',
        element: <Layout />,
        children: [
            { index: true, element: <PortOnePage /> },
        ],
    },
    {
        path: '/accounts/reset-password',
        element: <Layout />,
        children: [
            { index: true, element: <ResetPasswordPage /> },
        ],
    },
    {
        path: '/accounts/change-password',
        element: <Layout />,
        children: [
            { index: true, element: <ChangePasswordPage /> },
        ],
    },
    {
        path: '/accounts/edit',
        element: <Layout />,
        children: [
            { index: true, element: <AccountEditPage /> },
        ],
    },

    {
        path: '/users/point-transactions',
        element: <Layout />,
        children: [
            { index: true, element: <PointTransactionPage /> },
        ],
    },
    {
        path: '/users/referrals',
        element: <Layout />,
        children: [
            { index: true, element: <ReferralPage /> },
        ],
    },
    {
        path: '/users/coupons',
        element: <Layout />,
        children: [
            { index: true, element: <CouponPage /> },
        ],
    },
    {
        path: '/payments',
        element: <Layout />,
        children: [
            { index: true, element: <PaymentPage /> },
        ],
    },
    {
        path: '/orders/success',
        element: <Layout />,
        children: [
            { index: true, element: <OrderSuccessPage /> },
        ],
    },
    {
        path: '/orders/fail',
        element: <Layout />,
        children: [
            { index: true, element: <OrderFailPage /> },
        ],
    },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export { AppRouter as Router };
