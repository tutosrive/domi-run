import { useEffect, useState } from 'react';
import { Avatar } from 'primereact/avatar';
import SigInButtonComponent from './SigIn/SigInButton.component.tsx';
import type { User } from 'microsoft-graph';
import { Button } from 'primereact/button';
import { setOpen } from '../slice/sidebar.slice';
import { useDispatch, useSelector } from 'react-redux';
import SidebarComponent from './Sidebar.component.tsx';
import { Link, useNavigate } from 'react-router-dom';

function HeaderComponent() {
  const [user, setUser] = useState<User>({});
  const dispatchEvent = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state: any) => state.cart.items);
  const total = cartItems.reduce((sum: number, item: any) => {
    const price = typeof item.product.price === 'number' ? item.product.price : 0;
    return sum + price * item.quantity;
  }, 0);

  useEffect(() => {
    try {
      const _user_localSt = sessionStorage.getItem('user_domi_run');
      if (_user_localSt && _user_localSt !== 'undefined') {
        const parsedUser = JSON.parse(_user_localSt);
        setUser(parsedUser);
      }
    } catch (err) {
      console.error('Error parsing user from sessionStorage:', err);
      sessionStorage.removeItem('user_domi_run');
    }
  }, []);

  const user_avatar = () => {
    return (
      <>
        {user.id ? (
          <Avatar image={''} label={user.givenName?.slice(0, 1)} shape="circle" />
        ) : (
          '-'
        )}
      </>
    );
  };

  return (
    <>
      <SidebarComponent />
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Button
            icon="pi pi-bars"
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: 'none',
              height: '40px',
            }}
            onClick={() => dispatchEvent(setOpen())}
          />
          <Link className="btn btn-ghost text-xl" to={'/'}>
            Domi Run
          </Link>
        </div>
        <div className="flex-none">
          {/* Cart */}
          <div className={'dropdown dropdown-end'}>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">{cartItems.length}</span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-60 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">{cartItems.length} Items</span>
                <span className="text-info">Subtotal: ${total.toFixed(2)}</span>
                <div className="card-actions">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => navigate('/cart')}
                  >
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* User avatar / SignIn */}
          {user.id ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">{user_avatar()}</div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link className="justify-between" to={'/profile'}>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="#">Logout</Link>
                </li>
              </ul>
            </div>
          ) : (
            <SigInButtonComponent
              classes={'mx-2'}
              icon={'pi pi-sign-in'}
              styles={{ color: 'white', border: 'none', backgroundColor: 'transparent' }}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default HeaderComponent;