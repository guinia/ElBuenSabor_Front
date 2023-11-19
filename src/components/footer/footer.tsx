import './footerStyle.css'

const Footer = () => {
    return (
        <>
            <footer className="pie-pagina">
                <div className="grupo-1">
                    <div className="box caja-logo">
                        <figure >
                            <a href="#">
                                <img src="https://raw.githubusercontent.com/guinia/LasFuerzasDelCielo/688ec6c2a2b9f1bcd9e2a7cacf887efd1a53ef58/logo.svg" alt="Logo del Buen Sabor"/>
                            </a>
                        </figure>
                        <p id="nombre">EL BUEN SABOR</p>
                    </div>
                    <div className="box">
                        <h2>Acerca</h2>
                        <a href="#" className="pie-link"><p>Sobre Nosotros</p></a>
                        <a href="#"><p>Términos y Condiciones</p></a>
                        <a href="#"><p>Privacidad</p></a>
                        <a href="#"><p>Invita a un amigo</p></a>
                    </div>
                    <div className="box">
                        <h2>SIGUENOS</h2>
                            <a href="#"><p>Facebook</p></a>
                            <a href="#"><p>Instagram</p></a>
                            <a href="#"><p>Twitter</p></a>
                            <a href="#"><p>Tik Tok</p></a>
                    </div>
                    <div className="box">
                        <h2> Horarios de Atención </h2>
                        <p>Lunes a Domingos</p>
                        <p> 20:00 hs - 00:00 hs</p>
                        <p>Sábados y Domingos</p>
                        <p> 11:00 hs - 15:00 hs</p>
                    </div>
                </div>
                <div className="grupo-2">
                    <small>&copy; 2023 <b>El Buen Sabor</b> - Todos los Derechos Reservados.</small>
                </div>
            </footer>
        </>
    )

}

export default Footer;