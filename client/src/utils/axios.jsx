import axios from "axios";

const httpRequest = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
    credentials: "include",
});

httpRequest.defaults.withCredentials = true;

// httpRequest.interceptors.response.use(
//     (response) => {
//         return response.data;
//     },
//     function (error) {
//         const status = error.response?.status || 500;
//         switch (status) {
//             // authentication (token related issues)
//             case 401: {
//                 // toast.error("Unauthorized the user.Please Login...");
//                 return Promise.reject(error);
//             }

//             // forbidden (permission related issues)
//             case 403: {
//                 // toast.error(
//                 //     `You don't have permission to access this resource..`
//                 // );
//                 return Promise.reject(error);
//             }

//             // bad request
//             case 400: {
//                 return Promise.reject(error);
//             }

//             // not found
//             case 404: {
//                 return Promise.reject(error);
//             }

//             // conflict
//             case 409: {
//                 return Promise.reject(error);
//             }

//             // unprocessable
//             case 422: {
//                 return Promise.reject(error);
//             }

//             // generic api error (server related) unexpected
//             default: {
//                 return Promise.reject(error);
//             }
//         }
//     }
// );

export default httpRequest;
