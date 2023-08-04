import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { Select } from "antd";

export default function ProductsPageTwo() {
  return (
    <div className="flex py-[50px] px-[40px] wrapperHeight">
      <div className="hidden md:flex indicators mr-[50px]">
        <div className="dot mb-[5px]">1</div>
        <div className="line active-bg h-[150px] mb-[5px]"></div>
        <div className="dot active mb-[5px]">2</div>
        <div className="line flex-1"></div>
      </div>
      <div className="flex-1">
        <div>
          <div className="flex md:hidden mb-[15px] justify-end">
            <Link className="link">Google переводчиком</Link>
          </div>
          <form className="flex flex-wrap md:flex-nowrap gap-[40px]" action="#">
            <div className="section1 rounded-lg p-5">
              <div className="inputWrapper mb-[10px]">
                <div className="inputTitle bg-no-repeat">
                  Название на русском
                </div>
                <div className="inputContainer flex py-[10px] px-[5px]">
                  <input className="input" type="text" />
                  <button className="inputBtn p-[5px]">Копировать</button>
                </div>
              </div>
              <div className="inputWrapper mb-[10px]">
                <div className="inputTitle bg-no-repeat">
                  Название на узбекском
                </div>
                <div className="inputContainer flex py-[10px] px-[5px]">
                  <input className="input" type="text" />
                  <button className="inputBtn p-[5px]">Копировать</button>
                </div>
              </div>
              <div className="inputWrapper mb-[10px]">
                <div className="inputTitle bg-no-repeat">
                  Название на узбекском
                </div>
                <div className="inputContainer flex column h-[120px] py-[10px] px-[5px]">
                  <textarea
                    className="textArea mb-[10px] outline-none"
                    name=""
                    id=""
                  ></textarea>
                  <div className="flex justify-end w-full">
                    <button className="inputBtn p-[5px]">Копировать</button>
                  </div>
                </div>
              </div>
              <div className="inputWrapper">
                <div className="inputTitle bg-no-repeat">
                  Описание на узбекском
                </div>
                <div className="inputContainer flex column h-[120px] errored py-[10px] px-[5px]">
                  <textarea
                    className="textArea mb-[10px] outline-none"
                    name=""
                    id=""
                  ></textarea>
                  <div className="hidden justify-end w-full">
                    <button className="inputBtn p-[5px]">Копировать</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="section2 rounded-lg p-5 flex-1">
              <div className="row mb-[17px] md:mb-[20px] block md:flex gap-[35px]">
                <div className="inputWrapper flex-1 mb-[10px]">
                  <div className="inputTitle bg-no-repeat">
                    Качество на русском
                  </div>
                  <Select placeholder={"Выбрать"} style={{ width: "100%" }} />
                </div>
                <div className="inputWrapper flex-1 mb-[10px]">
                  <div className="inputTitle bg-no-repeat">
                    Качество на узбекском
                  </div>
                  <Select placeholder={"Выбрать"} style={{ width: "100%" }} />
                </div>
              </div>
              <div className="row mb-[17px] md:mb-[20px] block md:flex gap-[35px]">
                <div className="inputWrapper flex-1 mb-[17px] md:mb-[10px]">
                  <div className="inputTitle bg-no-repeat notImg">
                    Состав на русском{" "}
                    <span className="notRecquired">(не обезательно)</span>
                  </div>
                  <div className="inputContainer flex py-[10px] px-[5px]">
                    <input className="input" type="text" />
                    <button className="inputBtn p-[5px]">Копировать</button>
                  </div>
                  <div className="mt-[10px]">
                    <div className="badge">
                      хлопок <button className="x_btn"></button>
                    </div>
                  </div>
                </div>
                <div className="inputWrapper flex-1 mb-[10px]">
                  <div className="inputTitle bg-no-repeat notImg">
                    Состав на узбекском{" "}
                    <span className="notRecquired">(не обезательно)</span>
                  </div>
                  <div className="inputContainer flex py-[10px] px-[5px]">
                    <input className="input" type="text" />
                    <button className="inputBtn p-[5px]">Копировать</button>
                  </div>
                </div>
              </div>
              <div className="row mb-[30px] md:mb-[20px] block md:flex gap-[35px]">
                <div className="inputWrapper flex-1 mb-[10px]">
                  <div className="inputTitle bg-no-repeat notImg">
                    Бренд <span className="notRecquired">(не обезательно)</span>
                  </div>
                  <Select placeholder={"Выбрать"} style={{ width: "100%" }} />
                </div>
                <div className="inputWrapper flex-1 mb-[10px]"></div>
              </div>

              <div className="flex md:hidden items-center justify-center mb-[40px]">
                <div className="sideLine"></div>
                <div className="mDot"></div>
                <div className="middleLine"></div>
                <div className="mDot">
                  <span className="dotInner"></span>
                </div>
                <div className="sideLine"></div>
              </div>

              <div className="flex justify-center md:justify-end gap-[20px] mt-auto">
                <button className="btn text-[16px] md:text-[18px]">
                  Назад
                </button>
                <button className="btn">Добавить</button>
              </div>
            </div>
          </form>
          <div className="hidden md:block mt-[30px]">
            Воспользоваться <Link className="link">Google переводчиком</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
