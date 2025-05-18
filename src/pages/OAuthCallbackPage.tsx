import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { saveToken, saveProfile } from '../auth/auth.utils';

export default function OAuthCallbackPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');

    if (!code) {
      setError('No se encontró el código de GitHub');
      return;
    }

    axios
      .post('http://localhost:5000/auth/github', { code })
      .then((response) => {
        const data = response.data;
        console.log('Respuesta del backend:', data); // 👈 DEBUG

        if (data.token && data.user) {
          saveToken(data.token);
          saveProfile(data.user);
          navigate('/'); 
        } else {
          setError('No se recibió el token o el usuario');
        }
      })
      .catch((error) => {
        console.error(error);
        setError('Error al autenticar con GitHub');
      });
  }, [navigate]);

  if (error) return <div>Error: {error}</div>;
  return <div>Autenticando con GitHub...</div>;
}