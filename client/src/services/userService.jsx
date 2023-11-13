import axios from "../utils/axios";

export const followUserService = (userId) => {
    return axios.put(`/v1/user/${userId}/follow-user`);
};
export const fetchUserByIdService = (userId) => {
    return axios.get(`/v1/user/fetch-user-by-id?userId=${userId}`);
};
