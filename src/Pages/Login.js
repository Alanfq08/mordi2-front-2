import axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { useForm } from '../hooks/useForm';
import { Perfil } from './Perfil';
import { BarraDeNavegacion } from '../Components/BarraDeNavegacion'

export const Login = () => {
    // -----------------------------------------------------------------------------------------------------------------

    const [profile, setprofile] = useState();
    const [age, setage] = useState();
    const [loadprofile, setloadprofile] = useState(false);

    const login = () => {
        const data = { user: `${description}` };
        axios.post('https://warm-retreat-82659.herokuapp.com/redsocial/login/', data)
            .then(response => {
                getInfo(response.data.id);
            })
            .catch(() => {
                return Swal.fire('¡Atencion!', 'intenta nuevamente', 'error');
            });
    }

    const getInfo = (userId) => {
        // console.log(userId);
        // const data = { id: `${userId}`};
        // const data = { id: "6b51b2d4656a4716994da6fbbb49ee21" };
        axios.get('https://warm-retreat-82659.herokuapp.com/redsocial/Persons/', { params: { id: '6b51b2d4656a4716994da6fbbb49ee21' } })
            .then(response => {
                console.log(response);
                // setprofile(res2[0].name);
                // setage(res2[0].age);
                // setloadprofile(true)
            })
            .catch(error => {
                console.log(error);
            });
    }
    // ----------------------------------------------------------------------------------------------------------

    const [{ description }, handleInputChange, reset] = useForm({ description: '' })
    const handleSubmit = (e) => {
        e.preventDefault();
        if (description.trim().length <= 1) return;
        reset();
        login();
    }

    // -------------------------------------------------------------------------------------------------------------
    if (!loadprofile) {
        return (
            <div>
                <BarraDeNavegacion />
                <h1>MORDI2 Login</h1>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="description"
                        className="form-control"
                        onChange={handleInputChange}
                        value={description}
                        placeholder='Nombre'
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

    else {
        return (
            <Perfil nombre={profile} edad={age} />
        )
    }
}

