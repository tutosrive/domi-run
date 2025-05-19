import { configureStore } from '@reduxjs/toolkit';
import sidebarState from '../slice/sidebar.slice';
import cartReducer from '../slice/cart.slice';

const store = configureStore({
  reducer: {
    sideBarOpen: sidebarState,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;