import {Link} from "react-router-dom";
import React from "react";

function Navigation() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/lideres">Líderes</Link>
                </li>
                <li>
                    <Link to="/grupos">Grupos de Crescimento</Link>
                </li>
                <li>
                    <Link to="/meugrupo">Conhecer meu Grupo</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;