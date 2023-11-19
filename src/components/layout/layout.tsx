import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import './style.css' 
import Dropdown from 'react-bootstrap/Dropdown';
import useIsLoggedIn from '../../hooks/useIsLoggedIn'; 

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
                <Navbar.Brand as={Link} to="/">El Buen Sabor</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {isLoggedIn && <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                ABMs
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="/admin/Persona">ABM Persona</Dropdown.Item>
                                <Dropdown.Item href="/admin/AdminArticuloManufacturado">ABM Articulo Manufacturado</Dropdown.Item>
                                <Dropdown.Item href="/admin/adminArticuloInsumo">ABM Articulo Insumo</Dropdown.Item>
                                <Dropdown.Item href="/admin/adminUnidadMedida">ABM Unidad Medida</Dropdown.Item>
                                <Dropdown.Item href="/admin/adminRubroArticuloInsumo">ABM Rubro Articulo Insumo</Dropdown.Item>
                                <Dropdown.Item href="/admin/adminRubroProducto">ABM Rubro Producto</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>}
                        {!isLoggedIn && <Nav.Link as={Link} to="/login">Iniciar Sesion</Nav.Link>}
                        {!isLoggedIn && <Nav.Link as={Link} to="/register">Registrarse</Nav.Link>}
                        {/*<Nav.Link as={Link} to="/admin/Persona">ABM Persona</Nav.Link>
                        <Nav.Link as={Link} to="/admin/AdminArticuloManufacturado">ABM Articulo Manufacturado</Nav.Link>
                        <Nav.Link as={Link} to="/admin/adminArticuloInsumo">ABM Articulo Insumo</Nav.Link>
                        <Nav.Link as={Link} to="/admin/adminUnidadMedida">ABM Unidad Medida</Nav.Link>
                        <Nav.Link as={Link} to="/admin/adminRubroArticuloInsumo">ABM Rubro Articulo Insumo</Nav.Link>
                        <Nav.Link as={Link} to="/admin/adminRubroProducto">ABM Rubro Producto</Nav.Link>*/}
                        {isLoggedIn && <Nav.Link onClick={onLogOut}>Log Out</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default NavBar;