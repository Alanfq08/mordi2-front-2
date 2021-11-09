import { BarraDeNavegacion } from "../Components/BarraDeNavegacion"

export const Perfil = ({ nombre, edad }) => {
    return (
        <div>
            <BarraDeNavegacion/>
            <h1>Perfil</h1>

            <h2>Nombre: {nombre}</h2>
            <h2>Edad: {edad}</h2>
        </div>
    )
}
