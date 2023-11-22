import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import * as React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import articulomanufacturado from '../../../../types/articulomanufacturado';
import dataLayerArticuloManufacturado from '../../../../libs/dataLayerArticuloManufacturado';
import { Trash, Pencil } from 'react-bootstrap-icons';
import '../Table.css';


const DeletearticulomanufacturadoModal = React.lazy(() => import('./DeletearticulomanufacturadoModal'));
const SavearticulomanufacturadoModal = React.lazy(() => import('./SavearticulomanufacturadoModal'));

type articulomanufacturadoTableProps = {
  articulomanufacturado: articulomanufacturado[];
};

const emptyarticulomanufacturado: articulomanufacturado = {
  denominacion: '',
  descripcion: '',
  id: 0,
  tiempoEstimadoCocina:0,
  precioVenta:0,
};


const articulomanufacturadoTable: React.FC<articulomanufacturadoTableProps> = ({ articulomanufacturado }) => {
  // State
  const [error, setError] = React.useState<any>(null);
  const [listedarticulomanufacturado, setListedarticulomanufacturado] = React.useState<articulomanufacturado[]>(articulomanufacturado);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedarticulomanufacturado, setSelectedarticulomanufacturado] = React.useState<articulomanufacturado | null>(null);
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
  const [showSaveModal, setShowSaveModal] = React.useState<boolean>(false);

  // Handlers
  const onCloseDeleteModal = React.useCallback(() => setShowDeleteModal(false), [setShowDeleteModal]);
  const onCloseSaveModal = React.useCallback(() => setShowSaveModal(false), [setShowSaveModal]);
  const onDelete = React.useCallback(() => {
    if (selectedarticulomanufacturado) {
      setShowDeleteModal(false);
      setLoading(true);
      dataLayerArticuloManufacturado.delete.articulomanufacturado(selectedarticulomanufacturado.id!)
        .then(() => setListedarticulomanufacturado((prevState: articulomanufacturado[]) => prevState.filter((item: articulomanufacturado) => item.id !== selectedarticulomanufacturado.id)))
        .catch((error: any) => setError(error))
        .finally(() => setLoading(false));
    }
  }, [selectedarticulomanufacturado, setShowDeleteModal, setListedarticulomanufacturado, setLoading]);
  const onSave = React.useCallback((p: articulomanufacturado) => {
    if (selectedarticulomanufacturado) {
      setShowSaveModal(false);
      setLoading(true);
      if (p.id) {
        dataLayerArticuloManufacturado.update.articulomanufacturado(p)
          .then((editedarticulomanufacturado: articulomanufacturado) => setListedarticulomanufacturado((prevState: articulomanufacturado[]) => prevState.map((item: articulomanufacturado) => item.id === editedarticulomanufacturado.id ? editedarticulomanufacturado : item)))
          .catch((error: any) => setError(error))
          .finally(() => setLoading(false));
      } else {
        // Delete id property since it is a create action
        delete p.id;

        dataLayerArticuloManufacturado.create.articulomanufacturado(p)
          .then((createdarticulomanufacturado: articulomanufacturado) => {
            setListedarticulomanufacturado((prevState: articulomanufacturado[]) => [...prevState, createdarticulomanufacturado]);
          })
          .catch((error: any) => setError(error))
          .finally(() => setLoading(false));
      }
    }
  }, [selectedarticulomanufacturado, setShowSaveModal, setListedarticulomanufacturado, setLoading]);
  const onShowDeleteModal = React.useCallback((p: articulomanufacturado) => {
    setSelectedarticulomanufacturado(p);
    setShowDeleteModal(true);
  }, [setSelectedarticulomanufacturado, setShowDeleteModal]);
  const onShowSaveModal = React.useCallback((p?: articulomanufacturado) => {
    setSelectedarticulomanufacturado(p ?? emptyarticulomanufacturado);
    setShowSaveModal(true);
  }, [setSelectedarticulomanufacturado, setShowSaveModal])

  // Render
  if (error) {
    return (
      <Alert variant="danger">
        {error?.message || 'Something went wrong while fetching products.'}
      </Alert>
    );
  }

  return (
    <React.Suspense fallback={<Spinner animation="border" />}>
      {
        loading
          ? (
            <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100wh' }}>
              <Spinner animation="border" />
            </div>
          )
          : (
            <>
            <div className="cuerpote">
               <Button
                onClick={() => onShowSaveModal()}
                style={{
                  float: 'right', margin: 10, border: '1px solid #D32B08', color:'white',backgroundColor:'#D32B08', borderColor:'#D32B08'
                }}
                
              >
                Crear Articulo Manufacturado
              </Button>
              
              <Table
                style={{
                  backgroundColor: '#FFBC0D',
                  borderRadius: '8px', // Ajusta el radio de borde según sea necesario
                  overflow: 'hidden', // Evita que los bordes redondeados afecten el contenido
                }}
                striped
                bordered
                hover
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Denominación</th>
                    <th>Descripción</th>
                    <th>Precio de venta</th>
                    <th>Tiempo estimado en cocina</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    listedarticulomanufacturado.map((p: articulomanufacturado) => (
                      <tr key={p.id}>
                        <td width='2%'>{p.id}</td>
                        <td width='23%'>{p.denominacion}</td>
                        <td width='30%'>{p.descripcion}</td>
                        <td width='15%'>{p.precioVenta}</td>
                        <td width='20%'>{p.tiempoEstimadoCocina}</td>
                        <td width='10%' justify-content='space-between'>
                          <Pencil color="black" onClick={() => onShowSaveModal(p)} size={24} onMouseEnter={() => { document.body.style.cursor = 'pointer'}} onMouseLeave={() => { document.body.style.cursor = 'default'}}></Pencil>
                          <Trash color="#D32B08" onClick={() => onShowDeleteModal(p)} size={24} onMouseEnter={() => { document.body.style.cursor = 'pointer'}}  onMouseLeave={() => { document.body.style.cursor = 'default'}} ></Trash>
                        </td>
                      
                      </tr>
                    ))
                  }
                </tbody>
            </Table>
              </div>
              
            </>
          )
      }
      <DeletearticulomanufacturadoModal
        onDelete={onDelete}
        onHide={onCloseDeleteModal}
        articulomanufacturado={selectedarticulomanufacturado}
        show={showDeleteModal}
      />
      <SavearticulomanufacturadoModal
        onHide={onCloseSaveModal}
        onSave={onSave}
        articulomanufacturado={selectedarticulomanufacturado}
        show={showSaveModal}
      />
    </React.Suspense>
  );
};

export default articulomanufacturadoTable