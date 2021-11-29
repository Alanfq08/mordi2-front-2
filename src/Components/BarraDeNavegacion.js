import axios from 'axios'
import React, { useState } from 'react'
import { Button, Container, Form, FormControl, Nav, Navbar, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from "../assets/mordi2_sin_fondo_recortada.png"
import { useForm } from '../hooks/useForm'

export const BarraDeNavegacion = ({ userID }) => {

    const urlSearch = 'https://warm-retreat-82659.herokuapp.com/redsocial/Persons/search/';

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [resultados, setresultados] = useState();

    function searchUser() {
        axios.request({
            method: "get", url: urlSearch,
            params: {
                name: busqueda_nombre,
                userId: userID,
            }
        })
            .then(res => {
                console.log(res.data);
                setresultados(res.data);
                handleShow()
            });
    }

    const [{ busqueda_nombre }, handleInputChange, reset] = useForm({ busqueda_nombre: '' })
    const handleSubmit = (e) => {
        e.preventDefault();
        reset();
        searchUser();
    }

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
                    <Modal.Title>Concidencias de búsqueda: {resultados.length}</Modal.Title>
                </Modal.Header>
                {resultados.map(function (d, idx) {
                    return (
                    <Modal.Body>{d.name}</Modal.Body>
                    )})}

                {/* <Modal.Body>hola</Modal.Body>
                <Modal.Body>hola2</Modal.Body> */}
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
