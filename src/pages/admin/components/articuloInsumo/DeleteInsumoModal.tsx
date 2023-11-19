import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as React from 'react';

import ArticuloInsumo from '../../../../types/articuloInsumo';


type DeleteInsumoModalProps = {
    onDelete: () => void;
    onHide: () => void;
    insumo: ArticuloInsumo | null;
    show: boolean;
};

const DeleteInsumoModal: React.FC<DeleteInsumoModalProps> = ({onDelete, onHide, insumo, show}) => (
    <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Borrar insumo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            ¿Estas seguro de que quieres borrar el siguiente insumo: {insumo?.denominacion}? 
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

export default DeleteInsumoModal;