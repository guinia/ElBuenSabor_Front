import { Button } from "react-bootstrap";
import FormLogin from "./formLogin";
import { useState } from "react";
import { ModalType } from "../../types/modalType";
import FormRegister from "./formRegister";

const registerLoginButtons = () => {
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [showFormRegister, setShowFormRegister] = useState(false);
    const [showFormLogin, setShowFormLogin] = useState(false);

    const handleClick = (modal: ModalType) => {
        setModalType(modal);

        if (modal === ModalType.CREATE) {
            setShowFormRegister(true);
        } else if (modal === ModalType.LOGIN) {
            setShowFormLogin(true);
        }
    };

    const handleCloseFormRegister = () => {
        setShowFormRegister(false);
    };

    const handleCloseFormLogin = () => {
        setShowFormLogin(false);
    };

    return (
        <>
            <div id="contenedorBotonesLogInRegisterHeader">
                <Button
                    onClick={() => handleClick(ModalType.CREATE)}
                    className="buttonIngresar">
                    Registrarse
                </Button>
                <Button
                    onClick={() => handleClick(ModalType.LOGIN)}
                    className="buttonIngresar">
                    Ingresar
                </Button>
            </div>

            {showFormRegister && (
                <FormRegister
                    show={showFormRegister} 
                    onHide={handleCloseFormRegister}
                    modalType = {modalType}
                />
            )}

            {showFormLogin && (
                <FormLogin
                    show={showFormLogin}
                    onHide={handleCloseFormLogin}
                    modalType={modalType}
                />
            )}
        </>
    )
}

export default registerLoginButtons;
