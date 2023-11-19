import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import * as React from 'react';
import Row from 'react-bootstrap/Row';

import RubroArticuloInsumo from '../../../../types/rubroArticuloInsumo';

type SaveRubroInsumoModalProps = {
  onHide: () => void;
  onSave: (r: RubroArticuloInsumo) => void;
  rubro: RubroArticuloInsumo | null;
  show: boolean;
};

const SaveRubroInsumoModal: React.FC<SaveRubroInsumoModalProps> = ({onSave, onHide, rubro, show}) => {
  // State
  const [validated, setValidated] = React.useState<boolean>(false);
  //const [denominacion, setDenominacion] = React.useState<string>(rubro?.denominacion || ''); 
  //const [rubroPadre, setRubroPadre] = React.useState<string>(rubro?.rubroPadre || ''); 
  // Handlers
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    onSave({ ...rubro!, ...data});
  };

  // Render
  return (
    <Modal show={show} onHide={onHide}>
      <Form noValidate onSubmit={handleSubmit} validated={validated}>
        <Modal.Header closeButton>
          <Modal.Title>{rubro?.id === 0 ? 'Crear' : 'Editar'}Rubro Artículo Insumo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Denominación</Form.Label>
              <Form.Control
                defaultValue={rubro?.denominacion}
                name="denominacion"
                placeholder="Denominación"
                required
                type="text"
              />
            </Form.Group>
          </Row>
          {/* <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Rubro Padre</Form.Label>
              <Form.Control
                defaultValue={rubro?.rubroPadre}
                name="rubroPadre"
                placeholder="Rubro Padre"
                type="text"
              />
            </Form.Group>
          </Row> */}
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cerrar
          </Button>
          <Button type="submit" variant="primary">
            Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SaveRubroInsumoModal;