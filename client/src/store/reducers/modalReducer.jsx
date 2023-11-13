import actionTypes from "../actions/actionTypes";

const initialState = {
    login: false,
    register: false,
    editPin: false,
    deletePin: false,
    pin: {},
};

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.OPEN_MODAL_LOGIN_SUCCESS:
            state.login = action.isOpen;
            return {
                ...state,
            };
        case actionTypes.OPEN_MODAL_REGISTER_SUCCESS:
            state.register = action.isOpen;
            return {
                ...state,
            };
        case actionTypes.OPEN_MODAL_EDIT_PIN_FAILED:
            state.editPin = false;
            state.pin = {};
            return {
                ...state,
            };
        case actionTypes.OPEN_MODAL_EDIT_PIN_SUCCESS:
            state.editPin = true;
            state.pin = action.pin;
            return {
                ...state,
            };
        case actionTypes.OPEN_MODAL_DELETE_PIN_SUCCESS:
            state.deletePin = action.isOpen;
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default modalReducer;
