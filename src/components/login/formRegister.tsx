import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AuthService } from "../../services/authService";
import * as yup from "yup";

interface FormRegisterProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onRegister: (registerData: any) => void;
}

const FormRegister: React.FC<FormRegisterProps> = ({onRegister}) => {
    const navigate = useNavigate();
    const [show, setShow] = useState(true);

    const validationSchema = yup.object().shape({
        username: yup.string().required("Este campo es obligatorio"),
        password: yup.string().required("Este campo es obligatorio"),
        firstname: yup.string().required("El nombre es obligatorio"),
        lastname: yup.string().required("El apellido es obligatorio"),
        country: yup.string().required("El país es obligatorio"),
        
        auth0Id: yup.string().required("Este campo es obligatorio"),
        rol: yup.string().required("Este campo es obligatorio"),
    });


    

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            country: '',  
            auth0Id: 0,
            rol: '',
            
        },

        validationSchema: validationSchema,

        onSubmit: async (values) => {
            try {
                const token = await AuthService.register(values); //revisar esto
                console.log("Registro realizado. Token:", token);
                toast.success("Registro realizado");
                handleHide();
                window.localStorage.setItem('isLoggedIn', 'true');
                navigate("/");
                //onRegister(values);
                
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
                    
                    <Form.Group controlId="firstname">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            name="firstname"
                            type="text"
                            value={formik.values.firstname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={Boolean(formik.errors.firstname && formik.touched.firstname)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.firstname}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="lastname">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            name="lastname"
                            type="text"
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={Boolean(
                                formik.errors.lastname && formik.touched.lastname
                            )}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.lastname}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="country">
                        <Form.Label>Pais</Form.Label>
                        <Form.Control
                            name="country"
                            type="text"
                            value={formik.values.country}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={Boolean(formik.errors.country && formik.touched.country)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.country}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="auth0Id">
                        <Form.Label>Auth0</Form.Label>
                        <Form.Control
                            name="auth0Id"
                            type="number"
                            value={formik.values.auth0Id}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={Boolean(formik.errors.auth0Id && formik.touched.auth0Id)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.auth0Id}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="rol">
                        <Form.Label>Rol</Form.Label>
                        <Form.Control
                            name="rol"
                            type="text"
                            value={formik.values.rol}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={Boolean(formik.errors.rol && formik.touched.rol)}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.rol}
                        </Form.Control.Feedback>
                    </Form.Group>
                    

                    <Modal.Footer className="mt-4" id="contenedorBotonRegistrarse">
                        <Button variant="primary" type="submit" disabled={!formik.isValid} id="botonRegistrarse" onClick={onRegister}>
                            Registrarse
                        </Button>
                    </Modal.Footer>

                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default FormRegister;