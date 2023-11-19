import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import * as React from 'react';
import Row from 'react-bootstrap/Row';

import Persona from '../../../../types/persona';

type SavePersonaModalProps = {
  onHide: () => void;
  onSave: (p: Persona) => void;
  persona: Persona | null;
  show: boolean;
};

const SavePersonaModal: React.FC<SavePersonaModalProps> = ({ onSave, onHide, persona, show }) => {
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
    onSave({ ...persona!, ...data });
  };

  // Render
  return (
    <Modal show={show} onHide={onHide}>
      <Form noValidate onSubmit={handleSubmit} validated={validated}>
        <Modal.Header closeButton>
          <Modal.Title>{persona?.id === 0 ? 'Create' : 'Edit'} Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                defaultValue={persona?.nombre}
                name="nombre"
                placeholder="Nombre"
                required
                type="text"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                defaultValue={persona?.apellido}
                name="apellido"
                placeholder="Apellido"
                required
                type="text"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Direccion de correo</Form.Label>
              <Form.Control
                defaultValue={persona?.email}
                name="email"
                placeholder="E-mail"
                required
                type="text"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                defaultValue={persona?.telefono}
                name="telefono"
                placeholder="Telefono"
                required
                type="number"
              />
            </Form.Group>
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

export default SavePersonaModal;