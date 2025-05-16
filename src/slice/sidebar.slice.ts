import { createSlice } from '@reduxjs/toolkit';

const initialState = { opened: false };

const sidebarState = createSlice({
  name: 'SidebarStatus',
  initialState,
  reducers: {
    setOpen: (state) => {
      // Set the state sidebar in “open”
      state.opened = true;
    },
    // Set the state sidebar in “close”
    setClose: (state) => {
      state.opened = false;
    },
  },
});

export const { setOpen, setClose } = sidebarState.actions;
export default sidebarState.reducer;
