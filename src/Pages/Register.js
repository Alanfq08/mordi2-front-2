import axios from 'axios';
import React from 'react'
import Swal from 'sweetalert2';
import { useForm } from '../hooks/useForm';

export const Register = () => {

    const getProfile = () => {
        const url = "https://warm-retreat-82659.herokuapp.com/redsocial/Persons/all";
        axios.get(url)
            .then((res) => {
                let res2 = res.data.filter(person => person.name === nombre);
                if (res2.length === 0) {
                    postProfile();
                    return Swal.fire('¡Atencion!', 'Usuario Registrado con exito', 'success')
                }
                else {
                    return Swal.fire('¡Atencion!', 'Usuario Registrado con anterioridad', 'error')
                }
            });
    };

    function postProfile() {
        const data = { name: `${nombre}`, age: edad };
        axios.post('https://warm-retreat-82659.herokuapp.com/redsocial/Persons/', data)
            .then(response => console.log(response));
    }

    const [{ nombre }, handleInputChange, reset] = useForm({ nombre: '' })
    const [{ edad }, handleInputChange2,reset2] = useForm({ edad: '' })

    const handleSubmit = (e) => {
        e.preventDefault();
        reset();
        reset2();
        getProfile();
    }

    return (
        <div>
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
                <div className="d-grid m-2">
                    <button className="btn btn-primary">
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}
