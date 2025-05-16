import { lazy } from 'react';

const ListAddresses = lazy(() => import('../pages/address/listAll'));
const OneAddress = lazy(() => import('../pages/address/listOne'));
const SignInPage = lazy(() => import('../pages/SigIn.page'));
const ProfilePage = lazy(() => import('../pages/Profile.page'));
const HomePage = lazy(() => import('../pages/Home.page'));

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
