import actionTypes from "./actionTypes";
import * as services from "../../services";

// Create
export const createNewPin = (dataPin) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.START_LOADING,
                name: "createPinLoading",
            });
            const { data } = await services.createNewPinService(dataPin);
            if (data && data.errorCode === 0) {
                dispatch({
                    type: actionTypes.CREATE_NEW_PIN_SUCCESS,
                });
            } else {
                dispatch({
                    type: actionTypes.CREATE_NEW_PIN_FAILED,
                });
            }
            dispatch({
                type: actionTypes.END_LOADING,
                name: "createPinLoading",
            });
        } catch (error) {
            dispatch({
                type: actionTypes.CREATE_NEW_PIN_FAILED,
            });
            dispatch({
                type: actionTypes.END_LOADING,
                name: "createPinLoading",
            });

            console.log("Create pin error: ", error);
        }
    };
};
// Read
export const fetchAllPin = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.START_LOADING,
                name: "fetchPinLoading",
                data: [],
            });
            const { data } = await services.fetchAllPinService();
            if (data && data.errorCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_PIN_SUCCESS,
                    data: data.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_PIN_FAILED,
                });
            }
            dispatch({
                type: actionTypes.END_LOADING,
                name: "fetchPinLoading",
            });
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_ALL_PIN_FAILED,
            });
            dispatch({
                type: actionTypes.END_LOADING,
                name: "fetchPinLoading",
            });

            console.log("Fetch pins error: ", error);
        }
    };
};
// Edit
export const updatePin = (dataForm) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.START_LOADING,
                name: "updatePinLoading",
            });
            const { data } = await services.updatePinService(dataForm);
            if (data && data.errorCode === 0) {
                dispatch({
                    type: actionTypes.UPDATE_PIN_SUCCESS,
                    data: data.data,
                });
            } else {
                dispatch({
                    type: actionTypes.UPDATE_PIN_FAILED,
                });
            }
            dispatch({
                type: actionTypes.END_LOADING,
                name: "updatePinLoading",
            });
        } catch (error) {
            dispatch({
                type: actionTypes.UPDATE_PIN_FAILED,
            });
            dispatch({
                type: actionTypes.END_LOADING,
                name: "updatePinLoading",
            });

            console.log("Update pins error: ", error);
        }
    };
};
// Delete
export const deletePin = (pinId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.START_LOADING,
                name: "deletePinLoading",
                id: pinId,
            });
            const { data } = await services.deletePinService(pinId);
            if (data && data.errorCode === 0) {
                dispatch({
                    type: actionTypes.DELETE_PIN_SUCCESS,
                    id: pinId,
                });
            } else {
                dispatch({
                    type: actionTypes.DELETE_PIN_FAILED,
                });
            }
            dispatch({
                type: actionTypes.END_LOADING,
                name: "deletePinLoading",
                id: pinId,
            });
        } catch (error) {
            dispatch({
                type: actionTypes.DELETE_PIN_FAILED,
            });
            dispatch({
                type: actionTypes.END_LOADING,
                name: "deletePinLoading",
                id: pinId,
            });

            console.log("Delete pins error: ", error);
        }
    };
};

// Save Pin
export const savePin = (pinId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.START_LOADING,
                name: "savePinLoading",
                id: pinId,
            });
            const { data } = await services.savePinService(pinId);
            if (data && data.errorCode === 0) {
                dispatch({
                    type: actionTypes.SAVE_PIN_SUCCESS,
                    data: data.data,
                });
            } else {
                dispatch({
                    type: actionTypes.SAVE_PIN_FAILED,
                });
            }
            dispatch({
                type: actionTypes.END_LOADING,
                name: "savePinLoading",
                id: pinId,
            });
        } catch (error) {
            dispatch({
                type: actionTypes.SAVE_PIN_FAILED,
            });
            dispatch({
                type: actionTypes.END_LOADING,
                name: "savePinLoading",
                id: pinId,
            });

            console.log("Save pins error: ", error);
        }
    };
};

// Like comment
export const likeComment = (commentId) => {
    return async (dispatch, getState) => {
        try {
            const { data } = await services.likeCommentPinService(commentId);
            if (data && data.errorCode === 0) {
                dispatch({
                    type: actionTypes.LIKE_COMMENT_SUCCESS,
                    data: data.data,
                });
            } else {
                dispatch({
                    type: actionTypes.LIKE_COMMENT_FAILED,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.LIKE_COMMENT_FAILED,
            });

            console.log("Save pins error: ", error);
        }
    };
};
// Delete comment
export const deleteComment = (commentId) => {
    return async (dispatch, getState) => {
        try {
            console.log(commentId);
            const { data } = await services.deleteCommentPinService(commentId);

            console.log("check data delete comment: ", data.data);

            if (data && data.errorCode === 0) {
                dispatch({
                    type: actionTypes.DELETE_COMMENT_SUCCESS,
                    id: commentId,
                });
            } else {
                dispatch({
                    type: actionTypes.DELETE_COMMENT_FAILED,
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.DELETE_COMMENT_FAILED,
            });

            console.log("Save pins error: ", error);
        }
    };
};
// Comment Pin
export const commentPin = (pinId, comment) => {
    return async (dispatch, getState) => {
        try {
            // dispatch({
            //     type: actionTypes.START_LOADING,
            //     name: "savePinLoading",
            //     id: pinId,
            // });
            const { data } = await services.commentPinService(pinId, comment);
            console.log(data);
            if (data && data.errorCode === 0) {
                dispatch({
                    type: actionTypes.COMMENT_PIN_SUCCESS,
                    data: data.data,
                });
            } else {
                dispatch({
                    type: actionTypes.COMMENT_PIN_FAILED,
                });
            }
            dispatch({
                type: actionTypes.END_LOADING,
                name: "savePinLoading",
                id: pinId,
            });
        } catch (error) {
            dispatch({
                type: actionTypes.COMMENT_PIN_FAILED,
            });
            // dispatch({
            //     type: actionTypes.END_LOADING,
            //     name: "savePinLoading",
            //     id: pinId,
            // });

            console.log("Save pins error: ", error);
        }
    };
};

// Fetch comment
export const fetchAllCommentPin = (pinId) => {
    return async (dispatch, getState) => {
        try {
            // dispatch({
            //     type: actionTypes.START_LOADING,
            //     name: "fetchPinLoading",
            //     pinId: pinId,
            // });
            const { data } = await services.fetchAllCommentPinService(pinId);
            if (data && data.errorCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_COMMENT_PIN_SUCCESS,
                    data: data.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_COMMENT_PIN_FAILED,
                });
            }
            // dispatch({
            //     type: actionTypes.END_LOADING,
            //     name: "fetchPinLoading",
            //     pinId: pinId,
            // });
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_COMMENT_PIN_FAILED,
            });
            // dispatch({
            //     type: actionTypes.END_LOADING,
            //     name: "fetchPinLoading",
            //     pinId: pinId,
            // });

            console.log("Fetch comments pin error: ", error);
        }
    };
};

