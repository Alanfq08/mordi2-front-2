import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
    return (
        <div>
            <h1>Bienvenido a Mordi2</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Registrarse</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
