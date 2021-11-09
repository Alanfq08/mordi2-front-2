import React from 'react'
import { Button, Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from "../assets/mordi2_sin_fondo_recortada.png"

export const BarraDeNavegacion = () => {
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
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Buscar"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Buscar</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
