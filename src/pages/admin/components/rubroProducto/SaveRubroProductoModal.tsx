import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import * as React from 'react';
import Row from 'react-bootstrap/Row';

import RubroProducto from '../../../../types/rubroProducto';

type SaveRubroProductoModalProps = {
  onHide: () => void;
  onSave: (p: RubroProducto) => void;
  rubroProducto: RubroProducto | null;
  show: boolean;
};

const SaveRubroProductoModal: React.FC<SaveRubroProductoModalProps> = ({ onSave, onHide, rubroProducto, show }) => {
  // State
  const [validated, setValidated] = React.useState<boolean>(false);

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
    onSave({ ...rubroProducto!, ...data });
  };

  // Render
  return (
    <Modal show={show} onHide={onHide}>
      <Form noValidate onSubmit={handleSubmit} validated={validated}>
        <Modal.Header closeButton>
          <Modal.Title>{rubroProducto?.id === 0 ? 'Crear' : 'Editar'} Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Denominación</Form.Label>
              <Form.Control
                defaultValue={rubroProducto?.denominacion}
                name="denominacion" // Corregido de "nombre" a "denominacion"
                placeholder="Nombre"
                required
                type="text"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            {/* Puedes agregar más campos aquí si es necesario */}
          </Row>
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

export default SaveRubroProductoModal;
