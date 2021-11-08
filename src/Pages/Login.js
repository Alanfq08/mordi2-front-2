import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { useForm } from '../hooks/useForm';
import { Perfil } from './Perfil';

export const Login = () => {
    // -----------------------------------------------------------------------------------------------------------------

    const [profile, setprofile] = useState();
    const [age, setage] = useState();
    const [loadprofile, setloadprofile] = useState(false);

    const getProfile = () => {
        const url = "https://warm-retreat-82659.herokuapp.com/redsocial/Persons/all";
        axios.get(url)
            .then((res) => {
                let res2 = res.data.filter(person => person.name === description);
                if (res2.length === 0) {
                    return Swal.fire('¡Atencion!', 'Usuario no encontrado', 'warning')
                }
                else {
                    setprofile(res2[0].name);
                    setage(res2[0].age);
                    setloadprofile(true)
                }
            });
    };
    // ----------------------------------------------------------------------------------------------------------

    const [{ description }, handleInputChange, reset] = useForm({ description: '' })
    const handleSubmit = (e) => {
        e.preventDefault();
        if (description.trim().length <= 1) return;
        reset();
        getProfile();
    }

    // -------------------------------------------------------------------------------------------------------------
    if (!loadprofile) {
        return (
            <div>
                <h1>MORDI2 Login</h1>
                <hr/>
                <br/>
                
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="description"
                        className="form-control"
                        autocomplete="off"
                        onChange={handleInputChange}
                        value={description}
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

