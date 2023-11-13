import axios from "../utils/axios";

export const createNewPinService = (data) => {
    return axios.post("/v1/pin/create-pin", data);
};
export const fetchAllPinService = () => {
    return axios.get("/v1/pin/fetch-all-pin");
};
export const updatePinService = (data) => {
    return axios.put(`/v1/pin/update-pin`, data);
};
export const deletePinService = (pinId) => {
    return axios.delete(`/v1/pin/delete-pin`, {
        data: { id: pinId },
    });
};
export const savePinService = (pinId) => {
    return axios.put(`/v1/pin/${pinId}/save-pin`);
};

export const fetchPinByIdService = (pinId) => {
    return axios.get(`/v1/pin/fetch-pin-by-id?pinId=${pinId}`);
};
export const fetchPinBySearchService = (q, tags) => {
    return axios.get(`/v1/pin/fetch-pin-by-search/?`, {
        params: {
            q,
            tags,
        },
    });
};
export const fetchUserBySearchService = (q) => {
    return axios.get(`/v1/pin/fetch-user-by-search/?`, {
        params: {
            q,
        },
    });
};
export const fetchAllPinByUserCreateService = (userId) => {
    return axios.get(`/v1/pin/fetch-all-pin-by-user-create?userId=${userId}`);
};
export const fetchAllPinByUserSaveService = (userId) => {
    return axios.get(`/v1/pin/fetch-all-pin-by-user-save?userId=${userId}`);
};

// comment pin
export const likeCommentPinService = (commentId) => {
    return axios.put(`/v1/pin/${commentId}/like-comment-pin`);
};
export const deleteCommentPinService = (commentId) => {
    return axios.delete(`/v1/pin/delete-comment-pin`, {
        data: { commentId: commentId },
    });
};
export const commentPinService = (pinId, comment) => {
    return axios.post(`/v1/pin/${pinId}/comment-pin`, { comment });
};
export const fetchAllCommentPinService = (pinId) => {
    return axios.get(`/v1/pin/fetch-all-comment-pin?pinId=${pinId}`);
};
