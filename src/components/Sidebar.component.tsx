import React from 'react';
import { setClose } from '../slice/sidebar.slice.ts';
import { Sidebar } from 'primereact/sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoryProductsMenu from './products/categoryMenu.component.tsx';
import { Ripple } from 'primereact/ripple';

function SidebarComponent() {
  // Get sidebarStatus (via Reactive)
  const sidebarState = useSelector((state) => state.sideBarOpen.opened);
  const dispatchEvent = useDispatch();

  return (
    <>
      <Sidebar visible={sidebarState} onHide={() => dispatchEvent(setClose())}>
        {/* Navigate to the 'Profile' page */}
        <Link className={'btn w-full mb-2 p-ripple orange-ripple'} to={'/profile'} onClick={() => dispatchEvent(setClose())}>
          <i className={'pi pi-user'} /> Profile
          <Ripple />
        </Link>
        {/* Navigate to the 'Restaurants' page */}
        <Link className={'btn w-full mb-2 p-ripple orange-ripple'} to={'/restaurants/list'} onClick={() => dispatchEvent(setClose())}>
          <i className={'pi pi-user'} /> Restaurants
          <Ripple />
        </Link>
        {/* Navigate to the 'Restaurants' page, view categories */}
        <div className={'mb-2 w-full'} onClick={() => dispatchEvent(setClose())}>
          <CategoryProductsMenu />
        </div>
        {/* Navigate to the 'Statistics' page */}
        <Link className={'btn w-full mb-2 p-ripple orange-ripple'} to={'/statistics'} onClick={() => dispatchEvent(setClose())}>
          <i className={'pi pi-chart-bar'} /> Statistics
          <Ripple />
        </Link>

       {/* Navigate to the 'Drivers' page */}
          <Link
            className={'btn w-full mb-2 p-ripple orange-ripple'}
            to={'/drivers/list'}
            onClick={() => dispatchEvent(setClose())}
          >
            <i className={'pi pi-truck'} /> Drivers
            <Ripple />
          </Link>
          <Link
            className="btn w-full mb-2 p-ripple orange-ripple"
            to="/motorcycles/list"
            onClick={() => dispatchEvent(setClose())}
          >
            <i className="pi pi-car" /> Motorcycles
            <Ripple />
          </Link>
        <Link
          className={'btn w-full mb-2 p-ripple orange-ripple'}
          to={'/shifts/list'}
          onClick={() => dispatchEvent(setClose())}
        >
          <i className="pi pi-clock" /> Shifts

        {/* Navigate to the 'Statistics' page */}
        <Link className={'btn w-full mb-2 p-ripple orange-ripple'} to={'/issues/list'} onClick={() => dispatchEvent(setClose())}>
          <i className={'pi pi-chart-bar'} /> Issues
          <Ripple />
        </Link>
        {/* Navigate to the 'Statistics' page */}
        <Link className={'btn w-full mb-2 p-ripple orange-ripple'} to={'/customers/list'} onClick={() => dispatchEvent(setClose())}>
          <i className={'pi pi-chart-bar'} /> Customers
          <Ripple />
        </Link>
        {/* Navigate to the 'Drivers' page */}
   
        <Link className={'btn w-full mb-2 p-ripple orange-ripple'} to={'/drivers/list'} onClick={() => dispatchEvent(setClose())}>
          <i className={'pi pi-truck'} /> Drivers

          <Ripple />
        </Link>

      </Sidebar>
    </>
  );
}

export default SidebarComponent;
