import React, { useEffect, useState } from 'react'
import { DatePicker, Space, Popover } from "antd";
import { CalendarIcons } from '../../assets/icons';
const { RangePicker } = DatePicker;

export default function PickerOfFilter() {
    const [screenSize, setScreenSize] = useState(getCurrentDimension());

    function getCurrentDimension() {
        return {
            width: window.innerWidth,
        };
    }
    useEffect(() => {
        const updateDimension = () => {
            setScreenSize(getCurrentDimension());
        };
        window.addEventListener("resize", updateDimension);

        return () => {
            window.removeEventListener("resize", updateDimension);
        };
    }, [screenSize]);


    const [showPicker, setShowPicker] = useState(false)
    const showPickerHandle = () => {
        setShowPicker(!showPicker)
    }
    useEffect(() => {

        if (showPicker && screenSize.width > 768) {
            setShowPicker(false)
        }
    }, [screenSize])

    return (
        <section className="w-fit flex items-center ">
            <span
                className="p-2 flex md:hidden  cursor-pointer"
                onClick={showPickerHandle}
            >
                <CalendarIcons />
            </span>
            <span className='hidden md:flex  w-[250px] '>
                <Space direction="vertical" size={12} open={true}>
                    <RangePicker placeholder={["от", "до"]} />
                </Space>
            </span>
            <span className='flex md:hidden'>
                <Space direction="vertical" size={12} open={true}>
                    <RangePicker
                        open={showPicker}
                        placeholder={["от", "до"]} />
                </Space>
            </span>
        </section>
    )
}
