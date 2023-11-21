import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import * as React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import { Trash, Pencil } from 'react-bootstrap-icons';

import Persona from "../../../../types/persona";
import dataLayerPersona from '../../../../libs/dataLayerPersona';
import '../Table.css';

const DeletePersonaModal = React.lazy(() => import('./DeletePersonaModal'));
const SavePersonaModal = React.lazy(() => import('./SavePersonaModal'));

type PersonasTableProps = {
  personas: Persona[];
};

const emptyPersona: Persona = {
  nombre: '',
  apellido: '',
  id: 0,
  email: '',
  telefono: 0,
};

const PersonasTable: React.FC<PersonasTableProps> = ({ personas }) => {
  // State
  const [error, setError] = React.useState<any>(null);
  const [listedPersonas, setListedPersonas] = React.useState<Persona[]>(personas);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedPersona, setSelectedPersona] = React.useState<Persona | null>(null);
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
  const [showSaveModal, setShowSaveModal] = React.useState<boolean>(false);

  // Handlers
  const onCloseDeleteModal = React.useCallback(() => setShowDeleteModal(false), [setShowDeleteModal]);
  const onCloseSaveModal = React.useCallback(() => setShowSaveModal(false), [setShowSaveModal]);
  const onDelete = React.useCallback(() => {
    if (selectedPersona) {
      setShowDeleteModal(false);
      setLoading(true);
      dataLayerPersona.delete.persona(selectedPersona.id!)
        .then(() => setListedPersonas((prevState: Persona[]) => prevState.filter((item: Persona) => item.id !== selectedPersona.id)))
        .catch((error: any) => setError(error))
        .finally(() => setLoading(false));
    }
  }, [selectedPersona, setShowDeleteModal, setListedPersonas, setLoading]);
  const onSave = React.useCallback((p: Persona) => {
    if (selectedPersona) {
      setShowSaveModal(false);
      setLoading(true);
      if (p.id) {
        dataLayerPersona.update.persona(p)
          .then((editedPersona: Persona) => setListedPersonas((prevState: Persona[]) => prevState.map((item: Persona) => item.id === editedPersona.id ? editedPersona : item)))
          .catch((error: any) => setError(error))
          .finally(() => setLoading(false));
      } else {
        // Delete id property since it is a create action
        delete p.id;

        dataLayerPersona.create.persona(p)
          .then((createdPersona: Persona) => {
            setListedPersonas((prevState: Persona[]) => [...prevState, createdPersona]);
          })
          .catch((error: any) => setError(error))
          .finally(() => setLoading(false));
      }
    }
  }, [selectedPersona, setShowSaveModal, setListedPersonas, setLoading]);
  const onShowDeleteModal = React.useCallback((p: Persona) => {
    setSelectedPersona(p);
    setShowDeleteModal(true);
  }, [setSelectedPersona, setShowDeleteModal]);
  const onShowSaveModal = React.useCallback((p?: Persona) => {
    setSelectedPersona(p ?? emptyPersona);
    setShowSaveModal(true);
  }, [setSelectedPersona, setShowSaveModal])

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
              <Button onClick={() => onShowSaveModal()} style={{ float: 'right', margin: 10 }} variant="primary">Crear Persona</Button>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Telefono</th>
                    <th>E-mail</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    listedPersonas.map((p: Persona) => (
                      <tr key={p.id}>
                        <td width='2%'>{p.id}</td>
                        <td width='23%'>{p.nombre}</td>
                        <td width='45%'>{p.apellido}</td>
                        <td width='10%'>{p.telefono}</td>
                        <td width='5%'>{p.email}</td>
                        <td width='10%'>
                          <Pencil color="black" onClick={() => onShowSaveModal(p)} size={24} onMouseEnter={() => { document.body.style.cursor = 'pointer'}} onMouseLeave={() => { document.body.style.cursor = 'default'}}></Pencil>
                          <Trash color="#D32B08" onClick={() => onShowDeleteModal(p)} size={24} onMouseEnter={() => { document.body.style.cursor = 'pointer'}}  onMouseLeave={() => { document.body.style.cursor = 'default'}} ></Trash>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </>
          )
      }
      <DeletePersonaModal
        onDelete={onDelete}
        onHide={onCloseDeleteModal}
        persona={selectedPersona}
        show={showDeleteModal}
      />
      <SavePersonaModal
        onHide={onCloseSaveModal}
        onSave={onSave}
        persona={selectedPersona}
        show={showSaveModal}
      />
    </React.Suspense>
  );
};

export default PersonasTable;