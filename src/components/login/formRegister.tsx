import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthService } from "../../services/authService";
import * as yup from "yup";

const FormRegister: React.FC = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(true);

    const validationSchema = yup.object().shape({
        username: yup.string().required("Este campo es obligatorio"),
        password: yup.string().required("Este campo es obligatorio"),
        nombre: yup.string().required("El nombre es obligatorio"),
        apellido: yup.string().required("El apellido es obligatorio"),
        pais: yup.string().required("El país es obligatorio")
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            nombre: '',
            apellido: '',
            pais: '',          
        },

        validationSchema: validationSchema,

        onSubmit: async (values) => {
            try {
                const token = await AuthService.register(values);
                console.log("Registro realizado. Token:", token);
                toast.success("Registro realizado");
                handleHide();
                navigate("/");
            } catch (error) {
                toast.error('Revise los datos ingresados');
                console.error("Error al registrarse");
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
                    <Form.Group controlId="nombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            name="firstname"
                            type="text"
                            value={formik.values.nombre}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={Boolean(formik.errors.nombre && formik.touched.nombre)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.nombre}
                        </Form.Control.Feedback>
                    </Form.Group>

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
                            )}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="apellido">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            name="apellido"
                            type="text"
                            value={formik.values.apellido}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={Boolean(
                                formik.errors.apellido && formik.touched.apellido
                            )}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.apellido}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="pais">
                        <Form.Label>Pais</Form.Label>
                        <Form.Control
                            name="pais"
                            type="text"
                            value={formik.values.pais}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={Boolean(formik.errors.pais && formik.touched.pais)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.pais}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Modal.Footer className="mt-4" id="contenedorBotonRegistrarse">
                        <Button variant="primary" type="submit" disabled={!formik.isValid} id="botonRegistrarse">
                            Registrarse
                        </Button>
                    </Modal.Footer>

                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default FormRegister;