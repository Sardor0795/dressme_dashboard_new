import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: "https://api.dressme.uz/api/seller", // Replace with your API base URL
});

let isRefreshing = false;
let refreshSubscribers = [];
// console.log(refreshSubscribers, 'refreshSubscribers');
// console.log(isRefreshing, 'isRefreshing');
async function refreshToken( ) {
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
            //  console.log("expired refresdh token", error?.response?.status);
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
        // console.log(error.response, error.response.status, 'error.response.status', !originalRequest._retry);
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
             if (!isRefreshing) {
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
