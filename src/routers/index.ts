import { lazy } from 'react';

const ListAddresses = lazy(() => import('../pages/address/listAll'));
const OneAddress = lazy(() => import('../pages/address/listOne'));
const SignInPage = lazy(() => import('../pages/SigIn.page'));
const ProfilePage = lazy(() => import('../pages/Profile.page'));
const HomePage = lazy(() => import('../pages/Home.page'));
const Home = lazy(() => import('../pages/Home.page'));


const OAuthCallbackPage = lazy(() => import('../pages/OAuthCallbackPage'));
const routes_index: Array<object> = [
  {
    path: '/',
    title: 'Home',
    component: Home,
  },
  {
    path: '/address/list',
    title: 'Addresses',
    component: ListAddresses,
  },
  {
    path: '/address/list/:id',
    title: 'Addresses',
    component: OneAddress,
  },
  {
    path: '/oauth/callback',  // Esta ruta ahora tiene componente definido
    component: OAuthCallbackPage,
    title: 'OAuth Callback',
  },
  {
    path: '/login',
    component: SignInPage,
    title: 'Login',
  },
  {
    path: '/profile',
    component: ProfilePage,
    title: 'Profile',
  },
  {
    path: '/home',
    component: HomePage,
    title: 'Dom Run',
  },
];

const routers = [...routes_index];
export default routers;
