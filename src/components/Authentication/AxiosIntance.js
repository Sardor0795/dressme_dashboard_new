import axios from 'axios';
import { Navigate } from 'react-router-dom';


// Creating an Axios instance with the base URL for the API
const axiosInstance = axios.create({
    baseURL: "https://api.dressme.uz/api/seller", // Replace with your API base URL
});
// Flag to keep track of the token refresh process
let isRefreshing = false;
// Array to store refresh subscribers (callbacks)
let refreshSubscribers = [];


// Function to refresh the access token
async function refreshToken() {
    try {
        // Prepare headers for the request
        const headers = {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("RefreshUserToken")}`,
        };
        // Prepare data for the request
        const data = {
            refresh_token: localStorage.getItem("RefreshUserToken"),
        };
        // Send request to refresh the access token
        const response = await axios.post(`https://api.dressme.uz/api/seller/refresh-token`, data, { headers });
        if (response?.status >= 200 && response?.status < 300) {
            // Update local storage with the new access token
            localStorage.setItem("DressmeUserToken", response?.data?.access_token);
            // Resolve all refresh subscribers with the new access token
            refreshSubscribers.forEach(callback => callback(response.data.access_token));
            // Clear refresh subscribers
            refreshSubscribers = [];

            return response.data.access_token;
        }
    } catch (error) {
        if (error?.response?.status === 401 || error?.response?.status === 403) {
            // Remove the access token from local storage
            localStorage.removeItem("DressmeUserToken");
            // Navigate to the login page and reload the app
            <Navigate to="/login-seller" replace />;
            if (localStorage?.getItem("DressmeUserToken")) {
                window.location.reload();
            }
        }
        // Propagate the error for further handling
        throw error;
    }
}
// Configure Axios to add the access token to the request headers
axiosInstance.interceptors.request.use(
    (config) => {
        // Get the access token from local storage
        const accessToken = localStorage.getItem('DressmeUserToken');
        if (accessToken) {
            // Add the access token to the request headers
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
         if (error.response && error.response.status === 401 && !originalRequest._retry) {
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const accessToken = await refreshToken();
                    // Update the request headers with the new access token
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    // Retry the original request
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }
            // If the token refresh process is already in progress, queue the original request
            return new Promise((resolve, reject) => {
                refreshSubscribers.push((accessToken) => {
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    resolve(axiosInstance(originalRequest));
                });
            });
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;
 //         if (error.response && error.response.status === 401 && !originalRequest._retry) {
//             if (!isRefreshing) {
//                 isRefreshing = true;
//                 try {
//                     const accessToken = await refreshToken();
//                     // Update the request headers with the new access token
//                     originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//                     // Retry the original request
//                     return axiosInstance(originalRequest);
//                 } catch (refreshError) {
//                     return Promise.reject(refreshError);
//                 } finally {
//                     isRefreshing = false;
//                 }
//             }
//             // If the token refresh process is already in progress, queue the original request
//             return new Promise((resolve, reject) => {
//                 refreshSubscribers.push((accessToken) => {
//                     originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//                     resolve(axiosInstance(originalRequest));
//                 });
//             });
//         }
//         return Promise.reject(error);
//     }
// );