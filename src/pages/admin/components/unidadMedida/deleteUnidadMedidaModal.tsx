import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as React from 'react';
import UnidadMedida from '../../../../types/unidadMedida';

type DeleteUnidadMedidaModalProps = {
    onDelete: () => void;
    onHide: () => void;
    unidad: UnidadMedida | null;
    show: boolean;
};

const DeleteUnidadMedidaModal: React.FC<DeleteUnidadMedidaModalProps> = ({onDelete, onHide, unidad, show}) => (
    <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Borrar Unidad Medida</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            ¿Estas seguro de que quieres borrar la siguiente unidad de medida : {unidad?.denominacion}? 
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

export default DeleteUnidadMedidaModal;