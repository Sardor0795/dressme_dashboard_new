import React from 'react'
import LocationList from '../Locations/LocationList/LocationList'
import NoLocations from '../NoLocations/NoLocations'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function MarketIsCheck() {
    const [isLocation, setIsLocation] = useState("")
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
            },
            onError: (err) => {
                console.log(err, "err magazin");
            },
        }
    )



    return (
        <div>

            {
                isLoading ? <div className={`w-[100vw] h-[100vh] flex items-center justify-center`}>
                    <h1>Waiting please....</h1>
                </div> : <>

                    {isLocation?.locations?.data?.length && <LocationList />}
                    {!isLocation?.locations?.data?.length && <NoLocations />}


                </>
            }

        </div>
    )
}
