import React, { useState, useEffect } from "react";
import AgregarRegistro from "./AgregarRegistro";
import ListadoRegistros from "./ListadoRegistros";
import CantidadCalorias from "./CantidadCalorias";
import CaloriasPorFecha from "./CaloriasPorFecha";
import TiempoRestante from "./TiempoRestante";
import Mapa from "./Mapa";
import { useDispatch, useSelector } from "react-redux";
import { setCalorias, setName, setToken, setUser } from "../../features/authSlice";
import InformeCalorias from "./InformeCalorias";
import { toast } from "react-toastify";

const ContenidoDashboard = () => {
    const dispatch = useDispatch();
    const [actualizarDatos, setActualizarDatos] = useState(false);
    const [alimentos, setAlimentos] = useState([]);
    const [registros, setRegistros] = useState([]);
    const [paises, setPaises] = useState([]);
    /* const [mensaje, setMensaje] = useState(""); */

    if (localStorage.getItem('userId') !== null) {
        dispatch(setToken(localStorage.getItem('token')));
        dispatch(setUser(localStorage.getItem('userId')));
        dispatch(setCalorias(localStorage.getItem('calorias')));
        dispatch(setName(localStorage.getItem('usuario')));

    }

    const usuario = useSelector((state) => state.auth.user);
    const api = useSelector((state) => state.auth.token);
    const calorias = useSelector((state) => state.auth.calorias);


    useEffect(() => {
        const obtenerAlimentos = async () => {
            try {
                const response = await fetch("https://calcount.develotion.com/alimentos.php", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "apikey": api,
                        "iduser": usuario
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setAlimentos(data.alimentos);
                } else {
                    toast.error("Error al obtener la lista de alimentos", {
                        theme: "dark"
                      });
                }
            } catch (error) {
                toast.error("Error al obtener la lista de alimentos:", error, {
                    theme: "dark"
                  });
            }
        };

        const obtenerRegistros = async () => {
            try {
                const response = await fetch(`https://calcount.develotion.com/registros.php?idUsuario=${usuario}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "apikey": api,
                        "iduser": usuario
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setRegistros(data.registros);
                } else {
                    toast.error("Error al obtener la lista de registros", {
                        theme: "dark"
                      });
                }
            } catch (error) {
                toast.error("Error al obtener la lista de registros", {
                    theme: "dark"
                  });
            }
        };

        

        const obtenerPaises = async () => {
            try {
                const response = await fetch(`https://calcount.develotion.com/paises.php`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setPaises(data.paises);
                } else {
                    toast.error("Error al obtener la lista de países", {
                        theme: "dark"
                      });
                }
            } catch (error) {
                toast.error("Error al obtener la lista de países", {
                    theme: "dark"
                  });
            }
        }

        obtenerPaises();
        obtenerAlimentos();
        obtenerRegistros();
    }, [api, usuario, actualizarDatos]);

    const actualizarRegistros = () => {
        setActualizarDatos(prevState => !prevState);
    };

    // Función para eliminar un registro
    const eliminarRegistro = async (idRegistro) => {
        try {
            const response = await fetch(`https://calcount.develotion.com/registros.php?idRegistro=${idRegistro}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": api,
                    "iduser": usuario
                }
            });

            if (response.ok) {
                // Eliminar el registro localmente
                actualizarRegistros();
                toast.success("Registro eliminado correctamente.", {
                    theme: "colored"
                  });
            } else {
                toast.error("Error al eliminar el registro.", {
                    theme: "dark"
                  });
            }
        } catch (error) {
            toast.error("Error al eliminar el registro.", {
                theme: "dark"
              });
        }
    };
    
    return (
        <div className="slide-in-left">
            <AgregarRegistro usuario={usuario} api={api} actualizarRegistros={actualizarRegistros} alimentos={alimentos} /><br />
            <ListadoRegistros key={actualizarDatos} usuario={usuario} api={api} registros={registros} alimentos={alimentos} eliminarRegistro={eliminarRegistro} /><br />
            <InformeCalorias alimentos={alimentos} registros={registros} caloriasDiarias={calorias}/>

            <CantidadCalorias alimentos={alimentos} registros={registros}/>

            <CaloriasPorFecha alimentos= {alimentos} registros={registros}/>

            <Mapa usuario = {usuario} api = {api} paises={paises}/>

            <TiempoRestante/>

            {/* {mensaje && <p>Error: {mensaje}</p>} */}
        </div>
    )
}

export default ContenidoDashboard;