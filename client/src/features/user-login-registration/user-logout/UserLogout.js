import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {

  const nav = useNavigate();

  useEffect(() => {
    const returnToHome = setTimeout(() => {
      nav('/');
    }, 10000)
  
    return () => {
      clearTimeout(returnToHome);
    }
  }, [])
  

  return (
    <div>
      <p>Successful Logout!</p>
    </div>
  )
}
export default UserLogout