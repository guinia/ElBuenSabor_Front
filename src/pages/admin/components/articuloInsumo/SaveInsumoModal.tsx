import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import * as React from 'react';
import Row from 'react-bootstrap/Row';

import ArticuloInsumo from '../../../../types/articuloInsumo';


type SaveInsumoModalProps = {
    onSave: (i: ArticuloInsumo) => void;
    onHide: () => void;
    insumo: ArticuloInsumo | null;
    show: boolean;
};


const SaveInsumoModal: React.FC<SaveInsumoModalProps> = ({onSave, onHide, insumo, show}) => {
    //State
    const [validated, setValidated] = React.useState<boolean>(false);

    //Handlers
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;

        event.preventDefault();
        event.stopPropagation();

        if(form.checkValidity() === false){
            setValidated(true);

            return;
        }
        const data = Object.fromEntries(new FormData(form));
        onSave({...insumo!, ...data});
    };

    //Render
    return(
        <Modal show={show} onHide={onHide} >
            <Form noValidate onSubmit={handleSubmit} validated={validated}>
                <Modal.Header closeButton>
                    <Modal.Title>{insumo?.id == 0 ? 'Crear' : 'Editar'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                defaultValue={insumo?.denominacion}
                                name="denominacion"
                                placeholder='Denominacion'
                                required
                                type="text"
                            ></Form.Control>
                        </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                        <Form.Group as={Col}>
                            <Form.Label>Precio de compra</Form.Label>
                            <Form.Control
                                defaultValue = {insumo?.precioCompra}
                                name="precioCompra"
                                placeholder='Precio'
                                required
                                type='text'
                            ></Form.Control>
                        </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                        <Form.Group as={Col}>
                            <Form.Label>Stock Actual</Form.Label>
                            <Form.Control
                                defaultValue = {insumo?.stockActual}
                                name="stockActual"
                                placeholder='Stock actual'
                                required
                                type='text'
                            ></Form.Control>
                        </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                        <Form.Group as={Col}>
                            <Form.Label>Stock Minimo</Form.Label>
                            <Form.Control
                                defaultValue = {insumo?.stockMinimo}
                                name="stockMinimo"
                                placeholder='Stock minimo'
                                required
                                type='text'
                            ></Form.Control>
                        </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                        <Form.Group as={Col}>
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control
                                defaultValue = {insumo?.urlImagen}
                                name="urlImagen"
                                placeholder='url'
                                required
                                type='text'
                            ></Form.Control>
                        </Form.Group>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant = "secondary" onClick={onHide}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary">
                        Save
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default SaveInsumoModal;