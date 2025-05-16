import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from '../auth/authConfig';
import { callMsGraph } from '../auth/graph';
import { type ReactElement, useEffect, useState } from 'react';
import UserProfileComponent from '../components/User/UserProfile.component';
import type { User } from 'microsoft-graph';
import Swal from 'sweetalert2';
import SigInButtonComponent from '../components/SigIn/SigInButton.component';
import LoaderPointsComponent from '../components/LoaderPoints.component';

export default function ProfileContent() {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState<User | null>(null);
  const userSession: string | null = sessionStorage.getItem('user_domi_run');

  useEffect(() => {
    console.log('Accounts => ', accounts[0]);
    if (accounts[0]) {
      // Get profile information when the page loaded
      instance.acquireTokenSilent({ ...loginRequest, account: accounts[0] }).then((response) => {
        callMsGraph(response.accessToken).then((response) => {
          setGraphData(response);
          if (!userSession) {
            Swal.fire({ title: 'Success', text: 'Login Completed', icon: 'success', timer: 3000 });
            // Save the user information in the “Session Storage”
            sessionStorage.setItem('user_domi_run', JSON.stringify(response));
          }
        });
      });
      console.log(graphData);
    }
  }, []);

  const logout = () => {
    console.log('LogOut');
    instance.logoutRedirect();
    sessionStorage.removeItem('user_domi_run');
  };

  return (
    <>
      <div className={'w-screen h-screen'}>
        {/* When user is registered */}
        <AuthenticatedTemplate>
          {graphData ? (
            //   Profile card
            <>
              <UserProfileComponent handleLogout={logout} userGraphData={graphData} classesMainContainer={'mx-auto'} stylesAvatar={{ width: '100%', height: '100%', fontSize: '50px' }} classesLogout={'mx-auto w-30 h-10 mb-3'} classesLogoutContainer={'w-full mb-3 flex justify-center'} />
            </>
          ) : (
            <div className={'w-screen h-screen mx-auto'}>
              {__fixed_centered_div(
                <>
                  <LoaderPointsComponent />
                  <p>Loading The Profile...</p>
                </>,
              )}
            </div>
          )}
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          {/* When user is not registered */}
          {__fixed_centered_div(<SigInButtonComponent icon={'pi pi-sigin-in'} classes={''} styles={{ backgroundColor: 'transparent', color: 'white', border: 'none' }} />)}
        </UnauthenticatedTemplate>
      </div>
      <div>{/* Feature: Get the orders or put a graphic inside... */}</div>
    </>
  );
}

/** A centered `div` and **fixed** */
function __fixed_centered_div(content: Element | ReactElement) {
  return (
    <div className={'fixed left-0 top-2/6 w-screen flex flex-col items-center justify-center card'}>
      <div className={'card-body'}>{content}</div>
    </div>
  );
}
