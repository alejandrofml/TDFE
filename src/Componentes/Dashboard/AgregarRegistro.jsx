import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';

const AgregarRegistro = ({ usuario, api, actualizarRegistros, alimentos}) => {
    /* const [mensaje, setMensaje] = useState(""); */
    const [porcionTotal, setPorcionTotal] = useState("");


    const alimentoRef = useRef(null);
    const cantidadRef = useRef(null);
    const fechaRef = useRef(null);

    const validarFecha = () => {
        const fechaSeleccionada = new Date(fechaRef.current.value);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        const f = fechaSeleccionada.getDate() +'-' +fechaSeleccionada.getMonth() + '-' +fechaSeleccionada.getFullYear();
        const h = hoy.getDate() +'-' +hoy.getMonth() + '-' +hoy.getFullYear();
        const h2 = hoy.getDate()- 2 +'-' +hoy.getMonth() + '-' +hoy.getFullYear();
        


        if (f > h ) {
            toast.error("La fecha no puede ser posterior a hoy.", {
                theme: "dark"
              });
            fechaRef.current.value = "";
        }else if(f < h2){
            toast.error("La fecha no puede ser anterior a ayer.", {
                theme: "dark"
              });
            fechaRef.current.value = "";
        }
    };


   const CantidadChange = () => {
        if (alimentoRef.current !== null && cantidadRef.current !== null) {
            const selectedAlimentoId = alimentoRef.current.value;
            const selectedAlimento = alimentos.find(alimento => alimento.id === parseInt(selectedAlimentoId));
            const cantidad = cantidadRef.current.value;

            if (selectedAlimento && cantidad) {
                const porcion = selectedAlimento.porcion.replace(/[^\d.-]/g, '');
                const unidad = selectedAlimento.porcion.replace(/[0-9]/g, '');
                const porcionTotal = cantidad * porcion;
                setPorcionTotal(porcionTotal + unidad);
            } else {
                setPorcionTotal(""); 
            }
        }
    };

    const Limpiar = () => {
        cantidadRef.current.value = "";
        CantidadChange()
    }



    const agregarRegistro = async () => {
        const alimento = alimentoRef.current.value;
        const cantidad = cantidadRef.current.value;
        const fecha = fechaRef.current.value;

        if (!alimento || !cantidad || !fecha) {
            toast.error("Completa todos los campos.", {
                theme: "dark"
              });
            return;
        }

        const data = {
            alimento,
            cantidad,
            fecha
        };
        try {
            const response = await fetch("https://calcount.develotion.com/registros.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": api,
                    "iduser": usuario
                },
                body: JSON.stringify({

                    "idAlimento": data.alimento,
                    "idUsuario": usuario,
                    "cantidad": data.cantidad,
                    "fecha": data.fecha

                })

            });

            if (response.ok) {
                toast.success("Agregado con exito.", {
                    theme: "colored"
                  });

                alimentoRef.current.value = "";
                cantidadRef.current.value = "";
                fechaRef.current.value = "";

                actualizarRegistros();

            } else {
                toast.error("Error al agregar.", {
                    theme: "dark"
                  });
            }
        } catch (error) {
            toast.error("Error al agregar el registro.", {
                theme: "dark"
              });
        }


    };

    return (
        <div className="container">
            <h2>Agregar Registro</h2>
            <div className="mb-3">
                <label htmlFor="alimento" className="form-label">Alimento:</label>
                <select id="alimento" className="form-select" ref={alimentoRef} onChange={Limpiar}>
                    {Array.isArray(alimentos) && alimentos.map((alimento, index) => (
                        <option key={index} value={alimento.id}>{alimento.nombre}</option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="cantidad" className="form-label">Cantidad:</label>
                <input type="number" id="cantidad" className="form-control" ref={cantidadRef} onChange={CantidadChange} />
            </div>
            <p>Porción Total: {porcionTotal}</p>
            <div className="mb-3">
                <label htmlFor="fecha" className="form-label">Fecha:</label>
                <input type="date" id="fecha" className="form-control" ref={fechaRef} onChange={validarFecha}/>
            </div>
            <button className="btn btn-secondary btn-sm btn-block" onClick={agregarRegistro}>Agregar Registro</button>
            {/* {mensaje && <p>{mensaje}</p>} */}
        </div>
    );
    
};

export default AgregarRegistro;
