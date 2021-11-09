import React from 'react'

export const PieDePagina = () => {
    return (
        <div>
            <footer class="bg-dark text-center text-white">

                <div class="text-center p-3" style={{ backgroundColor:`rgba(0, 0, 0, 0.2)` }}>
                    {/* © 2020 Copyright: Mordi2 */}
                    Sitio Diseñado por David Halabe, Alan Flores, Gabriela Uribe 
                    <br/>
                    &copy; Mordi2 {new Date().getFullYear()}
                </div>


            </footer>


        </div>
    )
}
