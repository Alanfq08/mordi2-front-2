import axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { useForm } from '../hooks/useForm';
import { Perfil } from './Perfil';
import { BarraDeNavegacion } from '../Components/BarraDeNavegacion'
import { PieDePagina } from '../Components/PieDePagina';
import { Container } from 'react-bootstrap';
export const Login = () => {
    // -----------------------------------------------------------------------------------------------------------------

    const urlGet = 'https://warm-retreat-82659.herokuapp.com/redsocial/Persons/';
    const urlLogin = 'https://warm-retreat-82659.herokuapp.com/redsocial/login/';
    const [profile, setprofile] = useState();
    const [age, setage] = useState();
    const [email, setemail] = useState();
    const [userID, setuserID] = useState();

    const getInfo = (userId) => {
        axios.request({
            method: "get", url: urlGet,
            params: {
                id: userId,
            }
        })
            .then(res => {
                setprofile(res.data.name)
                setage(res.data.age)
                setemail(res.data.email)
                setuserID(userId)
                sessionStorage.userID = userId;
            });
    }

    if (sessionStorage.userID) {
        console.log("estas logeado");
        let llave  = sessionStorage.userID;
        console.log(llave);
        getInfo(llave);
    }

    const login = () => {
        const data = { user: `${description}` };
        axios.post(urlLogin, data)
            .then(response => {
                getInfo(response.data.id);
            })
            .catch(() => {
                return Swal.fire('¡Atencion!', 'intenta nuevamente', 'error');
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
    if (!sessionStorage.userID) {
        return (
            <div>
                <BarraDeNavegacion />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

                <Container>
                    <h1>MORDI2 Login</h1>
                    <h2>Inicia Sesión con tu nombre</h2>

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
                </Container>

                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <PieDePagina />
            </div>
        )
    }

    else {
        return (
            <>
                <BarraDeNavegacion userID={userID} />
                <Perfil nombre={profile} edad={age} email={email} userID={userID} />
            </>
        )
    }
}

