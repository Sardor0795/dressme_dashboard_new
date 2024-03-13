import React, { useContext, useState } from "react";
import { MenuCloseIcons } from "../../../assets/icons";
import { useNavigate } from "react-router-dom";
import { HelperData } from "../../../hook/HelperDataStore";
import { useTranslation } from "react-i18next";

function NoLocations() {
  const [openSelect, setOpenSelect] = useState(true);
  const [helperDatainform] = useContext(HelperData);

  const { t } = useTranslation("locations");

  const navigate = useNavigate();

  const handleShopsOfLocation = (id) => {
    setOpenSelect(true);
    navigate(`/locations-store/:${id}`);
  };

  return (
    <div className="w-full h-[100vh]  flex items-center justify-center md:px-10 ">
      {openSelect ? (
        <div className="w-fit h-fit flex flex-col justify-center items-center gap-y-[50px]">
          <p className="text-red-500 text-2xl not-italic font-AeonikProRegular">
            {t("no_location")}
          </p>
          <button
            onClick={() => setOpenSelect(false)}
            className="px-7 active:scale-95  active:opacity-70 cursor-pointer py-3 rounded-lg flex items-center justify-center bg-textBlueColor text-white text-lg not-italic font-AeonikProMedium"
          >
            {t("add_location")}
          </button>
        </div>
      ) : (
        <div className="fixed inset-0 z-10 ">
          <div
            className="fixed cursor-pointer inset-0 w-full h-full bg-black opacity-40"
            onClick={() => setOpenSelect(true)}
          ></div>
          <div className="flex items-center min-h-screen justify-center">
            <div className="relative w-[440px] py-[5px] h-[350px] rounded-[20px] bg-white overflow-hidden">
              <div className="absolute top-4 right-4 ">
                <button type="button" onClick={() => setOpenSelect(true)}>
                  <MenuCloseIcons colors={"#A5A5A5"} />
                </button>
              </div>
              <div className="w-full h-fit flex items-center justify-center py-5 border-b border-borderColor2">
                <p className="text-tableTextTitle2 text-2xl not-italic font-AeonikProRegular">
                  {t("attach_to_store")}
                </p>
              </div>
              <div className="w-full px-[10px] py-[30px] flex flex-col gap-y-[10px]">
                {helperDatainform?.shopsList?.shops?.data?.map((item) => {
                  return (
                    <button
                      onClick={() => handleShopsOfLocation(item?.id)}
                      key={item?.id}
                      className="w-full py-[10px] flex items-center justify-center rounded-[5px] hover:bg-LocationSelectBg focus:bg-LocationSelectBg"
                    >
                      <span className="text-tableTextTitle2 text-xl not-italic font-AeonikProRegular">
                        {" "}
                        {item?.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default React.memo(NoLocations);
