import "./style.css";
import React from 'react';
import 'react-toastify/dist/ReactToastify.css'
import "./bootstrap.min.css";

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastContainer } from "react-toastify";


import LoginUsuario from './Componentes/LoginUsuario';
import RegistroUsuario from './Componentes/RegistroUsuario';
import AgregarRegistro from './Componentes/Dashboard/AgregarRegistro';
import ContenidoDashboard from './Componentes/Dashboard/ContenidoDashboard';
import ListadoRegistros from './Componentes/Dashboard/ListadoRegistros';
import Contenedor from './Componentes/Contenedor';
import CaloriasPorFecha from "./Componentes/Dashboard/CaloriasPorFecha";
import CantidadCalorias from "./Componentes/Dashboard/CantidadCalorias";
import InformeCalorias from "./Componentes/Dashboard/InformeCalorias";
import Mapa from "./Componentes/Dashboard/Mapa";
import TiempoRestante from "./Componentes/Dashboard/TiempoRestante";

const App = () => {

  return (
    <Provider store={store}>


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Contenedor />} >
            <Route path="/" element={<LoginUsuario />} />
            <Route path="/registro" element={<RegistroUsuario />} />
            <Route path="/dashboard/contenidoDashboard" element={<ContenidoDashboard />} />
            <Route path="/dashboard/agregarRegistro" element={<AgregarRegistro />} />
            <Route path="/dashboard/listadoRegistros" element={<ListadoRegistros />} />
            <Route path = "/dashboard/caloriasPorFecha" element={<CaloriasPorFecha/>}/>
            <Route path = "/dashboard/cantidadCalorias" element={<CantidadCalorias/>}/>
            <Route path = "/dashboard/informeCalorias" element={<InformeCalorias/>}/>
            <Route path = "/dashboard/mapa" element={<Mapa/>}/>
            <Route path = "/dashboard/TiempoRestante" element={<TiempoRestante/>}/>

          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer />

    </Provider >
  );
}

export default App;
