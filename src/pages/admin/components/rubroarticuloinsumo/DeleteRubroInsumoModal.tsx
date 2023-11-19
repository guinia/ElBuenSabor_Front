import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as React from 'react';
import RubroArticuloInsumo from "../../../../types/rubroArticuloInsumo";

type DeleteRubroInsumoModalProps = {
  onDelete: () => void;
  onHide: () => void;
  rubro: RubroArticuloInsumo | null;
  show: boolean;
};

const DeleteRubroInsumoModal: React.FC<DeleteRubroInsumoModalProps> = ({ onDelete, onHide, rubro, show }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Eliminar rubro</Modal.Title>
    </Modal.Header>
    <Modal.Body>¿Está seguro que quiere eliminar el rubro <strong>{rubro?.denominacion}</strong>?</Modal.Body>
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

export default DeleteRubroInsumoModal;