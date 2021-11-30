import axios from 'axios'
import React, { useState } from 'react'
import { Button, Container, Form, FormControl, Nav, Navbar, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import logo from "../assets/mordi2_sin_fondo_recortada.png"
import { useForm } from '../hooks/useForm'

export const BarraDeNavegacion = ({ userID }) => {

    const urlSearch = 'https://warm-retreat-82659.herokuapp.com/redsocial/Persons/search/';
    const urlFriends = 'https://warm-retreat-82659.herokuapp.com/redsocial/friends/';


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [resultados, setresultados] = useState();

    const [{ busqueda_nombre }, handleInputChange, reset] = useForm({ busqueda_nombre: '' })
    const handleSubmit = (e) => {
        e.preventDefault();
        reset();
        searchUser();
    }

    function searchUser() {
        axios.request({
            method: "get", url: urlSearch,
            params: {
                name: busqueda_nombre,
                userId: userID,
            }
        })
            .then(res => {
                setresultados(res.data);
                handleShow()
            })
            .catch(() => {
                return Swal.fire('¡Atencion!', 'Hubo un error verifica que hayas iniciado sesion', 'error');
            });
    }

    const handleClickHacerAmigos = (id, name) => {
        const data = { to: id, from: userID };
        axios.post(urlFriends, data)
            .then(response => {
                return Swal.fire('¡Atencion!', `ahora tu sigues a ${name}`, 'success');
            });
    };

    const handleClickEliminarAmigos = (id, name) => {
        axios.request({
            method: "delete", url: urlFriends,
            params: {
                from: userID,
                to: id,
            }
        })
            .then(() => {
                return Swal.fire('¡Atencion!', `ahora tu YA NO sigues a ${name}`, 'success');
            });
    };

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid>
                    <Link className='nav-link' to="/"><img src={logo} alt='logo-mordi2' height="75px" /></Link>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Link className='nav-link' to="/profile">Acceder</Link>
                            <Link className='nav-link' to="/register">Registrarse</Link>
                        </Nav>
                        <Form className="d-flex" onSubmit={handleSubmit}>
                            <FormControl
                                type="search"
                                placeholder="Buscar"
                                className="me-2"
                                aria-label="Search"
                                name="busqueda_nombre"
                                onChange={handleInputChange}
                                value={busqueda_nombre}
                            />
                            <Button variant="outline-success" onClick={handleSubmit}>Buscar</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>



            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Concidencias de búsqueda: {resultados?.length}</Modal.Title>
                </Modal.Header>
                {resultados?.map(function (d) {
                    return (
                        <>
                            <hr></hr>
                            <Modal.Body>
                                {d.name}
                                <br />
                                Lo sigues? {`${d.follows}`}
                                <br></br>
                                <Button variant="outline-primary" onClick={handleClickHacerAmigos.bind(this, d.id, d.name)}>Seguir</Button>
                                <Button variant="outline-danger" onClick={handleClickEliminarAmigos.bind(this, d.id, d.name)}>Dejar de Seguir</Button>
                            </Modal.Body>
                        </>
                    )
                })}
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
