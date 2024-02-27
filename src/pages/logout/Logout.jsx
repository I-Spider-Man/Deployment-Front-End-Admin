import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('jwt');
    navigate('/');
  }, [navigate]);

  return null;
};

export default Logout;
