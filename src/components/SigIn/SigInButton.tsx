import { useNavigate } from 'react-router-dom';

export default function SigInButton() {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate('/login')}>SigIn</button>
    </>
  );
}
