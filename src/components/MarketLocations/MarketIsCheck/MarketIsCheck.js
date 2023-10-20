import React, { useEffect } from 'react'
import LocationList from '../Locations/LocationList/LocationList'
import NoLocations from '../NoLocations/NoLocations'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import LoadingForSeller from '../../Loading/LoadingFor'

export default function MarketIsCheck() {
    const [isLocation, setIsLocation] = useState("")
    const [isMarket, setIsMarket] = useState("")
    const [loading, setLoading] = useState(true)
    const [example, setExample] = useState(false)

    const url = "https://api.dressme.uz/api/seller"

    // // ------------GET  Has Magazin ?-----------------
    const { isFetched, isLoading, isFetching } = useQuery(["location index"], () => {
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
                if (res?.locations) {
                    setIsLocation(res)
                    setLoading(false)

                }
            },
            onError: (err) => {
                console.log(err, "err magazin");
            },
            keepPreviousData: true, // bu browserdan tashqariga chiqib yana kirsa, yana yurishni oldini olish uchun
            refetchOnWindowFocus: false, // bu ham focus bolgan vaqti malumot olib kelish
        }
    )
    useQuery(["shops index"], () => {
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
                if (res?.shops) {
                    setLoading(false)
                    setIsMarket(res)
                    // console.log(res, "magazin bormi");
                }
            },
            onError: (err) => {
                console.log(err, "err magazin");
            },
            keepPreviousData: true, // bu browserdan tashqariga chiqib yana kirsa, yana yurishni oldini olish uchun
            refetchOnWindowFocus: false, // bu ham focus bolgan vaqti malumot olib kelish
        }
    )



    useEffect(() => {
        isLocation?.locations?.data?.forEach(item => {
            if (item?.shop_locations?.length >= 1) {
                setExample(true)
            }
        })
    },)

    return (
        <div>
            {loading ? <LoadingForSeller /> :
                <>  {
                    isMarket?.shops?.data?.length >= 1 ?
                        <>
                            {example ? <LocationList /> : < NoLocations />}
                        </>
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
                </>
            }
        </div >
    )
}
