import React, { useEffect } from 'react'
import LocationList from '../Locations/LocationList/LocationList'
import NoLocations from '../NoLocations/NoLocations'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import LoadingForSeller from '../../Loading/LoadingFor'

export default function MarketIsCheck() {

    // const [state, setState] = useState({
    //     isLocation: "",
    //     isMarket: "",
    //     Loading: "",
    //     isCheckLocation: ""
    // })
    const [isLocation, setIsLocation] = useState("")
    const [isMarket, setIsMarket] = useState("")
    const [isMarketCheck, setIsMarketCheck] = useState(false)

    const [loading, setLoading] = useState(true)
    const [example, setExample] = useState()

    const url = "https://api.dressme.uz/api/seller"


    const { isLoading } = useQuery(["shops index"], () => {
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
                    setIsMarketCheck(true)
                    setIsMarket(res)
                    setLoading(false)
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
    // // ------------GET  Has Magazin ?-----------------
    const { isFetched, isFetching } = useQuery(["location index"], () => {
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
                    setExample(res?.locations_exist)
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
    // console.log("---------------------------");
    // console.log(isLoading, "isLoading");
    // console.log(isFetched, "isFetched");
    // console.log(isFetching, "isFetching");
    // console.log(isLocation, "isLocation");
    // console.log(isMarket, "isMarket");

    // console.log(isLocation?.locations_exist, 'isLocation');
    // useEffect(() => {
    //     isLocation?.locations?.data?.forEach(item => {
    //         if (item?.shop_locations?.length >= 1) {
    //             setExample(true)
    //         }
    //     })
    // },)
    return (
        <div>
            {loading || isLoading || !isMarketCheck ? <LoadingForSeller /> :
                <>  {
                    isMarketCheck ? <>{isFetched && isLocation?.locations?.data ? <> {example ? <LocationList /> : < NoLocations />} </> : <LoadingForSeller />}</>
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
            {/* {loading || isLoading || !isFetched ? <LoadingForSeller /> :
                <>  {
                    isMarketCheck &&
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
            <>
                {isFetched && <> {example ? <LocationList /> : < NoLocations />} </>
                }</> */}

        </div >
    )
}
