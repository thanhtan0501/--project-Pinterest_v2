import actionTypes from "../actions/actionTypes";

const initialState = {
    createPinLoading: false,
    fetchPinLoading: false,
    fetchPinIdLoading: false,
    deletePinLoading: false,
    updatePinLoading: false,
    savePinLoading: false,
    pinsData: [],
    pinData: {},
    userData: {},
    comments: [],
    pinId: null,
};

const pinReducer = (state = initialState, action) => {
    switch (action.type) {
        // Loading
        case actionTypes.START_LOADING:
            state[action.name] = true;
            state.pinId = action.id;
            if (action.data) state.pinsData = action.data;
            return {
                ...state,
            };
        case actionTypes.END_LOADING:
            state[action.name] = false;
            state.pinId = null;

            return {
                ...state,
            };

        // Pin
        case actionTypes.CREATE_NEW_PIN_SUCCESS:
            return {
                ...state,
                // pinsData: [...state.pinsData, action.data],
            };
        case actionTypes.CREATE_NEW_PIN_FAILED:
            return {
                ...state,
            };

        case actionTypes.FETCH_ALL_PIN_BY_USER_SAVE_SUCCESS:
        case actionTypes.FETCH_ALL_PIN_BY_USER_CREATE_SUCCESS:
        case actionTypes.FETCH_ALL_PIN_SUCCESS:
            state.pinsData = action.data;
            return {
                ...state,
            };

        case actionTypes.FETCH_USER_BY_ID_SUCCESS:
            state.userData = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_PIN_BY_ID_SUCCESS:
            state.pinData = action.data;
            return {
                ...state,
            };

        case actionTypes.FETCH_PIN_BY_ID_FAILED:
            state.pinData = {};
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_PIN_FAILED:
        case actionTypes.FETCH_ALL_PIN_BY_USER_SAVE_FAILED:
        case actionTypes.FETCH_ALL_PIN_BY_USER_CREATE_FAILED:
        case actionTypes.UPDATE_PIN_FAILED:
        case actionTypes.DELETE_PIN_FAILED:
            state.pinsData = [];
            return {
                ...state,
            };

        case actionTypes.DELETE_PIN_SUCCESS:
            state.pinsData = state.pinsData.filter(
                (pin) => pin._id !== action.id
            );
            return {
                ...state,
            };
        case actionTypes.UPDATE_PIN_SUCCESS:
            state.pinsData = state.pinsData.map((pin) =>
                pin._id === action.data._id ? action.data : pin
            );
            state.pinData = { ...action.data };
            return {
                ...state,
            };

        case actionTypes.SAVE_PIN_SUCCESS:
            state.pinsData = state.pinsData.map((pin) =>
                pin._id === action.data._id ? action.data : pin
            );
            return {
                ...state,
            };

        // Comment
        case actionTypes.DELETE_COMMENT_SUCCESS:
            state.comments = state.comments.filter(
                (cmt) => cmt._id !== action.id
            );
            return {
                ...state,
            };

        case actionTypes.LIKE_COMMENT_SUCCESS:
            state.comments = state.comments.map((cmt) =>
                cmt._id === action.data?._id ? action.data : cmt
            );
            return {
                ...state,
            };

        case actionTypes.COMMENT_PIN_SUCCESS:
            state.comments = action.data;
            return {
                ...state,
            };

        case actionTypes.FETCH_COMMENT_PIN_SUCCESS:
            // state.comments = state.comments.map((cmt) =>
            //     cmt._id === action.data._id ? action.data : cmt
            // );
            state.comments = action.data;
            return {
                ...state,
            };

        // Follow
        case actionTypes.FOLLOW_USER_SUCCESS:
            return {
                ...state,
                userData: { ...action.data },
            };

        // Search
        case actionTypes.FETCH_ALL_PIN_BY_SEARCH_SUCCESS:
            state.pinsData = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_PIN_BY_SEARCH_FAILED:
            state.pinsData = [];
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default pinReducer;
