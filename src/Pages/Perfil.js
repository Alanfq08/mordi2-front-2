import axios from "axios";
import { useState } from "react";
import { Button, Col, Container, Form, FormControl, Modal, Row } from "react-bootstrap"
import Swal from "sweetalert2";
import { PieDePagina } from "../Components/PieDePagina";
import { useForm } from "../hooks/useForm";

export const Perfil = ({ nombre, edad, email, userID }) => {

    const urlFriends = 'https://warm-retreat-82659.herokuapp.com/redsocial/friends/';
    const urlFollowers = 'https://warm-retreat-82659.herokuapp.com/redsocial/followers/';
    const urlFeed = 'https://warm-retreat-82659.herokuapp.com/redsocial/feed/';
    const urlComments = 'https://warm-retreat-82659.herokuapp.com/redsocial/Comments/';
    const urlPosts = 'https://warm-retreat-82659.herokuapp.com/redsocial/Posts/';

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showComentar, setShowComentar] = useState(false);
    const handleCloseComentar = () => setShowComentar(false);
    const handleShowComentar = () => setShowComentar(true);


    const [showPublicar, setShowPublicar] = useState(false);
    const handleClosePublicar = () => setShowPublicar(false);
    const handleShowPublicar = () => setShowPublicar(true);

    const [showMisPublicaciones, setShowMisPublicaciones] = useState(false);
    const handleCloseMisPublicaciones = () => setShowMisPublicaciones(false);
    const handleShowMisPublicaciones = () => setShowMisPublicaciones(true);

    const [amigos, setamigos] = useState()
    const [Posts, setPosts] = useState()
    const [Followers, setFollowers] = useState()
    const [Comentarios, setComentarios] = useState()
    const [MisPosts, setMisPosts] = useState()


    const [amigosPrimerCarga, setamigosPrimerCarga] = useState(false)
    const [PostsPrimerCarga, setPostsPrimerCarga] = useState(false)
    const [FollowersPrimerCarga, setFollowersPrimerCarga] = useState(false)

    const [{ inputComentario }, handleInputChange, reset] = useForm({ inputComentario: '' })
    const [{ inputPost }, handleInputChange2, reset2] = useForm({ inputPost: '' })

    function obtenerAmigos() {
        axios.request({
            method: "get", url: urlFriends,
            params: {
                id: userID,
            }
        })
            .then(res => {
                setamigosPrimerCarga(true)
                setamigos(res.data);
            });
    }

    if (!amigosPrimerCarga)
        obtenerAmigos();


    function obtenerPosts() {
        axios.request({
            method: "get", url: urlFeed,
            params: {
                id: userID,
            }
        })
            .then(res => {
                setPostsPrimerCarga(true)
                setPosts(res.data);
            });
    }

    if (!PostsPrimerCarga)
        obtenerPosts();


    function obtenerFollowers() {
        axios.request({
            method: "get", url: urlFollowers,
            params: {
                id: userID,
            }
        })
            .then(res => {
                setFollowersPrimerCarga(true)
                setFollowers(res.data);
            });
    }

    if (!FollowersPrimerCarga)
        obtenerFollowers();


    const ActualizarAmigos = () => {
        obtenerAmigos();
    };

    const ActualizarPosts = () => {
        obtenerPosts();
    };

    const ActualizarFollowers = () => {
        obtenerFollowers();
    };

    function verComentarios(comentarios) {
        if (comentarios) {
            setComentarios(comentarios);
            handleShow();
        }
        else {
            return Swal.fire('No hay comentarios', 'Se el primero en comentar algo');
        }
    }

    function comentar() {
        handleShowComentar();
    }

    const handleClickComentar = () => {
        const data = { userId: "6b51b2d4656a4716994da6fbbb49ee21", comment: "salu2", postId: "61929cafe23d90cdeba8191d" };
        axios.post(urlComments, data)
            .then(response => {
                reset();
                return Swal.fire('¡Atencion!', `tu comentario quedo registrado PERMANENTEMENTE`, 'success');
            });
    };

    function publicar() {
        handleShowPublicar();
    }

    const handleClickPublicar = () => {
        const data = { user: `${userID}`, text: `${inputPost}` };
        axios.post(urlPosts, data)
            .then(response => {
                reset2();
                return Swal.fire('¡Atencion!', `Publicación creada con exito`, 'success');
            })
            .catch(() => {
                return Swal.fire('¡Atencion!', 'No se pudo publicar', 'error');
            });
    };

    function misPublicaciones() {
        axios.request({
            method: "get", url: urlPosts,
            params: {
                user: userID,
            }
        })
            .then(res => {
                setMisPosts(res.data);
                handleShowMisPublicaciones();
            })
            .catch(() => {
                return Swal.fire('¡Atencion!', 'Hubo un error', 'error');
            });
    }

    const handleClickEliminarPublicacion = (idPost) => {
        axios.request({
            method: "delete", url: urlPosts,
            params: {
                id: idPost,
            }
        })
            .then(() => {
                return Swal.fire('¡Atencion!', `Eliminaste la publicación`, 'success');
            });
    };

    return (
        <div>
            <h1>Bienvenido {nombre}</h1>
            <h2>Edad: {edad} años</h2>
            <h2>Correo: {email}</h2>
            <br></br>
            <Container>
                <Row>
                    <Col sm={3}>
                        <Button variant="primary" onClick={ActualizarAmigos}>Actualizar Amigos</Button>
                    </Col>
                    <Col sm={6}>
                        <Button variant="primary" onClick={ActualizarPosts}>Actualizar Publicaciones</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button variant="primary" onClick={publicar}>Publicar Algo</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button variant="primary" onClick={misPublicaciones}>Mis Publicaciones</Button>
                    </Col>
                    <Col sm={3}>
                        <Button variant="primary" onClick={ActualizarFollowers}>Actualizar Seguidores</Button>

                    </Col>
                </Row>
            </Container>
            <br />

            <Container>
                <Row className={"border border-primary"}>
                    <Col className={"border border-primary"} sm={3}>
                        <h2>Los sigo</h2>
                        {amigos?.map(function (d) {
                            return (
                                <Row className={"border border-primary"}>
                                    <p key={d.idx}>{d.name} <br /> {d.age} años</p>
                                </Row>
                            )
                        })}
                    </Col>
                    <Col className={"border border-primary"} sm={6}>
                        <h2>Feed</h2>
                        {Posts?.map(function (d) {
                            return (
                                <>
                                    <Row className={"border border-primary"}>
                                        <p key={d.idx}><br />{d.username}</p>
                                        <br />
                                        <p key={d.idx}>{d.text}</p>
                                        <br />
                                        <Button variant="outline-primary" onClick={verComentarios.bind(this, d.comments)}>Ver Comentarios</Button>
                                        <Button variant="outline-primary" onClick={comentar}>Comentar</Button>
                                        <br />
                                    </Row>
                                </>
                            )
                        })}
                    </Col>
                    <Col className={"border border-primary"} sm={3}>
                        <h2>Me siguen</h2>
                        {Followers?.map(function (d) {
                            return (
                                <Row className={"border border-primary"}>
                                    <p key={d.idx}>{d.name} <br /> {d.age} años</p>
                                </Row>
                            )
                        })}
                    </Col>
                </Row>
            </Container>

            <br />


            {/* MODAL PARA VER COMENTARIOS */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Comntarios: {Comentarios?.length}</Modal.Title>
                </Modal.Header>
                {Comentarios?.map(function (d) {
                    return (
                        <>
                            <hr></hr>
                            <Modal.Body>
                                {d.username} Comentó:
                                <br />
                                "{d.comment}"
                                <br />
                                <hr />
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


            {/* MODAL PARA COMENTAR */}
            <Modal show={showComentar} onHide={handleCloseComentar}>
                <Modal.Header closeButton>
                    <Modal.Title>Comntar</Modal.Title>
                </Modal.Header>
                <>
                    <hr></hr>
                    <Modal.Body>
                        <Form className="d-flex" >
                            <FormControl
                                type="search"
                                placeholder="Comentario"
                                className="me-2"
                                aria-label="Search"
                                name="inputComentario"
                                onChange={handleInputChange}
                                value={inputComentario}
                            />
                            <Button variant="outline-success" onClick={handleClickComentar}>Comentar</Button>
                        </Form>
                    </Modal.Body>
                </>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseComentar}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* MODAL PARA PUBLICAR */}
            <Modal show={showPublicar} onHide={handleClosePublicar}>
                <Modal.Header closeButton>
                    <Modal.Title>Publicar algo</Modal.Title>
                </Modal.Header>
                <>
                    <hr></hr>
                    <Modal.Body>
                        <Form className="d-flex" >
                            <FormControl
                                type="search"
                                placeholder="Publicación"
                                className="me-2"
                                aria-label="Search"
                                name="inputPost"
                                onChange={handleInputChange2}
                                value={inputPost}
                            />
                            <Button variant="outline-success" onClick={handleClickPublicar}>Publicar</Button>
                        </Form>
                    </Modal.Body>
                </>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClosePublicar}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* MODAL PARA VER MIS POSTS */}
            <Modal show={showMisPublicaciones} onHide={handleCloseMisPublicaciones}>
                <Modal.Header closeButton>
                    <Modal.Title>Mis Publicaciones: {MisPosts?.length}</Modal.Title>
                </Modal.Header>
                {MisPosts?.map(function (d) {
                    return (
                        <>
                            <Modal.Body>
                            <hr />
                                publicaste:
                                <br />
                                "{d.text}"
                                <br/>
                                <br />
                                <Button variant="outline-danger" onClick={handleClickEliminarPublicacion.bind(this,d._id)}>Eliminar Publicacion</Button>
                            </Modal.Body>
                        </>
                    )
                })}
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseMisPublicaciones}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>

            <PieDePagina />
        </div>
    )
}
