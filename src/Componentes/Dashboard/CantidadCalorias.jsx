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

const graficoCantidad = ({ alimentos, registros }) => {

    const alimentosConRegistros = alimentos.filter(alimento =>
        registros.some(registro => registro.idAlimento === alimento.id)
    );

    const cantidadesPorAlimento = {};

   alimentosConRegistros.forEach(alimento => {
        const registrosDelAlimento = registros.filter(registro => registro.idAlimento === alimento.id);
        
        const cantidadTotal = registrosDelAlimento.reduce((total, registro) => {
            return total + registro.cantidad;
        }, 0);
        
        cantidadesPorAlimento[alimento.nombre] = cantidadTotal;

    });


    const valoresCantidades = Object.values(cantidadesPorAlimento);
    return (
        <div className="container">
            <h2>Gráfico de Cantidades por Alimento</h2>
            <div className="chart-container">
                <Bar 
                    options={{
                        indexAxis: 'y',
                        elements: {
                            bar: {
                                borderWidth: 2,
                            },
                        },
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'right',
                            },
                            title: {
                                display: true,
                                text: 'Cantidades por alimento',
                            },
                        },
                    }} 
                    data={{
                        labels: alimentosConRegistros.map(alimento => alimento.nombre),
                        datasets: [
                            {
                                label: 'Cantidad de veces consumido',
                                backgroundColor: 'rgba(0,100,0,0.6)',
                                borderColor: 'green',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(0,70,0,0.3)',
                                hoverBorderColor: 'rgba(192,192,192,1)',
                                data: valoresCantidades
                            }
                        ],
                    }} 
                />
            </div>
        </div>
    );
}

export default graficoCantidad;