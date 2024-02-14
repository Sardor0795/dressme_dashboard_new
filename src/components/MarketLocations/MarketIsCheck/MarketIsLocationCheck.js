import React, { useContext, useEffect } from 'react'
import LocationList from '../Locations/LocationList/LocationList'
import NoLocations from '../NoLocations/NoLocations'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import LoadingForSeller from '../../Loading/LoadingFor'
import { useHttp } from '../../../hook/useHttp'
import axios from 'axios'
import { dressMainData } from '../../../hook/ContextTeam'
import { SellerRefresh } from '../../../hook/SellerRefreshToken'
import { SellerMainData } from '../../../hook/SellerUserContext'
const { REACT_APP_BASE_URL } = process.env;

export default function MarketIsLocationCheck() {
    const [dressInfo, setDressInfo] = useContext(dressMainData);
    const [sellerRefreshToken] = useContext(SellerRefresh)
    const [sellerInformation, setSellerInformation] = useContext(SellerMainData);

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
    useQuery(['seller_location_list1'], () => fetchData(customHeaders), {
        onSuccess: (data) => {
            if (data?.status >= 200 && data?.status < 300) {
                setDressInfo({ ...dressInfo, locationList: data?.data?.locations })
            }
            if (data?.status === 401) {
                sellerRefreshToken()

            }
        },
        onError: (error) => {
            if (error?.response?.status === 401) {
                sellerRefreshToken()
            }
        },
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.get(`${REACT_APP_BASE_URL}/shops`, {
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        "Authorization": `Bearer ${localStorage.getItem("DressmeUserToken")}`,
                    }
                });
                if (data?.status >= 200 && data?.status < 300) {
                    setSellerInformation({ ...sellerInformation, shopsList: data?.data })
                }

            } catch (error) {

            }
        };
        if (!sellerInformation?.shopsList) {
            fetchData();
        }
    }, []);

    console.log(dressInfo?.locationList, "dressInfo--locationList");
    console.log(sellerInformation?.shopsList, "dressInfo--shopsList");
    return (
        <div>
            {!dressInfo?.locationList ?
                <LoadingForSeller />
                :
                sellerInformation?.shopsList?.shops ?
                    dressInfo?.locationList ?
                        <LocationList />
                        :
                        <NoLocations />
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
