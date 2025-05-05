import { lazy } from 'react';

const ListAddresses = lazy(() => import('../pages/address/listAll'));
const OneAddress = lazy(() => import('../pages/address/listOne'));
const SignInPage = lazy(() => import('../pages/SigInPage'));

const routes_index: Array<object> = [
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
];

const routers = [...routes_index];
export default routers;
