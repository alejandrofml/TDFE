import React, { useEffect, useState } from 'react';

const InformeCalorias = ({ registros, alimentos, caloriasDiarias }) => {
    const [caloriasTotales, setCaloriasTotales] = useState(0);
    const [caloriasRegistradasHoy, setCaloriasRegistradasHoy] = useState(0);


    useEffect(() => {
        // Calcular calorías totales ingeridas hasta el momento
        let total = 0;
        registros.forEach(registro => {
            const alimento = alimentos.find(alimento => alimento.id === registro.idAlimento);
            if (alimento) {
                total += alimento.calorias * registro.cantidad;
            }
        });
        setCaloriasTotales(total);

        // Calcular calorías registradas en el día actual
        const hoy = new Date().toISOString().split('T')[0];
        let totalHoy = 0;
        registros.forEach(registro => {
            if (registro.fecha === hoy) {
                const alimento = alimentos.find(alimento => alimento.id === registro.idAlimento);
                if (alimento) {
                    totalHoy += alimento.calorias * registro.cantidad;
                }
            }
        });
        setCaloriasRegistradasHoy(totalHoy);
    }, [registros, alimentos]);

    // Calcular el color del texto según las calorías registradas hoy
    let colorTexto = '';
    if (caloriasRegistradasHoy > caloriasDiarias) {
        colorTexto = 'red';
    } else if (caloriasRegistradasHoy < caloriasDiarias * 0.9) {
        colorTexto = 'green';
    } else {
        colorTexto = 'yellow';
    }

    return (
        <div className="container">
            <h2>Informe de Calorías</h2>
            <div className="mb-3">
                <h3>Calorías totales ingeridas hasta el momento: {caloriasTotales}</h3>
            </div>
            <div className="mb-3">
                <h3 style={{ color: colorTexto }}>
                    Calorías registradas hoy: {caloriasRegistradasHoy}
                </h3>
            </div>
        </div>
    );
    
};

export default InformeCalorias;
