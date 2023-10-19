import React from 'react'
import LocationList from '../Locations/LocationList/LocationList'
import NoLocations from '../NoLocations/NoLocations'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function MarketIsCheck() {
    const [isLocation, setIsLocation] = useState("")
    const [isMarket, setIsMarket] = useState("")
    const url = "https://api.dressme.uz/api/seller"

    // // ------------GET  Has Magazin ?-----------------
    const { isLoading } = useQuery(["location index"], () => {
        return fetch(`${url}/shops/locations/index`, {
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
                setIsLocation(res)
                // console.log(res, "location bormi");
            },
            onError: (err) => {
                console.log(err, "err magazin");
            },
        }
    )
    const { isFetching } = useQuery(["shops index"], () => {
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
                setIsMarket(res)
                // console.log(res, "magazin bormi");
            },
            onError: (err) => {
                console.log(err, "err magazin");
            },
        }
    )



    return (
        <div>
            {
                isLoading || isFetching
                    ? <div className={`w-full mx-auto h-[100vh] flex items-center justify-center`}>
                        <h1>Waiting please....</h1>
                    </div>
                    : <>
                        {
                            isMarket?.shops?.data?.length ?
                                <>
                                    {isLocation?.locations?.data?.length ? <LocationList /> : <NoLocations />}
                                </> : <div className="flex items-center h-[100vh] justify-center">
                                    <Link
                                        to="/store"
                                        className="text-textBlueColor text-2xl not-italic font-AeonikProRegular hover:underline"
                                    >
                                        Сначала создайте магазин!
                                    </Link>
                                </div>
                        }
                    </>
            }
        </div >
    )
}
