import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductsPageOne from '../AddingProductPageOne/ProductsPageOne'
import { dressMainData } from '../../../hook/ContextTeam'
import axios from 'axios'
import LoadingForSeller from '../../Loading/LoadingFor'
import { HelperData } from '../../../hook/HelperDataStore'
const { REACT_APP_BASE_URL } = process.env;

export default function ProductIsCheck() {
    const [dressInfo, setDressInfo] = useContext(dressMainData);
    const [loading, setLoading] = useState(true);
    const [helperDatainform, setHelperDatainform] = useContext(HelperData);


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
                    setHelperDatainform({ ...helperDatainform, shopsList: data?.data })

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
        if (!helperDatainform?.shopsList) {
            fetchDataShop();
        }
        if (!dressInfo?.locationList) {
            fetchDataLocations();
        }
    }, []);
    return (
        <div>
            {

                helperDatainform?.shopsList?.shops?.length > 0
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
