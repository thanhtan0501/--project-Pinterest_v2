import axios from "../utils/axios";

export const handleLoginService = (data) => {
    return axios.post("/v1/auth/login", data);
};
export const handleRegisterService = (data) => {
    return axios.post("/v1/auth/register", data);
};
