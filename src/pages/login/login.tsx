
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/authService';
import FormLogin from '../../components/login/formLogin';

const Login: React.FC = () => {
  // Utils
    const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onLogIn = async (loginData: any) => {
      try {
          const token = await AuthService.login(loginData);
          localStorage.setItem('token', token);
          //window.localStorage.setItem('isLoggedIn', 'true'); //ver si sacar esto
          navigate('/');
      } catch (error){
          console.error('Error al iniciar sesion');
      }
    };

  // Render
    return (

      
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw' }}>
            <FormLogin onLogin={onLogIn} />
        </div>
    );
};

export default Login;