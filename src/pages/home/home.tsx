import './home.css'

const Home: React.FC = () => {
    return (
        <>
            <main className="main">
                <section className="muestra-foto">
                    <div className="caja-inicio">
                        <div className="caja-titulo">
                            <h1 className="titulo-ppal">LA MEJOR COMIDA DE MENDOZA</h1>
                            <p className="texto-inicio">Nuestro menú diverso ofrece opciones para todos los gustos, donde cada bocado es una explosión de sabor.</p>
                            <button type="button" className="btn-inicio">¡Pedí ya!</button>
                        </div>
                        <div className="imagen-inicio">
                            <img src="https://s3-eu-central-1.amazonaws.com/www.burgerking.com.ar.v2/wp-media-folder-bk-argentina//home/ubuntu/preview/menu-app/frontend/apps/marketing-website-wordpress-app/web/app/uploads/sites/5/Armado-whopper-doble-con-queso.png" alt="Hamburguesa" id="hambur-inicio"/>
                        </div>
                    </div>
                </section>
                
                <section className="muestra-productos">
                    <div className="caja-productos">
                        <h1 className="titulo-productos">Productos</h1>
                        <div className="opciones-productos">
                            <a href="#" className="item-productos">Promos</a>
                            <a href="#" className="item-productos">Pizzas</a>
                            <a href="#" className="item-productos">Hamburguesas</a>
                            <a href="#" className="item-productos">Lomos</a>
                            <a href="#" className="item-productos">Papas</a>
                            <a href="#" className="item-productos">Bebidas</a>
                        </div>
                        
                        
                        <div className="container-items">
                            <div className="item">
                                <div className="info-product">
                                    <h2 className="product-name">Pizza Pepperoni</h2>
                                    <figure>
                                        <img src="https://github.com/guinia/LasFuerzasDelCielo/blob/images/pizza-pepperoni.jpg?raw=true" 
                                        alt="pizza pepperoni" className="producto-foto"/>
                                    </figure>
                                    <div className="info2">
                                        <p className="price">$2000</p>
                                        <button className="boton-item">Agregar</button>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="info-product">
                                    <h2 className="product-name">Pizza Italiana</h2>
                                    <figure>
                                    <img src="https://github.com/guinia/LasFuerzasDelCielo/blob/images/pizza-italiana.jpg?raw=true"
                                        alt="pizza italiana" className="producto-foto"/>
                                    </figure>
                                    <div className="info2">
                                        <p className="price">$2000</p>
                                        <button className="boton-item">Agregar</button>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="info-product">
                                    <h2 className="product-name">Pizza Fresh</h2> 
                                    <figure>
                                    <img src="https://github.com/guinia/LasFuerzasDelCielo/blob/images/pizza-fresh.jpg?raw=true"
                                        alt="pizza rucula" className="producto-foto"/>
                                    </figure>
                                    <div className="info2">
                                        <p className="price">$2000</p>
                                        <button className="boton-item">Agregar</button>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="info-product">
                                    <h2 className="product-name">Pizza Mariachi</h2>            
                                    <figure>
                                    <img src="https://github.com/guinia/LasFuerzasDelCielo/blob/images/pizza-mariachi.jpg?raw=true"
                                        alt="pizza mariachi" className="producto-foto"/>
                                    </figure>
                                    <div className="info2">
                                        <p className="price">$2000</p>
                                        <button className="boton-item">Agregar</button>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="info-product">
                                    <h2 className="product-name">Doble Muzza</h2>
                                    <figure>
                                    <img src="https://github.com/guinia/LasFuerzasDelCielo/blob/images/pizza-doble-muzza.jpg?raw=true"
                                        alt="pizza doble muzza" className="producto-foto"/>
                                    </figure>
                                    <div className="info2">
                                        <p className="price">$2000</p>
                                        <button className="boton-item">Agregar</button>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="info-product">
                                    <h2 className="product-name">Amor Pepperoni</h2> 
                                    <figure>
                                    <img src="https://github.com/guinia/LasFuerzasDelCielo/blob/images/pizza-amor-pepperoni.jpg?raw=true"
                                        alt="amor pepperoni" className="producto-foto"/>
                                    </figure>
                                    <div className="info2">
                                        <p className="price">$2000</p>
                                        <button className="boton-item">Agregar</button>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="info-product">
                                    <h2 className="product-name">Pizza Champi</h2>
                                        <figure>
                                            <img src="https://github.com/guinia/LasFuerzasDelCielo/blob/images/pizza-champignon.jpg?raw=true"
                                                alt="pizza champignon" className="producto-foto"/>
                                        </figure>
                                        <div className="info2">
                                            <p className="price">$2000</p>
                                            <button className="boton-item">Agregar</button>
                                        </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="info-product">
                                    <h2 className="product-name">Pizza Calabresa</h2>
                                    <figure>
                                        <img src="https://github.com/guinia/LasFuerzasDelCielo/blob/images/pizza-calabresa.jpg?raw=true"
                                            alt="pizza calabresa" className="producto-foto"/>
                                    </figure>
                                    <div className="info2">
                                        <p className="price">$2000</p>
                                        <button className="boton-item">Agregar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    <div/>
                </section>
            </main>
        </>
    );

};

export default Home;