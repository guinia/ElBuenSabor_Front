import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as React from 'react';

import Persona from '../../../../types/persona';

type DeletePersonaModalProps = {
  onDelete: () => void;
  onHide: () => void;
  persona: Persona | null;
  show: boolean;
};


const DeletePersonaModal: React.FC<DeletePersonaModalProps> = ({ onDelete, onHide, persona, show }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Eliminar Persona</Modal.Title>
    </Modal.Header>
    <Modal.Body>Está seguro que quiere eliminar la siguiente persona: <strong>{persona?.nombre}</strong> <strong>{persona?.apellido}</strong>?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Cerrar
      </Button>
      <Button variant="danger" onClick={onDelete}>
        Eliminar
      </Button>
    </Modal.Footer>
  </Modal>
);

export default DeletePersonaModal;