import actionTypes from "./actionTypes";

export const openModalLoginSuccess = (isOpen) => ({
    type: actionTypes.OPEN_MODAL_LOGIN_SUCCESS,
    isOpen: isOpen,
});
export const openModalRegisterSuccess = (isOpen) => ({
    type: actionTypes.OPEN_MODAL_REGISTER_SUCCESS,
    isOpen: isOpen,
});
export const openModalEditPinSuccess = (pin) => ({
    type: actionTypes.OPEN_MODAL_EDIT_PIN_SUCCESS,
    pin: pin,
});
export const openModalEditPinFailed = () => ({
    type: actionTypes.OPEN_MODAL_EDIT_PIN_FAILED,
});
export const openModalDeletePinSuccess = (isOpen) => ({
    type: actionTypes.OPEN_MODAL_DELETE_PIN_SUCCESS,
    isOpen: isOpen,
});
