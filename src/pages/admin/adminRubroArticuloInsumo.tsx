import Alert from "react-bootstrap/Alert";
import * as React from 'react';
import Spinner from "react-bootstrap/Spinner";

import UseRubroInsumo from "../../hooks/useRubroInsumo";

const RubroInsumoTable = React.lazy(() => import('./components/rubroarticuloinsumo/RubroInsumoTable'));

const AdminRubroArticuloInsumo: React.FC = () => {
  // Utils
  const { data, error, loading } = UseRubroInsumo();

  // Render
  if (error) {
    return (
      <Alert variant="danger">
        {error?.message || 'Algo falló mientras buscaba los rubros de artículo insumo.'}
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
        <RubroInsumoTable rubros={data} />
      </React.Suspense>
    )
};

export default AdminRubroArticuloInsumo;