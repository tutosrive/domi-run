import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';

export default function useGoogleSignIn() {
  const [user, setUser] = useState(null);

  const loginGoogle = (() => {
    const internalLogin = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
        try {
          const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          });
          const userInfo = await res.json();
          setUser(userInfo);
          sessionStorage.setItem('user_domi_run', JSON.stringify(userInfo));
          console.log('Google user info:', userInfo);
        } catch (err) {
          console.error('Error fetching Google user info', err);
        }
      },
      onError: (error) => {
        console.error('Google login failed:', error);
      },
    });

    return () => internalLogin();
  })();

  return { loginGoogle, user };
}