// Follow User
export const followUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.START_LOADING,
                name: "followPinLoading",
                id: userId,
            });
            const { data } = await services.followUserService(userId);

            if (data && data.errorCode === 0) {
                dispatch({
                    type: actionTypes.FOLLOW_USER_SUCCESS,
                    data: data.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FOLLOW_USER_FAILED,
                });
            }
            dispatch({
                type: actionTypes.END_LOADING,
                name: "followPinLoading",
                id: userId,
            });
        } catch (error) {
            dispatch({
                type: actionTypes.FOLLOW_USER_FAILED,
            });
            dispatch({
                type: actionTypes.END_LOADING,
                name: "followPinLoading",
                id: userId,
            });

            console.log("Save pins error: ", error);
        }
    };
};

// Fetch pins create by user
export const fetchAllPinByUserCreate = (userId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.START_LOADING,
                name: "fetchPinLoading",
                data: [],
            });
            const { data } = await services.fetchAllPinByUserCreateService(
                userId
            );
            if (data && data.errorCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_PIN_BY_USER_CREATE_SUCCESS,
                    data: data.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_PIN_BY_USER_CREATE_FAILED,
                });
            }
            dispatch({
                type: actionTypes.END_LOADING,
                name: "fetchPinLoading",
            });
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_ALL_PIN_BY_USER_CREATE_FAILED,
            });
            dispatch({
                type: actionTypes.END_LOADING,
                name: "fetchPinLoading",
            });

            console.log("Delete pins error: ", error);
        }
    };
};
// Fetch pins save by user
export const fetchAllPinBySaveCreate = (userId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.START_LOADING,
                name: "fetchPinLoading",
                data: [],
            });
            const { data } = await services.fetchAllPinByUserSaveService(
                userId
            );
            if (data && data.errorCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_PIN_BY_USER_CREATE_SUCCESS,
                    data: data.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_PIN_BY_USER_CREATE_FAILED,
                });
            }
            dispatch({
                type: actionTypes.END_LOADING,
                name: "fetchPinLoading",
            });
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_ALL_PIN_BY_USER_CREATE_FAILED,
            });
            dispatch({
                type: actionTypes.END_LOADING,
                name: "fetchPinLoading",
            });

            console.log("Delete pins error: ", error);
        }
    };
};
// Fetch pins by search
export const fetchPinBySearch = (searchQuery, tags) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.START_LOADING,
                name: "fetchPinLoading",
                data: [],
            });
            console.log(searchQuery, tags);
            const { data } = await services.fetchPinBySearchService(
                searchQuery,
                tags
            );
            if (data && data.errorCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_PIN_BY_SEARCH_SUCCESS,
                    data: data.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_PIN_BY_SEARCH_FAILED,
                });
            }
            dispatch({
                type: actionTypes.END_LOADING,
                name: "fetchPinLoading",
            });
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_ALL_PIN_BY_SEARCH_FAILED,
            });
            dispatch({
                type: actionTypes.END_LOADING,
                name: "fetchPinLoading",
            });

            console.log("Delete pins error: ", error);
        }
    };
};

// Fetch pin by ID
export const fetchPinById = (pinId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.START_LOADING,
                name: "fetchPinIdLoading",
                pinId: pinId,
            });
            const { data } = await services.fetchPinByIdService(pinId);
            if (data && data.errorCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_PIN_BY_ID_SUCCESS,
                    data: data.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_PIN_BY_ID_FAILED,
                });
            }
            dispatch({
                type: actionTypes.END_LOADING,
                name: "fetchPinIdLoading",
                pinId: pinId,
            });
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_PIN_BY_ID_FAILED,
            });
            dispatch({
                type: actionTypes.END_LOADING,
                name: "fetchPinIdLoading",
                pinId: pinId,
            });

            console.log("Fetch user error: ", error);
        }
    };
};

// Fetch user by ID
export const fetchUserById = (userId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.START_LOADING,
                name: "fetchUserLoading",
            });
            const { data } = await services.fetchUserByIdService(userId);
            if (data && data.errorCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_USER_BY_ID_SUCCESS,
                    data: data.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_USER_BY_ID_FAILED,
                });
            }
            dispatch({
                type: actionTypes.END_LOADING,
                name: "fetchUserLoading",
            });
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_USER_BY_ID_FAILED,
            });
            dispatch({
                type: actionTypes.END_LOADING,
                name: "fetchUserLoading",
            });

            console.log("Fetch user error: ", error);
        }
    };
};
