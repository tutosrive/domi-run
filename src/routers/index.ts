import { lazy } from 'react';

const ListAddresses = lazy(() => import('../pages/address/addresses.page'));
const ViewAddressesPage = lazy(() => import('../pages/address/viewAddress.page'));
const UpdateAddressesPage = lazy(() => import('../pages/address/updateAddress.page'));
const CreateAddressesPage = lazy(() => import('../pages/address/createAddress.page'));

const SignInPage = lazy(() => import('../pages/SigIn.page'));
const ProfilePage = lazy(() => import('../pages/Profile.page'));
const HomePage = lazy(() => import('../pages/Home.page'));

const RestaurantsPage = lazy(() => import('../pages/restaurants/restaurants.page'));
const UpdateRestaurantPage = lazy(() => import('../pages/restaurants/updateRestaurant.page'));
const ViewRestaurantPage = lazy(() => import('../pages/restaurants/viewRestaurant.page'));
const CreateRestaurantPage = lazy(() => import('../pages/restaurants/createRestaurant.page'));
const StatisticsPage = lazy(() => import('../pages/statistics.page'));

const OAuthCallbackPage = lazy(() => import('../pages/OAuthCallbackPage'));

const DriversPage = lazy(() => import('../pages/drivers/drivers.page'));
const CreateDriverPage = lazy(() => import('../pages/drivers/createDriver.page'));
const UpdateDriverPage = lazy(() => import('../pages/drivers/updateDriver.page'));
const ViewDriverPage = lazy(() => import('../pages/drivers/viewDriver.page'));

const MotorcyclesPage = lazy(() => import('../pages/motorcycles/motorcycles.page'));
const CreateMotorcyclePage = lazy(() => import('../pages/motorcycles/createMotorcycle.page'));
const ViewMotorcyclePage = lazy(() => import('../pages/motorcycles/viewMotorcycle.page'));
const UpdateMotorcyclePage = lazy(() => import('../pages/motorcycles/updateMotorcycle.page'));

const ShiftList = lazy(() => import('../pages/shifts/shifts.page'));
const ShiftCreate = lazy(() => import('../pages/shifts/createShift.page'));
const ShiftView = lazy(() => import('../pages/shifts/viewShift.page'));
const ShiftUpdate = lazy(() => import('../pages/shifts/updateShift.page'));


const routes_index: Array<object> = [
  { path: '/addresses/list/', title: 'Addresses', component: ListAddresses },
  { path: '/addresses/view/:id', title: 'Addresses', component: ViewAddressesPage },
  { path: '/addresses/update/:id', title: 'Addresses', component: UpdateAddressesPage },
  { path: '/addresses/create', title: 'Addresses', component: CreateAddressesPage },
  { path: '/login', component: SignInPage, title: 'Login' },
  { path: '/profile', component: ProfilePage, title: 'Profile' },
  { path: '/home', component: HomePage, title: 'Dom Run' },
  { path: '/restaurants/list/', component: RestaurantsPage, title: 'Restaurants' },
  { path: '/restaurants/create', component: CreateRestaurantPage, title: 'Restaurants' },
  { path: '/restaurants/update/:id', component: UpdateRestaurantPage, title: 'Update Restaurant' },
  { path: '/restaurants/view/:id', component: ViewRestaurantPage, title: 'View Restaurant' },
  { path: '/category/drinks', component: HomePage, title: 'Drinks' },
  { path: '/customers/list', component: HomePage, title: 'List Customers' },
  { path: '/customers/view/:id', component: HomePage, title: 'View Customer' },
  { path: '/customers/update/:id', component: HomePage, title: 'Update Customer' },
  { path: '/customers/create/', component: HomePage, title: 'Create Customer' },
  { path: '/oauth/callback', component: OAuthCallbackPage, title: 'OAuth Callback' },
  { path: '/statistics', component: StatisticsPage, title: 'Statistics Graphics' },
  { path: '/drivers/list',title: 'Drivers',component: DriversPage,},
  { path: '/drivers/create',title: 'Create Driver',component: CreateDriverPage,},
  { path: '/drivers/update/:id',title: 'Update Driver',component: UpdateDriverPage,},
  { path: '/drivers/view/:id',title: 'View Driver',component: ViewDriverPage,},
  { path: '/motorcycles/list', component: MotorcyclesPage },
  { path: '/motorcycles/create', component: CreateMotorcyclePage },
  { path: '/motorcycles/view/:id', component: ViewMotorcyclePage },
  { path: '/motorcycles/update/:id', component: UpdateMotorcyclePage },
  { path: '/shifts/list', title: 'Shifts', component: ShiftList },
  { path: '/shifts/create', title: 'Create Shift', component: ShiftCreate },
  { path: '/shifts/view/:id', title: 'View Shift', component: ShiftView },
  { path: '/shifts/update/:id', title: 'Update Shift', component: ShiftUpdate },

];

const routers = [...routes_index];
export default routers;
