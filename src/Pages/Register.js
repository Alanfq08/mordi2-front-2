import axios from 'axios';
import React from 'react'
import Swal from 'sweetalert2';
import { useForm } from '../hooks/useForm';
import { BarraDeNavegacion } from '../Components/BarraDeNavegacion'

export const Register = () => {

    function registro() {
        const data = { name: `${nombre}`, age: edad, email: email };
        axios.post('https://warm-retreat-82659.herokuapp.com/redsocial/register/', data)
            .then(response => {
                    return Swal.fire('¡Atencion!', 'Usuario Registrado con exito\n por favor logeate con tu nobre en el apartado de login', 'success');
            })
            .catch(()=>{
                return Swal.fire('¡Atencion!', 'Usuario Registrado con anterioridad', 'error');
            });
    }

    const [{ nombre }, handleInputChange, reset] = useForm({ nombre: '' })
    const [{ edad }, handleInputChange2, reset2] = useForm({ edad: '' })
    const [{ email }, handleInputChange3, reset3] = useForm({ email: '' })

    const handleSubmit = (e) => {
        e.preventDefault();
        reset();
        reset2();
        reset3();
        registro();
    }

    return (
        <div>
            <BarraDeNavegacion />
            <h1>Registro</h1>


            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombre"
                    className="form-control"
                    onChange={handleInputChange}
                    value={nombre}
                    placeholder="nombre"
                />
                <input
                    type="text"
                    name="edad"
                    className="form-control"
                    onChange={handleInputChange2}
                    value={edad}
                    placeholder="edad"
                />
                <input
                    type="text"
                    name="email"
                    className="form-control"
                    onChange={handleInputChange3}
                    value={email}
                    placeholder="email"
                />
                <div className="d-grid m-2">
                    <button className="btn btn-primary">
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}
