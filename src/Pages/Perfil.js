
export const Perfil = ({nombre,edad}) => {
    console.log(nombre);
    console.log(edad);
    return (
        <div>
            <h1>Perfil</h1>

            <h2>Nombre: {nombre}</h2>
            <h2>Edad: {edad}</h2>
        </div>
    )
}
