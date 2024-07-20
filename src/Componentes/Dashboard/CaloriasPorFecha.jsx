import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

    const CaloriasPorFecha = ({ alimentos, registros }) => {
        // Obtener la fecha de hace una semana
        const unaSemanaAtras = new Date();
        unaSemanaAtras.setDate(unaSemanaAtras.getDate() - 7);
    
        // Filtrar los registros de la última semana
        const registrosUltimaSemana = registros.filter(registro => new Date(registro.fecha) >= unaSemanaAtras);
    
        // Crear un objeto para almacenar las calorías por fecha
        const caloríasPorFecha = {};
        registrosUltimaSemana.forEach(registro => {
            const fecha = registro.fecha;
            if (!caloríasPorFecha[fecha]) {
                caloríasPorFecha[fecha] = 0;
            }
            // Obtener las calorías del alimento correspondiente
            const alimento = alimentos.find(a => a.id === registro.idAlimento);
            if (alimento) {
                caloríasPorFecha[fecha] += registro.cantidad * alimento.calorias;
            }
        });
    
        // Crear un array de fechas de la última semana
        const fechasUltimaSemana = [];
        let fechaIterada = new Date(unaSemanaAtras);
        for (let i = 0; i < 7; i++) {
            fechaIterada.setDate(fechaIterada.getDate() + 1);
            fechasUltimaSemana.push(fechaIterada.toISOString().split('T')[0]);
        }

        return (
            <div className="container">
                <h2>Calorías por Fecha</h2>
                <div className="chart-container">
                    <Bar 
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top', // Ajusta la posición de la leyenda
                                },
                                title: {
                                    display: true,
                                    text: 'Calorías por fecha',
                                },
                            },
                        }} 
                        data={{
                            labels: fechasUltimaSemana,
                            datasets: [
                                {
                                    label: 'Calorías ingeridas',
                                    backgroundColor: 'rgba(75,192,192,0.6)',
                                    borderColor: 'rgba(75,192,192,1)',
                                    borderWidth: 1,
                                    hoverBackgroundColor: 'rgba(75,192,192,0.8)',
                                    hoverBorderColor: 'rgba(75,192,192,1)',
                                    data: fechasUltimaSemana.map(fecha => caloríasPorFecha[fecha] || 0)
                                }
                            ]
                        }} 
                    />
                </div>
            </div>
        );
};
export default CaloriasPorFecha;