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
        // isLocation: "",
        // isCheckLocation: null,
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


    // console.log(state?.isMarket, "isMarket");
    // console.log(state?.isLocation, "isLocation");
    // console.log(dressInfo?.SellerMagazinLocation?.locations_exist, "SellerMagazinLocation");
    // console.log(state?.isLocation, state?.isMarket);

    return (
        <div>
            {state?.loading ? <LoadingForSeller /> :
                state?.isMarket?.length > 0 ?
                    dressInfo?.SellerMagazinLocation?.locations_exist ?
                        dressInfo?.SellerMagazinLocation?.locations_exist ? <ProductsPageOne /> : <NoLocationProduct />
                        :
                        <LoadingForSeller />
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
