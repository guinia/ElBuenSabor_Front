import './HeaderStyle.css'

const Header = () => {
    return (
        <>
        <header>
            <div className="contenedor-navbar">
                <nav className="navbar">
                    <div className="contenedor-logo-search">
                        <div className="contenedor-logo">
                            <img src="https://raw.githubusercontent.com/guinia/LasFuerzasDelCielo/688ec6c2a2b9f1bcd9e2a7cacf887efd1a53ef58/logo.svg" alt="El Buen Sabor logo" className="logo-img"/>
                        </div>
                        <form className="search-form">
                            <input type="search" placeholder="Buscar..." className="barra-buscar"/>
                            <button className="btn-search">
                                <span className="material-symbols-outlined">search</span>
                            </button>
                        </form>
                    </div>
                    <div className="contenedor-items">
                        <ul className="items links-navbar">
                            <li className=" item-link"><a href="/home" >Inicio</a></li>
                            <li className=" item-link nav-item-dropdown">
                                <a href="/admin" className="contenedor-prod">
                                    ABMs
                                </a>
                                <ul className="vertical-menu">
                                <li className="dp-item">
                                    <a href="#Promos">ABM ArticuloInsumo</a>
                                </li>
                                <li className="dp-item">
                                    <a href="#Pizzas">ABM ArticuloManufacturado</a>
                                </li>
                                <li className="dp-item">
                                    <a href="#Hamburguesas">ABM RubroArticuloInsumo</a>
                                </li>
                                <li className="dp-item">
                                    <a href="#Lomos">ABM RubroArticuloManufacturado</a>
                                </li>
                                <li className="dp-item">
                                    <a href="#Papas">ABM UnidadMedida</a>
                                </li>
                                <li className="dp-item">
                                    <a href="#Bebidas">ABM Persona</a>
                                </li>
                            </ul>
                            </li>
                        </ul>
                        <ul className="items">
                            <li className=" item-link nav-item-dropdown">
                                <a href="#" className="btn-navbar contenedor-usuario">
                                    ¡Hola, Admin!
                
                                </a>
                            </li>
                        </ul>
                    </div>
                    
                    <button  className="contenedor-menu-cel" >
                        <span className="material-symbols-outlined" id="icono-menu">menu</span>
                    </button>
                </nav>
            </div>
        </header>
        </>
    )        
}
export default Header;