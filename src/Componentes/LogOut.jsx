
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { logout } from '../features/authSlice';

const LogOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

        const Logout = () => {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('calorias');
            localStorage.removeItem('usuario');
            localStorage.removeItem('apiKey');
    
            dispatch(logout());
            navigate("/");
        };

        const habilitar = userId !== null;

    
        
    return (
        <div className="mt-3">
            {habilitar && (
            <button className="btn btn-secondary btn-sm" onClick={Logout} >Logout</button>
            )}
        </div>
    );
}

export default LogOut;