import { lazy } from 'react';

const Home = lazy(() => import('../pages/Home'));
const ListAddresses = lazy(() => import('../pages/address/listAll'));
const OneAddress = lazy(() => import('../pages/address/listOne'));
const SignInPage = lazy(() => import('../pages/SigInPage'));
const OAuthCallbackPage = lazy(() => import('../pages/OAuthCallbackPage')); // IMPORTAR aquí

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
    path: '/login',
    component: SignInPage,
    title: 'Login',
  },
  {
    path: '/oauth/callback',  // Esta ruta ahora tiene componente definido
    component: OAuthCallbackPage,
    title: 'OAuth Callback',
  },
];

const routers = [...routes_index];
export default routers;
