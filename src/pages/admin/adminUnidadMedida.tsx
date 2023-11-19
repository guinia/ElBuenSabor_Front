import Alert from "react-bootstrap/Alert";
import * as React from 'react';
import Spinner from "react-bootstrap/Spinner";

import useUnidadMedida from "../../hooks/useUnidadMedida";

const UnidadMedidaTable = React.lazy(() => import('./components/unidadMedida/UnidadMedidaTable'));

const AdminUnidadMedida: React.FC = () => {
    //Utils
    const {data, error, loading} = useUnidadMedida();

    //Render
    if (error){
        return (
            <Alert variant="danger">
                {error?.message || 'Algo salio mal buscando Unidades de medida'}
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
                <UnidadMedidaTable unidades={data} />
            </React.Suspense>
        )
};

export default AdminUnidadMedida;


