import React from 'react'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import MyMarket from '../MyMarket/MyMarket'
import AddStore from '../AddMarket/AddStore/AddStore'

export default function MarketIsStoreCheck() {
    const [sellerShops, setSellerShops] = useState("")
    const url = "https://api.dressme.uz/api/seller"

    // // ------------GET  Has Magazin ?-----------------
    const { isLoading, isFetching } = useQuery(["sellerShops"], () => {
        return fetch(`${url}/shops`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",

                'Authorization': `Bearer ${localStorage.getItem("DressmeUserToken")}`,
            },

        }).then(res => res.json())
    },
        {
            onSuccess: (res) => {
                setSellerShops(res)
                // setDressInfo({ ...dressInfo, SellerMagazin: res })
            },
            onError: (err) => {
                console.log(err, "err magazin");
            },

        }
    )


    return (
        <div>

            {
                isLoading ? <div className={`w-[100vw] h-[100vh] flex items-center justify-center`} >
                    <h1>Waiting please....</h1>
                </div> : <>

                    {sellerShops?.shops?.data?.length && isFetching && <MyMarket />}
                    {!sellerShops?.shops?.data?.length && isFetching && <AddStore />}


                </>
            }

        </div>
    )
}
