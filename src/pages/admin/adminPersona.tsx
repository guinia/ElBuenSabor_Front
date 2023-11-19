import Alert from "react-bootstrap/Alert";
import * as React from 'react';
import Spinner from "react-bootstrap/Spinner";

import usePersonas from "../../hooks/usePersonas";

const PersonasTable = React.lazy(() => import('./components/persona/PersonaTable'));

const AdminPersona: React.FC = () => {
  // Utils
  const { data, error, loading } = usePersonas();

  // Render
  if (error) {
    return (
      <Alert variant="danger">
        {error?.message || 'Something went wrong while fetching products.'}
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
        <PersonasTable personas={data} />
      </React.Suspense>
    )
};

export default AdminPersona;