import Alert from "react-bootstrap/Alert";
import * as React from 'react';
import Spinner from "react-bootstrap/Spinner";

import useRubrosProductos from "../../hooks/userubrosProductos";

const RubrosProductosTable = React.lazy(() => import('./components/rubroProducto/RubrosProductosTable')); 

const AdminRubroProducto: React.FC = () => {
    // Utils
    const {data, error, loading} = useRubrosProductos(); 

    // Render
    if (error){
        return (
            <Alert variant="danger">
                {error?.message || 'Algo salió mal buscando rubros productos'} 
            </Alert>
        );
    }

    return loading
        ? (
            <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100wh' }}>
                <Spinner animation="border" />
            </div>
        )
        : (
            <React.Suspense fallback={<Spinner animation="border" />}>
                <RubrosProductosTable rubrosProductos={data} /> 
            </React.Suspense>
        )
};

export default AdminRubroProducto;