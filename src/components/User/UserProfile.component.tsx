import { Avatar } from 'primereact/avatar';
import React from 'react';
import type { User } from 'microsoft-graph';
import LogoutButtonComponent from '../LogOut/LogoutButton.component';

interface UserProfileProps {
  userGraphData: User;
  handleLogout: () => void;
  classesMainContainer?: string;
  classesAvatarContainer?: string;
  classesLogout?: string;
  stylesAvatar?: object;
  classesLogoutContainer?: string;
}

const UserProfileComponent: React.FC<UserProfileProps> = ({ userGraphData, classesMainContainer, classesAvatarContainer, stylesAvatar, handleLogout, classesLogout, classesLogoutContainer }) => {
  if (!userGraphData) throw new Error('Please send the “UserGraphData” prop.');
  if (!handleLogout) throw new Error('Please send the “handleLogout” prop.');
  // Additional Avatar Styles
  const styles = stylesAvatar ?? { width: '100%', height: '100%', fontSize: '50px' };
  const givenName: string = userGraphData.givenName ? userGraphData.givenName.slice(0, 1) : '';

  return (
    <>
      {userGraphData ? (
        <>
          {/* Container main */}
          <div className={`w-full justify-center items-center overflow-hidden md:max-w-sm rounded-lg shadow-sm ${classesMainContainer}`}>
            <div className={`relative shadow mx-auto h-24 w-24 float-middle border-white rounded-full overflow-hidden border-4 flex ${classesAvatarContainer}`}>
              <div className={'w-full h-full align-middle'}>
                <Avatar label={givenName} shape="circle" size="xlarge" style={styles} />
              </div>
            </div>
            <div className="mt-16">
              <h1 className="text-lg text-center font-semibold">{`I'm ${userGraphData.givenName}`}</h1>
              <p className="text-sm text-gray-600 text-center">{userGraphData.userPrincipalName ?? ''}</p>
            </div>
            {/* Feature: Add tags */}
            <div className="mt-6 pt-3 flex flex-wrap mx-6 border-t"></div>
            <div className={classesLogoutContainer ?? ''}>
              <LogoutButtonComponent handleLogout={handleLogout} />
            </div>
          </div>
        </>
      ) : (
        'Loading Data...'
      )}
    </>
  );
};

export default UserProfileComponent;
