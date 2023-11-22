import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import * as React from 'react';
import Row from 'react-bootstrap/Row';

import UnidadMedida from '../../../../types/unidadMedida';


type SaveUnidadMedidaModalProps = {
    onSave: (i: UnidadMedida) => void;
    onHide: () => void;
    unidad: UnidadMedida | null;
    show: boolean;
};


const SaveUnidadMedidaModal: React.FC<SaveUnidadMedidaModalProps> = ({onSave, onHide, unidad, show}) => {
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
        onSave({...unidad!, ...data});
    };

    //Render
    return(
        <Modal show={show} onHide={onHide} >
            <Form noValidate onSubmit={handleSubmit} validated={validated}>
                <Modal.Header closeButton>
                    <Modal.Title>{unidad?.id == 0 ? 'Crear' : 'Editar'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Denominación</Form.Label>
                            <Form.Control 
                                defaultValue={unidad?.denominacion}
                                name="denominacion"
                                placeholder='Denominación'
                                required
                                type="text"
                            ></Form.Control>
                        </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                        <Form.Group as={Col}>
                            <Form.Label>Abreviatura</Form.Label>
                            <Form.Control
                                defaultValue = {unidad?.abreviatura}
                                name="abreviatura"
                                placeholder='Abreviatura'
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

export default SaveUnidadMedidaModal;