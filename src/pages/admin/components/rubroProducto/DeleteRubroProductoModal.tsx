import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as React from 'react';
import RubroProducto from '../../../../types/rubroProducto';

type DeleteRubroProductoModalProps = {
    onDelete: () => void;
    onHide: () => void;
    rubroProducto: RubroProducto | null;
    show: boolean;
};

const DeleteRubroProductoModal: React.FC<DeleteRubroProductoModalProps> = ({onDelete, onHide, rubroProducto, show}) => (
    <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Borrar rubro de producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            ¿Estás seguro de que quieres borrar el siguiente rubro de producto: {rubroProducto?.denominacion}? 
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Cerrar
            </Button>
            <Button variant="danger" onClick={onDelete}>
                Borrar
            </Button>
        </Modal.Footer>
    </Modal>
);

export default DeleteRubroProductoModal;