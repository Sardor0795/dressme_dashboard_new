import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import ProductsPageOne from '../AddingProductPageOne/ProductsPageOne'
import { dressMainData } from '../../../hook/ContextTeam'
import axios from 'axios'
import LoadingForSeller from '../../Loading/LoadingFor'
const { REACT_APP_BASE_URL } = process.env;

export default function ProductIsCheck() {
    const [dressInfo, setDressInfo] = useContext(dressMainData);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchDataShop = async () => {
            try {
                setLoading(true)
                const data = await axios.get(`${REACT_APP_BASE_URL}/shops`, {
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        "Authorization": `Bearer ${localStorage.getItem("DressmeUserToken")}`,
                    }
                });
                if (data?.status >= 200 && data?.status < 300) {
                    setDressInfo({ ...dressInfo, shopsList: data?.data })

                }
                setLoading(false)

            } catch (error) {

            }
        };
        const fetchDataLocations = async () => {
            try {
                const data = await axios.get(`${REACT_APP_BASE_URL}/shops/locations/index`, {
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        "Authorization": `Bearer ${localStorage.getItem("DressmeUserToken")}`,
                    }
                });
                if (data?.status >= 200 && data?.status < 300) {
                    setDressInfo({ ...dressInfo, locationList: data?.data?.locations })
                }
            } catch (error) {

            }
        };
        if (!dressInfo?.shopsList?.shops) {
            fetchDataShop();
        }
        if (!dressInfo?.locationList?.data) {
            fetchDataLocations();
        }
    }, []);
    return (
        <div>
            {loading ?
                <LoadingForSeller />
                :
                dressInfo?.shopsList?.shops?.length > 0
                    ?
                    dressInfo?.locationList?.length > 0
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
