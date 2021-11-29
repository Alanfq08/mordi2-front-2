import { BarraDeNavegacion } from "../Components/BarraDeNavegacion"

export const Perfil = ({ nombre, edad , email, userID}) => {
    return (
        <div>
            <BarraDeNavegacion/>
            <h1>Perfil</h1>

            <h2>Nombre: {nombre}</h2>
            <h2>Edad: {edad}</h2>
            <h2>Edad: {email}</h2>
            <h2>ID: {userID}</h2>
        </div>
    )
}
