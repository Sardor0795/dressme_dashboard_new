import { Button, Modal } from "antd";
import {
  ClothesIcons,
  LocationIcon,
  MobileNavMenu,
  NavbarMarketIcon,
  NavbarReviewIcon,
  UserExitIcon,
  UserIcon,
} from "../../../assets/icons";
import { useState } from "react";
import { NavLink } from "react-router-dom";

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
    <div className="flex md:hidden items-center">
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
            className={
              "w-full h-[54px] gap-x-[15px] px-[25px] bg-lightBorderColor rounded-lg flex items-center justify-center"
            }
            style={({ isActive }) => ({
              background: isActive ? "#f2f2f2" : "#fcfcfc",
            })}
            to={"/reviews"}
            onClick={() => setIsModalOpen(false)}
          >
            {({ isActive }) =>
              isActive ? (
                <figure className="flex h-full gap-x-[15px] items-center justify-center">
                  <NavbarReviewIcon colors={"#007dca"} />
                  <p className="text-lg not-italic font-AeonikProMedium leading-5">
                    Отзывы
                  </p>
                </figure>
              ) : (
                <figure className=" flex h-full gap-x-[15px] items-center justify-center">
                  <NavbarReviewIcon colors={"#2c2c2c"} />
                  <p className="text-lg not-italic font-AeonikProMedium leading-5">
                    Отзывы
                  </p>
                </figure>
              )
            }
          </NavLink>
          <NavLink
            className={
              "w-full h-[54px] gap-x-[15px] px-[25px] bg-lightBorderColor rounded-lg flex items-center justify-center"
            }
            style={({ isActive }) => ({
              background: isActive ? "#f2f2f2" : "#fcfcfc",
            })}
            to={"/store"}
            onClick={() => setIsModalOpen(false)}
          >
            {({ isActive }) =>
              isActive ? (
                <figure className="flex h-full gap-x-[15px] items-center justify-center">
                  <NavbarMarketIcon colors={"#007dca"} />
                  <p className="text-lg not-italic font-AeonikProMedium leading-5">
                    Магазины
                  </p>
                </figure>
              ) : (
                <figure className=" flex h-full gap-x-[15px] items-center justify-center">
                  <NavbarMarketIcon colors={"#2c2c2c"} />
                  <p className="text-lg not-italic font-AeonikProMedium leading-5">
                    Магазины
                  </p>
                </figure>
              )
            }
          </NavLink>

          <NavLink
            className={
              "w-full h-[54px] gap-x-[15px] px-[25px] bg-lightBorderColor rounded-lg flex items-center justify-center"
            }
            style={({ isActive }) => ({
              background: isActive ? "#f2f2f2" : "#fcfcfc",
            })}
            to={"/locations-store"}
            onClick={() => setIsModalOpen(false)}
          >
            {({ isActive }) =>
              isActive ? (
                <figure className="flex h-full gap-x-[15px] items-center justify-center">
                  <LocationIcon colors={"#007dca"} />
                  <p className="text-lg not-italic font-AeonikProMedium leading-5">
                    Локации
                  </p>
                </figure>
              ) : (
                <figure className=" flex h-full gap-x-[15px] items-center justify-center">
                  <LocationIcon colors={"#2c2c2c"} />
                  <p className="text-lg not-italic font-AeonikProMedium leading-5">
                    Локации
                  </p>
                </figure>
              )
            }
          </NavLink>
          <NavLink
            className={
              "w-full h-[54px] gap-x-[15px] px-[25px] bg-lightBorderColor rounded-lg flex items-center justify-center"
            }
            style={({ isActive }) => ({
              background: isActive ? "#f2f2f2" : "#fcfcfc",
            })}
            to={"/products"}
            onClick={() => setIsModalOpen(false)}
          >
            {({ isActive }) =>
              isActive ? (
                <figure className="flex h-full gap-x-[15px] items-center justify-center">
                  <ClothesIcons colors={"#007dca"} />
                  <p className="text-lg not-italic font-AeonikProMedium leading-5">
                    Одежда
                  </p>
                </figure>
              ) : (
                <figure className=" flex h-full gap-x-[15px] items-center justify-center">
                  <ClothesIcons colors={"#2c2c2c"} />
                  <p className="text-lg not-italic font-AeonikProMedium leading-5">
                    Одежда
                  </p>
                </figure>
              )
            }
          </NavLink>
        </div>
        <div className=" flex items-center justify-between border-t border-borderColor w-full mt-2 pt-1">
          <button
            onClick={() => setIsModalOpen(false)}
            className="w-fit mt-2 group h-fit cursor-pointer py-3   rounded-lg  flex items-center gap-x-4"
          >
            <UserExitIcon colors={"#FF4343"} />{" "}
            <span
              className={` text-black text-redText text-lg not-italic font-AeonikProMedium leading-5`}
            >
              Выйти
            </span>
          </button>
          <NavLink
            onClick={() => setIsModalOpen(false)}
            className={"w-fit mt-2 flex items-center justify-start capitalize"}
            style={({ isActive }) => ({
              background: isActive ? "#f2f2f2" : "#fcfcfc",
            })}
            to="/edit-profile"
          >
            {({ isActive }) =>
              isActive ? (
                <figure className="flex h-full gap-x-[15px] items-center justify-center">
                  <UserIcon colors={"#007dca"} />
                  <p className="text-lg not-italic font-AeonikProMedium leading-5">
                    Профиль
                  </p>
                </figure>
              ) : (
                <figure className=" flex h-full gap-x-[15px] items-center justify-center">
                  <UserIcon colors={"#2c2c2c"} />
                  <p className="text-lg not-italic font-AeonikProMedium leading-5">
                    Профиль
                  </p>
                </figure>
              )
            }
          </NavLink>
        </div>
      </Modal>
    </div>
  );
}
