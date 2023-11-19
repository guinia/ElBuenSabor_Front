import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button, Modal } from "react-bootstrap";
import { AuthService } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const FormLogin: React.FC = () => {

    const navigate = useNavigate();
    const [show, setShow] = useState(true);

    // YUP - Esquema de validación
    const validationSchema = Yup.object({
        username: Yup.string().required("El nombre de usuario es requerido"),
        password: Yup.string().required("La contraseña es requerida"),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },

        validationSchema: validationSchema,

        onSubmit: async (values) => {
        try {
            const token = await AuthService.login(values);
            console.log("Inicio de sesión exitoso. Token:", token);
            navigate('/');
            toast.success('Inicio de sesión exitoso');
            } catch (error) {
            console.error("Error al iniciar sesión:");
            toast.error('Revisá los datos ingresados');
            // Puedes mostrar un mensaje de error al usuario o realizar otras acciones según tus necesidades.
            }
        },
    });

    const handleHide = () => {
        setShow(false);
    };

    return (
        <Modal
            show={show}
            onHide={handleHide}
            centered
            backdrop="static"
            className="modal-xl"
        >
            <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit} id="contenedorCamposFormulario">
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        name="username"  
                        type="text"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={Boolean(
                            formik.errors.username && formik.touched.username
                        )}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.username}
                    </Form.Control.Feedback>
                </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            name="password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={Boolean(
                                formik.errors.password && formik.touched.password
                            )} />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Modal.Footer className="mt-4" id="contenedorBotonRegistrarse">
                        <Button variant="primary" type="submit" disabled={!formik.isValid} id="botonRegistrarse">
                            Iniciar sesion
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
        );
};

export default FormLogin;