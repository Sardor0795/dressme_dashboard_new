import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Select } from "antd";
import {
  ArrowRightIcon,
  CopyIcon,
  StarLabel,
  XIcon,
} from "../../../../../../assets/icons";
import AddBtn from "./AddBtn/AddBtn";
import { message } from "antd";

export default function AddingProduct() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Сохранить",
    });
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const onChangeSwitch = (checked) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <div className="flex  py-6 ll:py-[40px] md:py-[50px] md:px-[40px] px-[16px]">
      {contextHolder}
      <div className="hidden md:flex flex-col items-center justify-center mr-[50px]">
        <div className="text-[#007dca] text-2xl w-[45px] h-[45px] rounded-full flex items-center justify-center border-2 border-[#1e88e5] mb-[5px] font-AeonikProRegular">
          1
        </div>
        <div className="bg-[#1e88e5] h-[150px] w-[2px] mb-[5px]"></div>
        <div className="text-white bg-[#1e88e5] text-2xl w-[45px] h-[45px] rounded-full flex items-center justify-center border-2 border-[#1e88e5] mb-[5px] font-AeonikProRegular">
          2
        </div>
        <div className="bg-[#f2f2f2] w-[2px] flex-1"></div>
      </div>
      <div className="flex-1">
        <div>
          <div className="flex md:hidden mb-[15px] justify-end">
            <Link
              to="https://translate.google.com/?sl=ru&tl=uz&op=translate"
              target="_blank"
              className="text-[#007DCA] text-[14px] border-b border-[#007dca] leading-none font-AeonikProRegular"
            >
              Google переводчиком
            </Link>
          </div>
          <form
            className="flex flex-wrap md:flex-nowrap gap-[25px] md:gap-[40px]"
            action="#"
          >
            <div className="section1 border-b pb-[30px] md:rounded-lg md:p-5 w-full md:max-w-[490px] md:border border-[#f2f2f2] ">
              <div className="mb-[10px]">
                <div className="flex items-center mb-[5px]">
                  <div className="text-[#303030] w-fit text-base font-AeonikProRegular">
                    Название на русском
                  </div>
                  <span className="ml-[5px]">
                    <StarLabel />
                  </span>
                </div>
                <div className="justify-between rounded-lg border border-[#e5e5e5] flex py-[10px] px-[5px]">
                  <input
                    className="flex-1 mr-[30px] w-[30px] focus:outline-none font-AeonikProRegular"
                    type="text"
                    value="Очень красивая одежда"
                  />
                  <AddBtn />
                </div>
              </div>
              <div className="mb-[10px]">
                <div className="flex items-center mb-[5px]">
                  <div className="text-[#303030] w-fit text-base font-AeonikProRegular">
                    Название на узбекском
                  </div>
                  <span className="ml-[5px]">
                    <StarLabel />
                  </span>
                </div>
                <div className="rounded-lg border border-[#e5e5e5] flex py-[10px] px-[5px]">
                  <input
                    className="flex-1 mr-[30px] w-[30px] ll:w-auto focus:outline-none font-AeonikProRegular"
                    type="text"
                    value="Juda yaxshi kiyim"
                  />
                  <AddBtn />
                </div>
              </div>
              <div className="mb-[10px]">
                <div className="flex items-center mb-[5px]">
                  <div className="text-[#303030] w-fit text-base font-AeonikProRegular">
                    Описание на русском
                  </div>
                  <span className="ml-[5px]">
                    <StarLabel />
                  </span>
                </div>
                <div className="rounded-lg relative border pr-[40px] border-[#e5e5e5] flex flex-col h-[120px] py-[10px] px-[5px]">
                  <textarea
                    className="block w-full h-full text-[#666] text-sm resize-none bg-transparent flex-1 outline-none font-AeonikProRegular"
                    name=""
                    value="Очень красивая одежда"
                    id=""
                  ></textarea>
                  <div className="flex justify-end w-full absolute right-[6px] bottom-[6px]">
                    <AddBtn />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center mb-[5px]">
                  <div className="text-[#303030] w-fit text-base font-AeonikProRegular">
                    Описание на узбекском
                  </div>
                  <span className="ml-[5px]">
                    <StarLabel />
                  </span>
                </div>
                {/* error -  border-[#ffb8b8] bg-[#fff6f6] */}
                <div className="rounded-lg relative border pr-[40px] border-[#e5e5e5] flex flex-col h-[120px] py-[10px] px-[5px]">
                  <textarea
                    className="block w-full h-full text-[#666] text-sm resize-none bg-transparent flex-1 outline-none font-AeonikProRegular"
                    name=""
                    value="Juda yaxshi kiyim"
                    id=""
                  ></textarea>
                  <div className="flex justify-end w-full absolute right-[6px] bottom-[6px]">
                    <AddBtn />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2 */}

            <div className="w-full pb-[30px] md:border border-[#f2f2f2] flex flex-col md:rounded-lg md:p-5 flex-1">
              <div className="row mb-[17px] md:mb-[20px] block md:flex gap-[35px]">
                <div className="flex-1 mb-[10px]">
                  <div className="flex items-center mb-[5px]">
                    <div className="text-[#303030] w-fit text-base font-AeonikProRegular">
                      Качество на русском
                    </div>
                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </div>
                  <Select
                    className="hidden md:block rounded-lg w-full h-11 md:h-10"
                    showSearch
                    placeholder="Выбрать"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    size="large"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: "Брюки",
                        label: "Брюки",
                      },
                      {
                        value: "Джинсы",
                        label: "Джинсы",
                      },
                      {
                        value: "Штаны",
                        label: "Штаны",
                      },
                      {
                        value: "Шорты",
                        label: "Шорты",
                      },
                    ]}
                  />
                </div>
                <div className="flex-1 mb-[10px]">
                  <div className="flex items-center mb-[5px]">
                    <div className="text-[#303030] w-fit text-base font-AeonikProRegular">
                      Качество на узбекском
                    </div>
                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </div>
                  <Select
                    className="hidden md:block rounded-lg w-full h-11 md:h-10"
                    showSearch
                    placeholder="Выбрать"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    size="large"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: "Брюки",
                        label: "Брюки",
                      },
                      {
                        value: "Джинсы",
                        label: "Джинсы",
                      },
                      {
                        value: "Штаны",
                        label: "Штаны",
                      },
                      {
                        value: "Шорты",
                        label: "Шорты",
                      },
                    ]}
                  />{" "}
                </div>
              </div>
              <div className="row mb-[17px] md:mb-[20px] block md:flex gap-[35px]">
                <div className="flex-1 mb-[17px] md:mb-[10px]">
                  <div className="text-[#303030] mb-[5px] pr-[15px] w-fit text-base bg-no-repeat font-AeonikProRegular">
                    Состав на русском{" "}
                    <span className="text-sm ml-[5px] text-[#a1a1a1] font-AeonikProRegular">
                      (необязательно)
                    </span>
                  </div>
                  <div className="rounded-lg border border-[#e5e5e5] flex py-[10px] px-[5px]">
                    <input
                      className="flex-1 mr-[30px] w-[30px] ll:w-auto focus:outline-none font-AeonikProRegular"
                      type="text"
                      value="Очень красивая одежда"
                    />
                    <AddBtn />
                  </div>
                  <div className="mt-[10px]">
                    <div className="flex items-center text-white w-fit px-2 py-[5px] text-[16px] rounded-md font-AeonikProRegular bg-[#007dca]">
                      хлопок{" "}
                      <Link className="flex items-center justify-center active:translate-y-[2px] w-4 h-4 rounded-full bg-white ml-[10px]">
                        <XIcon />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex-1 mb-[10px]">
                  <div className="text-[#303030] mb-[5px] pr-[15px] w-fit text-base bg-no-repeat font-AeonikProRegular">
                    Состав на узбекском{" "}
                    <span className="notRecquired font-AeonikProRegular text-sm text-textLightColor">
                      (необязательно)
                    </span>
                  </div>
                  <div className="rounded-lg border border-[#e5e5e5] flex py-[10px] px-[5px]">
                    <input
                      className="flex-1 mr-[30px] w-[30px] ll:w-auto focus:outline-none font-AeonikProRegular"
                      type="text"
                      value="Juda yaxshi kiyim"
                    />
                    <AddBtn />
                  </div>
                </div>
              </div>
              <div className="row mb-[30px] md:mb-[20px] block md:flex gap-[35px]">
                <div className="flex-1 mb-[10px]">
                  <div className="inputTitle text-[#303030] mb-[5px] pr-[15px] w-fit text-base font-AeonikProRegular">
                    Бренд{" "}
                    <span className="notRecquired text-sm text-textLightColor font-AeonikProRegular">
                      (необязательно)
                    </span>
                  </div>
                  <Select
                    className="hidden md:block rounded-lg w-full h-11 md:h-10"
                    showSearch
                    placeholder="Выбрать"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    size="large"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: "Брюки",
                        label: "Брюки",
                      },
                      {
                        value: "Джинсы",
                        label: "Джинсы",
                      },
                      {
                        value: "Штаны",
                        label: "Штаны",
                      },
                      {
                        value: "Шорты",
                        label: "Шорты",
                      },
                    ]}
                  />{" "}
                </div>
                <div className="flex-1 mb-[10px]"></div>
              </div>

              <div className="flex md:hidden items-center justify-between mb-[40px]">
                <div className="w-1/3 h-[1px] bg-borderColor"></div>
                <div className="w-1/3 flex items-center justify-around">
                  <button className="w-4 h-4 flex items-center justify-center border border-textBlueColor rounded-full">
                  </button>
                  <span className="w-1/2 h-[1px]  bg-textBlueColor "></span>
                  <button className="w-4 h-4 flex items-center justify-center border border-textBlueColor rounded-full	">
                    <span className="w-2 h-2 rounded-full bg-textBlueColor block "></span>
                  </button>
                </div>
                <div className="w-1/3 h-[1px] bg-borderColor"></div>


              </div>

              <div className="flex justify-center md:justify-end gap-[20px] mt-auto">
                <button
                  onClick={() => {
                    navigate(-1);
                  }}
                  className="h-[42px] md:h-[45px] flex items-center justify-center text-white text-center text-base md:text-lg  active:translate-y-[2px] rounded-lg bg-[#007dca] max-w-[130px] w-full font-AeonikProRegular"
                >
                  Назад
                </button>
                <button
                  onClick={success}
                  className="h-[42px] md:h-[45px] flex items-center justify-center text-white text-center text-base md:text-lg active:translate-y-[2px] rounded-lg bg-[#007dca] max-w-[130px] w-full font-AeonikProRegular"
                >
                  Сохранить
                </button>
              </div>
            </div>
          </form>
          <div className="hidden md:block mt-[30px] font-AeonikProRegular">
            Воспользоваться
            <Link
              to="https://translate.google.com/?sl=ru&tl=uz&op=translate"
              target="_blank"
              className="text-[#007dca] text-lg border-b border-[#007dca] ml-[10px] font-AeonikProRegular"
            >
              Google переводчиком
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
