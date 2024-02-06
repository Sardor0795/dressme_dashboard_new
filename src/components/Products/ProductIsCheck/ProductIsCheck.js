import React, { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import ProductsPageOne from '../AddingProductPageOne/ProductsPageOne'
import { dressMainData } from '../../../hook/ContextTeam'
import axios from 'axios'
const { REACT_APP_BASE_URL } = process.env;

export default function ProductIsCheck() {
    const [dressInfo, setDressInfo] = useContext(dressMainData);


    const fetchDataShop = async (customHeadersShop) => {
        try {
            const response = await axios.get(`${REACT_APP_BASE_URL}/shops`, {
                headers: customHeaders,
            });
            const status = response.status;
            const data = response.data;

            return { data, status };
        } catch (error) {
            const status = error.response ? error.response.status : null;
            return { error, status };
        }
    };

    const customHeadersShop = {
        'Content-type': 'application/json; charset=UTF-8',
        "Authorization": `Bearer ${localStorage.getItem("DressmeUserToken")}`,    // Add other headers as needed
    };
    useQuery(['seller_shops_list'], () => fetchDataShop(customHeadersShop), {
        onSuccess: (data) => {
            if (data?.status >= 200 && data?.status < 300) {
                setDressInfo({ ...dressInfo, shopsList: data?.data })
            }
            if (data?.status === 401) {

            }
        },
        onError: (error) => {
            if (error?.response?.status === 401) {

            }
        },
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });

    const fetchData = async (customHeaders) => {
        try {
            const response = await axios.get(`${REACT_APP_BASE_URL}/shops/locations/index`, {
                headers: customHeaders,
            });
            const status = response.status;
            const data = response.data;

            return { data, status };
        } catch (error) {
            const status = error.response ? error.response.status : null;
            return { error, status };
        }
    };

    const customHeaders = {
        'Content-type': 'application/json; charset=UTF-8',
        "Authorization": `Bearer ${localStorage.getItem("DressmeUserToken")}`,    // Add other headers as needed
    };
    useQuery(['seller_location_list'], () => fetchData(customHeaders), {
        onSuccess: (data) => {
            if (data?.status >= 200 && data?.status < 300) {
                setDressInfo({ ...dressInfo, locationList: data?.data })
            }
            if (data?.status === 401) {

            }
        },
        onError: (error) => {
            if (error?.response?.status === 401) {

            }
        },
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });


    return (
        <div>
            {
                dressInfo?.shopsList?.shops?.data?.length > 0
                    ?
                    dressInfo?.locationList?.locations_exist
                        ?
                        <ProductsPageOne />
                        :
                        <div className="flex items-center h-[100vh] justify-center">
                            <Link
                                to="/locations-store"
                                className="text-textBlueColor text-2xl not-italic font-AeonikProRegular hover:underline"
                            >
                                У вас пока нет локации !
                            </Link>
                        </div >
                    :
                    <div className="flex items-center h-[100vh] justify-center">
                        <Link
                            to="/store"
                            className="text-textBlueColor text-2xl not-italic font-AeonikProRegular hover:underline"
                        >
                            Сначала создайте магазин!
                        </Link>
                    </div >
            }
        </div >
    )
}
