import React, { useState } from 'react';

const ListadoRegistros = ({ registros, alimentos, eliminarRegistro }) => {

    const [filtroFecha, setFiltroFecha] = useState('todo');

    const filtrarRegistros = () => {
        const hoy = new Date();
        // const fechaHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
        const hoyFormato = hoy.toISOString().split('T')[0]; // Convertir la fecha de hoy al formato 'YYYY-MM-DD'


        switch (filtroFecha) {
            case 'hoy':
                return registros.filter(registro => {
                    return registro.fecha === hoyFormato;
                });
            case 'ultimaSemana':
                return registros.filter(registro => {
                    const fechaRegistro = new Date(registro.fecha);
                    const unaSemanaAtras = new Date(hoy.getTime() - 7 * 24 * 60 * 60 * 1000);
                    return fechaRegistro >= unaSemanaAtras && fechaRegistro <= hoy;
                });
            case 'ultimoMes':
                return registros.filter(registro => {
                    const fechaRegistro = new Date(registro.fecha);
                    const unMesAtras = new Date(hoy.getFullYear(), hoy.getMonth() - 1, hoy.getDate());
                    return fechaRegistro >= unMesAtras && fechaRegistro <= hoy;
                });
            default:
                return registros;
        }
    };
    const CambioFiltro = event => {
        setFiltroFecha(event.target.value);
    };



    return (
        <div className="container">
            <h2>Listado de Registros</h2>
            {/* Dropdown para el filtro de fecha */}
            <div className="mb-3">
                <select className="form-select" value={filtroFecha} onChange={CambioFiltro}>
                    <option value="todo">Todo el histórico</option>
                    <option value="hoy">Hoy</option>
                    <option value="ultimaSemana">Última semana</option>
                    <option value="ultimoMes">Último mes</option>
                </select>
            </div>
            <ul className="list-group">
                {/* Mostrar registros filtrados */}
                {filtrarRegistros().map((registro, index) => {
                    // Encontrar el nombre del alimento correspondiente
                    const ali = alimentos.find(ali => ali.id === registro.idAlimento);
                    return (
                        <li className="list-group-item d-flex align-items-center justify-content-between" key={index}>
                            {/* Mostrar ícono correspondiente al alimento */}
                            {ali && (
                                <img
                                    src={`https://calcount.develotion.com/imgs/${ali.imagen}.png`}
                                    alt={ali.nombre}
                                    style={{ width: '30px', height: '30px', marginRight: '10px' }}
                                />
                            )}
                            <span>{ali.nombre}</span>
                            <span>{registro.cantidad}</span>
                            <span>{registro.fecha}</span>

                            {/* Botón para eliminar el registro */}
                            <button className="btn btn-outline-danger btn-sm" onClick={() => eliminarRegistro(registro.id)}>Eliminar</button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );

};

export default ListadoRegistros;
