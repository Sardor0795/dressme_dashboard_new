import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
// import { dressMainData } from '../../hook/ContextTeam';
// const [dressInfo, setDressInfo] = useContext(dressMainData)

const axiosInstance = axios.create({
    baseURL: "https://api.dressme.uz/api/seller", // Replace with your API base URL
});

// const navigate = useNavigate()
// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Add headers, authentication tokens, or other modifications to the request
        const accessToken = localStorage.getItem('DressmeUserToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Do something with the response data
        return response;
    },
    (error) => {
        // Handle response error
        if (error.response && error.response.status === 401) {
            // Unauthorized (e.g., token expired)
            // Redirect to login or trigger a token refresh
            // setDressInfo({ ...dressInfo, IsAuthenticated: true })
            // const navigate = useNavigate();
            // navigate('/login');
            // localStorage.removeItem("DressmeUserToken")
            console.log('Token expired or invalid. Redirect to login.');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
