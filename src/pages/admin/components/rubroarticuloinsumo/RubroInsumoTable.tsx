import { TrashFill, PencilFill } from 'react-bootstrap-icons';
import * as React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import dataLayerRubroArticuloInsumo from '../../../../libs/dataLayerRubroArticuloInsumo';
import RubroArticuloInsumo from '../../../../types/rubroArticuloInsumo';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import '../Table.css';

const DeleteRubroInsumoModal = React.lazy(() => import('./DeleteRubroInsumoModal'));
const SaveRubroInsumoModal = React.lazy(() => import('./SaveRubroInsumoModal'));

type RubroInsumoTableProps = {
  rubros: RubroArticuloInsumo[];
};

const emptyRubroInsumo: RubroArticuloInsumo = {
  denominacion: '',
  id: 0
};

const RubroInsumoTable: React.FC<RubroInsumoTableProps> = ({ rubros }) => {
  // State
  const [error, setError] = React.useState<any>(null);
  const [listedRubros, setListedRubros] = React.useState<RubroArticuloInsumo[]>(rubros);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedRubro, setSelectedRubro] = React.useState<RubroArticuloInsumo | null>(null);
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
  const [showSaveModal, setShowSaveModal] = React.useState<boolean>(false);

  // Handlers
  const onCloseDeleteModal = React.useCallback(() => setShowDeleteModal(false), [setShowDeleteModal]);
  const onCloseSaveModal = React.useCallback(() => setShowSaveModal(false), [setShowSaveModal]);
  const onDelete = React.useCallback(() => {
    if (selectedRubro) {
      setShowDeleteModal(false);
      setLoading(true);
      dataLayerRubroArticuloInsumo.delete.rubroArticuloInsumo(selectedRubro.id!)
        .then(() => setListedRubros((prevState: RubroArticuloInsumo[]) => prevState.filter
        ((item: RubroArticuloInsumo) => item.id !== selectedRubro.id)))
        .catch((error: any) => setError(error))
        .finally(() => setLoading(false));
    }
  }, [selectedRubro, setShowDeleteModal, setListedRubros, setLoading]);
  const onSave = React.useCallback((r: RubroArticuloInsumo) => {
    if (selectedRubro) {
      setShowSaveModal(false);
      setLoading(true);
      if (r.id) {
        dataLayerRubroArticuloInsumo.update.rubroArticuloInsumo(r)
          .then((editedRubro: RubroArticuloInsumo) => setListedRubros((prevState:
             RubroArticuloInsumo[]) => prevState.map((item: RubroArticuloInsumo) => item.id === 
             editedRubro.id ? editedRubro : item)))
          .catch((error: any) => setError(error))
          .finally(() => setLoading(false));
      } else {
        delete r.id;

        dataLayerRubroArticuloInsumo.create.rubroArticuloInsumo(r)
          .then((createdRubro: RubroArticuloInsumo) => {
            setListedRubros((prevState: RubroArticuloInsumo[]) => [...prevState,
            createdRubro]);
          })
          .catch((error: any) => setError(error))
          .finally(() => setLoading(false));
      }
    }
  }, [selectedRubro, setShowSaveModal, setListedRubros, setLoading]);
  
  const onShowDeleteModal = React.useCallback((r: RubroArticuloInsumo) => {
    setSelectedRubro(r);
    setShowDeleteModal(true);
  }, [setSelectedRubro, setShowDeleteModal]);
  
  const onShowSaveModal = React.useCallback((r?: RubroArticuloInsumo) => {
    setSelectedRubro(r ?? emptyRubroInsumo);
    setShowSaveModal(true);
  }, [setSelectedRubro, setShowSaveModal])

  // Render
  if (error) {
    return (
      <Alert variant="danger">
        {error?.message || 'Algo falló mientras buscaba los rubros de los artículos insumo.'}
      </Alert>
    );
  }

  return (
    <React.Suspense fallback={<Spinner animation="border" />}>
      {
        loading
          ? (
            <div style={{ alignItems: 'center', display: 'flex', height: '100vh', 
            justifyContent: 'center', width: '100wh' }}>
              <Spinner animation="border" />
            </div>
          )
          : (
            <div className="cuerpote">
              <Button onClick={() => onShowSaveModal()} style={{ float: 'right', margin:
              10 }} variant="primary">Crear Rubro Artículo Insumo</Button>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Denominación</th>
                    {/* <th>Rubro Padre</th> */}
                  </tr>
                </thead>
                <tbody>
                  {
                    listedRubros.map((r: RubroArticuloInsumo) => (
                      <tr key={r.id}>
                        <td width='10%'>{r.id}</td>
                        <td width='70%'>{r.denominacion}</td>
                        {/* <td width='15%'>{r.rubroPadre}</td> */}
                        <td width='15%'>
                          <PencilFill color="#6E5519" onClick={() => onShowSaveModal(r)} size={24} onMouseEnter={() => { document.body.style.cursor = 'pointer' }} onMouseLeave={() => { document.body.style.cursor = 'default' }}></PencilFill>
                          <TrashFill color="#D32B08" onClick={() => onShowDeleteModal(r)} size={24} onMouseEnter={() => { document.body.style.cursor = 'pointer' }} onMouseLeave={() => { document.body.style.cursor = 'default' }} ></TrashFill>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </div>
          )
      }
      <DeleteRubroInsumoModal
        onDelete={onDelete}
        onHide={onCloseDeleteModal}
        rubro={selectedRubro}
        show={showDeleteModal}
      />
      <SaveRubroInsumoModal
        onHide={onCloseSaveModal}
        onSave={onSave}
        rubro={selectedRubro}
        show={showSaveModal}
      />
    </React.Suspense>
  );
};

export default RubroInsumoTable;