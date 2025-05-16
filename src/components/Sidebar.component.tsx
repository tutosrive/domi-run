import React from 'react';
import { setClose } from '../slice/sidebar.slice.ts';
import { Sidebar } from 'primereact/sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function SidebarComponent() {
  // Get sidebarStatus (via Reactive)
  const sidebarState = useSelector((state) => state.sideBarOpen.opened);
  const dispatchEvent = useDispatch();

  return (
    <>
      <Sidebar visible={sidebarState} onHide={() => dispatchEvent(setClose())}>
        <Link className={'btn w-full'} to={'/profile'} onClick={() => dispatchEvent(setClose())}>
          <i className={'pi pi-user'} /> Profile
        </Link>
      </Sidebar>
    </>
  );
}

export default SidebarComponent;
