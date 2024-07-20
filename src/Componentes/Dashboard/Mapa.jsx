import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Mapa = ({ api, usuario, paises }) => {
    const [p, setP] = useState([]);

    useEffect(() => {
        const cantidadUsuarioPorPaises = async () => {
            try {
                const response = await fetch(`https://calcount.develotion.com/usuariosPorPais.php`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "apikey": api,
                        "iduser": usuario
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setP(data.paises);
                } else {
                    toast.error("Error al obtener la cantidad de usuarios por países", {
                        theme: "dark"
                      });
                }
            } catch (error) {
                toast.error("Error al obtener la cantidad de usuarios por países:", error, {
                    theme: "dark"
                  });
            }
        }

        cantidadUsuarioPorPaises();
    }, [api, usuario]);

    const markers = [];
    p.forEach(pais => {
        // Buscar el país en la lista de países por su id
        const foundPais = paises.find(item => item.id === pais.id);

        if (foundPais) {
            // Mostrar solo los países que tienen en común
            markers.push(
                <Marker key={pais.name} position={[foundPais.latitude, foundPais.longitude]}>
                    <Popup>
                        {foundPais.name}: {pais.cantidadDeUsuarios} usuarios
                    </Popup>
                </Marker>
            );
        }
    });
    

    return (
        <div className="container">
            <h2>Mapa</h2>
            <div style={{ height: "400px" }}>
                <MapContainer center={[-31.325366, -57.786920]} zoom={6} scrollWheelZoom={false} style={{ width: "100%", height: "100%" }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {markers}
                </MapContainer>
            </div>
        </div>
    );
};


export default Mapa;
