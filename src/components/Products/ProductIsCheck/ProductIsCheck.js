import React, { useContext, useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import LoadingForSeller from '../../Loading/LoadingFor'
import { useHttp } from '../../../hook/useHttp'
import ProductsPageOne from '../AddingProductPageOne/ProductsPageOne'
import NoLocationProduct from '../NoLocationsProduct/NoLocationsProduct'
import { dressMainData } from '../../../hook/ContextTeam'

export default function ProductIsCheck() {
    const [dressInfo, setDressInfo] = useContext(dressMainData);

    const { request } = useHttp()
    const [state, setState] = useState({
        isLocation: "",
        isCheckLocation: null,
        isMarket: "",
        isMarketCheck: false,
        loading: true,
    })


    useQuery(["shops_index"], () => { return request({ url: "/shops", token: true }) },
        {
            onSuccess: (res) => {
                if (res?.shops) {
                    setState({ ...state, isMarketCheck: true, isMarket: res?.shops?.data, loading: false })
                }
            },
            onError: (err) => {
                setState({ ...state, loading: false })
                // console.log(err, "BU -- HOC -- Error");
            },
            keepPreviousData: true,
            refetchOnWindowFocus: false,
        }
    );
    useQuery(["location_index-product"], () => {
        return request({ url: "/shops/locations/index", token: true });
    },
        {
            onSuccess: (res) => {
                if (res?.locations) {
                    setState({ ...state, isCheckLocation: res?.locations_exist, isLocation: res, loading: false })
                }
            },
            onError: (err) => {
                setState({ ...state, loading: false })
                // console.log(err, "BU -- HOC -- Error");
            },
            keepPreviousData: true,
            refetchOnWindowFocus: false,
        }
    );


    // console.log(state?.isMarket, "check----isMarket");
    // console.log(state?.isLocation, "check----isLocation");
    // console.log(dressInfo?.SellerMagazinLocation, "check----SellerMagazinLocation");
    // console.log(state?.isLocation, state?.isMarket);

    return (
        <div>

            {
                state?.isMarket?.length > 0
                    ?
                    state?.isCheckLocation
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
