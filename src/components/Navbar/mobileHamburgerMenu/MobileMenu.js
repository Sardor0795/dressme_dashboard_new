import { Button, Modal } from 'antd';
import { ClothesIcons, MobileNavMenu, NavbarMarketIcon, NavbarReviewIcon } from '../../../assets/icons'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function MobileHumburgerMenu() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='flex md:hidden items-center'>
        <button type="primary" onClick={showModal}>
        <MobileNavMenu />
        </button>
        <Modal 
            open={isModalOpen} 
            onOk={handleOk}
            onCancel={handleCancel}
            closeIcon={false}
            footer={null}
        >
            <div className="w-full flex flex-wrap gap-y-5">
                <NavLink
                    onClick={() => setIsModalOpen(false)}
                    className={
                    "w-full h-[54px] gap-x-[15px] px-[25px] bg-lightBorderColor rounded-lg flex items-center justify-start"
                    }
                    style={({ isActive }) => ({
                    color: isActive ? "#007DCA" : "#000",
                    background: isActive ? "#f2f2f2" : "#fcfcfc",
                    })}
                    to={"/reviews"}
                >
                    <span>
                    <NavbarReviewIcon colors={""} />
                    </span>
                    <span className=" text-lg not-italic font-AeonikProMedium leading-5">
                    Отзывы
                    </span>
                </NavLink>
                <NavLink
                     onClick={() => setIsModalOpen(false)}
                    className={
                    "w-full h-[54px] gap-x-[15px] px-[25px] flex items-center justify-start capitalize bg-lightBorderColor rounded-lg"
                    }
                    style={({ isActive }) => ({
                    color: isActive ? "#007DCA" : "#000",
                    background: isActive ? "#f2f2f2" : "#fcfcfc",
                    })}
                    to={"/shops"}
                >
                    <span>
                    <NavbarMarketIcon colors={""} />
                    </span>
                    <span className=" text-lg not-italic font-AeonikProMedium leading-5">
                    Магазины
                    </span>
                </NavLink>
                <NavLink
                    onClick={() => setIsModalOpen(false)}
                    className={
                    "w-full h-[54px] gap-x-[15px] px-[25px] flex items-center justify-start capitalize bg-lightBorderColor rounded-lg"
                    }
                    style={({ isActive }) => ({
                    color: isActive ? "#007DCA" : "#000",
                    background: isActive ? "#f2f2f2" : "#fcfcfc",
                    })}
                    to={"/products"}
                >
                    <span>
                    <ClothesIcons colors={""} />
                    </span>
                    <span className=" text-lg not-italic font-AeonikProMedium leading-5">
                    Одежда
                    </span>
                </NavLink>
            </div>
        </Modal>
    </div>
  )
}
