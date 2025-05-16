import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../auth/authConfig';

export default function SignInMicrosoftRedirect() {
  const { instance } = useMsal();
  const loginMicrosoft = () =>
    instance.loginRedirect(loginRequest).catch((e) => {
      console.log(e);
    });
  return { loginMicrosoft };
}
