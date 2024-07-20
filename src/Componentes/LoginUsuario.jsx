import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setToken, setUser, setCalorias, setName } from "../features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginUsuario = () => {

    const dispatch = useDispatch();
    /* const [error, setError] = useState(''); */
    const [ingresarDisabled, setIngresarDisabled] = useState(true);

    const navigate = useNavigate();

    const usuarioRef = useRef(null);
    const passwordRef = useRef(null);

    const iniciarSesion = async () => {
        const usuario = usuarioRef.current.value;
        const password = passwordRef.current.value;

        const data = {
            usuario,
            password
        };

        try {

            const response = await fetch("https://calcount.develotion.com/login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                
            },
            body: JSON.stringify({
                'usuario': usuario,
                'password': password
            })
        });
            if (response.ok) {
                const dato = await response.json();

                

                // Guardar en localStorage
                localStorage.setItem('token', dato.apiKey);
                localStorage.setItem('userId', dato.id);
                localStorage.setItem('calorias', dato.caloriasDiarias);
                localStorage.setItem('usuario', data.usuario);

                // Establecer datos de usuario en el estado

                dispatch(setUser(dato.id));
                dispatch(setToken(dato.apiKey));
                dispatch(setCalorias(dato.caloriasDiarias));
                dispatch(setName(data.usuario));

                navigate("/dashboard/contenidoDashboard");

            } else {
                toast.error("Usuario o contraseña incorrectos.", {
                    theme: "dark"
                  });
            }
        } catch (error) {
            toast.error("Error al iniciar sesión.", {
                theme: "dark"
              });
        }
    };

    const verificarCampos = () => {
        const usuario = usuarioRef.current.value;
        const password = passwordRef.current.value;
        setIngresarDisabled(usuario === '' || password === '');
    };

    return (
        <div className="container slide-in-left">
            <div className="mb-3">
                <label htmlFor="usuario" className="form-label">Usuario:</label>
                <input type="text" id="usuario" className="form-control" ref={usuarioRef} onChange={verificarCampos} />
            </div>
            <div className="mb-3">
                <label htmlFor="contraseña" className="form-label">Contraseña:</label>
                <input type="password" id="password" className="form-control" ref={passwordRef} onChange={verificarCampos} />
            </div>
            <button className="btn btn-secondary btn-lg btn-block" onClick={iniciarSesion} disabled={ingresarDisabled}>Ingresar</button>
            {/* {error && <p className="text-danger">Error: {error}</p>} */}
            <p>¿No tienes una cuenta? <Link to={'/registro'}>Registrarse</Link></p>
        </div>
    );
};

export default LoginUsuario;
