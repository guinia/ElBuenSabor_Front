import Alert from "react-bootstrap/Alert";
import * as React from 'react';
import Spinner from "react-bootstrap/Spinner";

import useArticuloManufacturado from "../../hooks/useArticuloManufacturado";

// Importa el componente correctamente con la letra inicial en mayúscula
const ArticuloManufacturadoTable = React.lazy(() => import('./components/articulomanufacturado/articulomanufacturadoTable'));

const AdminArticuloManufacturado: React.FC = () => {
  // Utils
  const { data, error, loading } = useArticuloManufacturado();

  // Render
  if (error) {
    return (
      <Alert variant="danger">
        {error?.message || 'Something went wrong while fetching articulomanufacturado.'}
      </Alert>
    );
  }

  return loading ? (
    <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100wh' }}>
      <Spinner animation="border" />
    </div>
  ) 
  : (
    <React.Suspense fallback={<Spinner animation="border" />}>
      {/* Utiliza el nombre correcto del componente con la letra inicial en mayúscula */}
      <ArticuloManufacturadoTable articulomanufacturado={data} />
    </React.Suspense>
  );
};

export default AdminArticuloManufacturado;