import React, { useEffect, useState } from 'react';

const TiempoRestante = () => {
    const calcularTiempo = () => {
        const fechalimite = new Date('03-31-2024');
        const hoy = new Date();
        const diferencia = fechalimite - hoy;

        let tiempoRestante = {};

        if (diferencia > 0) {
            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            tiempoRestante = {
                dias: dias
            };
        }

        return tiempoRestante;
    };

    const [tiempoRestante, setTiempoRestante] = useState(calcularTiempo());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTiempoRestante(calcularTiempo());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <div className="container">
    {tiempoRestante.dias !== undefined ? (
        <div className="alert alert-info">
            <h3>Tiempo restante hasta el 31 de marzo de 2024:</h3>
            <p>{tiempoRestante.dias} días</p>
        </div>
    ) : (
        <div className="alert alert-danger">
            <h2>Pasó la fecha límite!</h2>
        </div>
    )}
</div>
    );
};

export default TiempoRestante;
