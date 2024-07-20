import { Outlet } from "react-router-dom"
import LogOut from "./LogOut";

const Contenedor = () => {

    return (
        <div className="container slide-in-left">
            <header className="header p-3 mb-3 border-bottom">
                <h1>Gestión de registro de alimentación</h1>
                <LogOut />
                
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Contenedor;