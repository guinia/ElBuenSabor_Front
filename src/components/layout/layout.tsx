import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './style.css' 
import Dropdown from 'react-bootstrap/Dropdown';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';
import { Navbar, Nav, Button } from 'react-bootstrap';

const NavBar: React.FC = () => {
    //Utils
    const navigate = useNavigate();
    const isLoggedIn: boolean = useIsLoggedIn();

    //Handlers
    function onLogOut() {
        window.localStorage.removeItem('isLoggedIn');
        navigate('/');
    }

    //Render
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">
                    <img
                    src="https://raw.githubusercontent.com/guinia/LasFuerzasDelCielo/688ec6c2a2b9f1bcd9e2a7cacf887efd1a53ef58/logo.svg"
                    alt="El Buen Sabor logo"
                    className="logo-img"
                    />
                </Navbar.Brand>
                <Navbar.Brand as={Link} to="/">El Buen Sabor</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">

                        {isLoggedIn && <Dropdown>
                            <Dropdown.Toggle className="btn-navbar">
                                ABMs
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/admin/adminPersona">ABM Persona</Dropdown.Item>
                                <Dropdown.Item href="/admin/adminArticuloManufacturado">ABM Articulo Manufacturado</Dropdown.Item>
                                <Dropdown.Item href="/admin/adminArticuloInsumo">ABM Articulo Insumo</Dropdown.Item>
                                <Dropdown.Item href="/admin/adminUnidadMedida">ABM Unidad Medida</Dropdown.Item>
                                <Dropdown.Item href="/admin/adminRubroArticuloInsumo">ABM Rubro Articulo Insumo</Dropdown.Item>
                                <Dropdown.Item href="/admin/adminRubroProducto">ABM Rubro Producto</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>}
                        {!isLoggedIn && 
                            <Nav.Link as={Link} to="/login">
                                 <Button variant="primary" className="btn-navbar">Iniciar Sesión</Button>
                            </Nav.Link>
                        }
                        {!isLoggedIn && 
                            <Nav.Link as={Link} to="/register">
                                 <Button variant="primary" className="btn-navbar">Registrarse</Button>
                            </Nav.Link>
                        }
                        {isLoggedIn &&
                            <Nav.Link onClick={onLogOut}>
                                <Button variant="primary" className="btn-navbar">Cerrar sesión</Button>
                            </Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default NavBar;