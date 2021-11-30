import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap"

export const Perfil = ({ nombre, edad, email, userID }) => {

    const urlFriends = 'https://warm-retreat-82659.herokuapp.com/redsocial/friends/';
    const urlFollowers = 'https://warm-retreat-82659.herokuapp.com/redsocial/followers/';


    const [amigos, setamigos] = useState()
    const [Posts, setPosts] = useState()
    const [Followers, setFollowers] = useState()

    const [amigosPrimerCarga, setamigosPrimerCarga] = useState(false)
    const [PostsPrimerCarga, setPostsPrimerCarga] = useState(false)
    const [FollowersPrimerCarga, setFollowersPrimerCarga] = useState(false)

    useEffect(() => {
        console.log("corrio el use effect");
    });

    function obtenerAmigos() {
        axios.request({
            method: "get", url: urlFriends,
            params: {
                id: userID,
            }
        })
            .then(res => {
                console.log(res);
                setamigosPrimerCarga(true)
                setamigos(res.data);
            });
    }

    if (!amigosPrimerCarga)
        obtenerAmigos();


    function obtenerPosts() {
        axios.request({
            method: "get", url: urlFriends,
            params: {
                id: userID,
            }
        })
            .then(res => {
                console.log(res);
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
                console.log(res);
                setFollowersPrimerCarga(true)
                setFollowers(res.data);
            });
    }

    if (!FollowersPrimerCarga)
        obtenerFollowers();


    const ActualizarAmigos = () => {
        console.log("prueba");
        obtenerAmigos();
    };

    const ActualizarPosts = () => {
        console.log("prueba");
        obtenerPosts();
    };

    const ActualizarFollowers = () => {
        console.log("prueba");
        obtenerFollowers();
    };


    return (
        <div>
            <h1>Bienvenido {nombre}</h1>
            <h2>Edad: {edad}</h2>
            <h2>Edad: {email}</h2>
            <br></br>
            <Container>
                <Row>
                    <Col sm={3}>
                        <Button variant="primary" onClick={ActualizarAmigos}>Actualizar Amigos</Button>
                    </Col>
                    <Col sm={6}>
                        {/* <Button variant="primary" onClick={pruebas}>Actualizar Publicaciones</Button> */}
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
                        <h2>Mis Amigos</h2>
                        {amigos?.map(function (d) {
                            return (
                                <Row className={"border border-primary"}>
                                    <p key={d.idx}>{d.name}</p>
                                </Row>
                            )
                        })}
                    </Col>
                    <Col className={"border border-primary"} sm={6}><h2>Posts</h2></Col>
                    <Col className={"border border-primary"} sm={3}>
                        <h2>Mis Seguidores</h2>
                        {Followers?.map(function (d) {
                            return (
                                <Row className={"border border-primary"}>
                                    <p key={d.idx}>{d.name}</p>
                                </Row>
                            )
                        })}
                    </Col>
                </Row>
            </Container>

        </div>
    )
}
