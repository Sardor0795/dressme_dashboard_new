// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// // import { useContext } from 'react';
// // import { dressMainData } from '../../hook/ContextTeam';
// // const [dressInfo, setDressInfo] = useContext(dressMainData)

// const axiosInstance = axios.create({
//     baseURL: "https://api.dressme.uz/api/seller", // Replace with your API base URL
// });

// // const navigate = useNavigate()
// // Request interceptor
// axiosInstance.interceptors.request.use(
//     (config) => {
//         // Add headers, authentication tokens, or other modifications to the request
//         const accessToken = localStorage.getItem('DressmeUserToken');
//         if (accessToken) {
//             config.headers.Authorization = `Bearer ${accessToken}`;
//         }
//         return config;
//     },
//     (error) => {
//         // Handle request error
//         return Promise.reject(error);
//     }
// );

// // Response interceptor
// axiosInstance.interceptors.response.use(
//     (response) => {
//         // Do something with the response data
//         return response;
//     },
//     (error) => {
//         // Handle response error
//         if (error.response && error.response.status === 401) {
//             // Unauthorized (e.g., token expired)
//             // Redirect to login or trigger a token refresh
//             // setDressInfo({ ...dressInfo, IsAuthenticated: true })
//             // const navigate = useNavigate();
//             // navigate('/login');
//             // localStorage.removeItem("DressmeUserToken")
//             console.log('Token expired or invalid. Redirect to login.');
//         }
//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: "https://api.dressme.uz/api/seller", // Replace with your API base URL
});

let isRefreshing = false;
let refreshSubscribers = [];
console.log(refreshSubscribers, 'refreshSubscribers');
console.log(isRefreshing, 'isRefreshing');
async function refreshToken(navigate) {
    try {
        const headers = {
            'Content-type': 'application/json; charset=UTF-8',
            "Authorization": `Bearer ${localStorage.getItem("RefreshUserToken")}`,
        };
        const data = {
            refresh_token: localStorage.getItem("RefreshUserToken"),
        };
        const response = await axios.post(`https://api.dressme.uz/api/seller/refresh-token`, data, { headers });
        if (response?.status >= 200 && response?.status < 300) {
            localStorage.setItem("DressmeUserToken", response?.data?.access_token);
        }
    } catch (error) {
        if (error?.response?.status === 401 || error?.response?.status === 403) {
            localStorage.removeItem("DressmeUserToken");
            // const navigate = useNavigate();
             console.log("expired refresdh token", error?.response?.status);
        }
    }
}

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('DressmeUserToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
 
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        console.log(error.response, error.response.status, 'error.response.status', !originalRequest._retry);
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
             if (!isRefreshing) {
                console.log("refreshToken");
                isRefreshing = true;
                await refreshToken( );
                isRefreshing = false;
            }
            return new Promise((resolve, reject) => {
                refreshSubscribers.push(() => {
                    resolve(axiosInstance(originalRequest));
                });
            });
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
