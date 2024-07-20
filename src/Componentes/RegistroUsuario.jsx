import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setCalorias, setName, setToken, setUser } from "../features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegistroUsuario = () => {
    const dispatch = useDispatch();
    const [paises, setPaises] = useState([]);
    /* const [mensaje, setMensaje] = useState(""); */

    const navigate = useNavigate();

    const usuarioRef = useRef(null);
    const contraseñaRef = useRef(null);
    const paisRef = useRef(null);
    const caloriasRef = useRef(null);

    useEffect(() => {
        const cargarPaises = async () => {
            try {
                const response = await fetch("https://calcount.develotion.com/paises.php", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setPaises(data.paises);
                } else {
                    toast("Error al obtener la lista de países");
                }
            } catch (error) {
                toast("Error al obtener la lista de países:", error);
            }
        };

        cargarPaises();
    }, []);

    const registrarUsuario = async () => {
        const usuario = usuarioRef.current.value;
        const contraseña = contraseñaRef.current.value;
        const pais = paisRef.current.value;
        const caloriasDiarias = caloriasRef.current.value;


        if(usuario ==='' || contraseña ==='' || pais==='' || caloriasDiarias===''){
            toast.error("Completa todos los campos.", {
                theme: "dark"
              });
            return;
        }

        const data = {
            usuario,
            contraseña,
            pais,
            caloriasDiarias
        };

        try {
            const response = await fetch("https://calcount.develotion.com/usuarios.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "usuario": usuario,
                    "password": contraseña,
                    "idPais": pais,
                    "caloriasDiarias": caloriasDiarias
                })
            });

            if (response.ok) {
                const dato = await response.json();

                // Guardar en localStorage
                localStorage.setItem('token', dato.apiKey);
                localStorage.setItem('userId', dato.id);
                localStorage.setItem('calorias', dato.caloriasDiarias);
                localStorage.setItem('usuario', data.usuario);

                //AUTO LOGIN
                dispatch(setUser(dato.id));
                dispatch(setToken(dato.apiKey));
                dispatch(setCalorias(dato.caloriasDiarias));
                dispatch(setName(data.usuario));

                toast.success("Registro con éxito!", {
                    theme: "colored"
                  });

                navigate("/dashboard/contenidoDashboard");

            } else {
                const errorData = await response.json();
                toast.error(errorData.mensaje, {
                    theme: "dark"
                  })
            }
        } catch (error) {
            toast.error("Error al registrar usuario:", error, {
                theme: "dark"
              });
        }
    };
    
    return (
        <div className="container slide-in-left">
            <h1>Registro</h1>
            <div className="mb-3">
                <label htmlFor="usuario" className="form-label">Usuario:</label>
                <input type="text" id="usuario" className="form-control" ref={usuarioRef} />
            </div>
            <div className="mb-3">
                <label htmlFor="contraseña" className="form-label">Contraseña:</label>
                <input type="password" id="contraseña" className="form-control" ref={contraseñaRef} />
            </div>
            <div className="mb-3">
                <label htmlFor="pais" className="form-label">País:</label>
                <select id="pais" className="form-select" ref={paisRef}>
                    {Array.isArray(paises) && paises.map((pais, index) => (
                        <option key={index} value={pais.id}>{pais.name}</option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="calorias" className="form-label">Calorías Diarias Recomendadas:</label>
                <input type="number" id="calorias" className="form-control" ref={caloriasRef} />
            </div>
            <button className="btn btn-secondary btn-lg btn-block mb-2" onClick={registrarUsuario}>Registrarse</button>
            {/* {mensaje && <p>{mensaje}</p>} */}
            <p>¿Ya tienes una cuenta? <Link to="/">Iniciar sesión</Link></p>
        </div>
    );
};

export default RegistroUsuario;
