import { configureStore } from '@reduxjs/toolkit';
import sidebarState from '../slice/sidebar.slice';

const Store = configureStore({
  reducer: {
    sideBarOpen: sidebarState,
  },
});

export default Store;
