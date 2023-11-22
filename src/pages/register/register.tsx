import * as React from 'react';
import FormRegister from '../../components/access/formRegister';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/authService';


const Register: React.FC = () => {
    const navigate = useNavigate();
    // Handlers
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onRegister = async (registerData: any) => {
        try {
            const token = await AuthService.register(registerData);
            localStorage.setItem('token', token);
            window.localStorage.setItem('isLoggedIn', 'true'); //ver si sacar esto
            navigate('/');
        } catch (error){
            console.error('Error al registrarse');
        }
    };
    


    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw' }}>
            <FormRegister onRegister={onRegister} />
            
        </div>
    );

};

export default Register;

