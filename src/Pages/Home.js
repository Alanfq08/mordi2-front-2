import React from 'react'
import { Carousel } from 'react-bootstrap'
import { BarraDeNavegacion } from '../Components/BarraDeNavegacion'
import fondo1 from "../assets/background.jpg"
import fondo2 from "../assets/background2.jpg"
import fondo3 from "../assets/background3.jpg"

import { PieDePagina } from '../Components/PieDePagina'

export const Home = () => {

    return (
        <div>
            <BarraDeNavegacion />

            <Carousel fade>
                <Carousel.Item>
                    <img
                        className="d-block h-100"
                        src={fondo1}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h1>Bienvenido a Mordi2</h1>
                        <p>Registrate o accede para ver las publicaciones.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block h-100"
                        src={fondo2}
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h1>Haz publicaciones de lo que quieras</h1>
                        <p>Podrás publicar lo que quieras cuando quieras.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block h-100"
                        src={fondo3}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h1>ES GRATIS</h1>
                        <p>Nunca te cobraremos por usar nuestra web.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <PieDePagina/>
        </div>
    )
}
