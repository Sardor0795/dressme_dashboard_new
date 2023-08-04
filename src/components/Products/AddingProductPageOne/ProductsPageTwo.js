import React from "react";
import "./style.css";

export default function ProductsPageTwo() {
  return (
    <div className="flex py-[50px] px-[40px] wrapperHeight">
      <div className="indicators mr-[50px]">
        <div className="dot mb-[5px]">1</div>
        <div className="line active-bg h-[150px] mb-[5px]"></div>
        <div className="dot active mb-[5px]">2</div>
        <div className="line flex-1"></div>
      </div>
      <div>
        <form className="flex gap-[40px]" action="#">
          <div className="section1 rounded-lg p-5">
            <div className="inputWrapper mb-[10px]">
              <div className="inputTitle bg-no-repeat">Название на русском</div>
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
          <div className="section2 rounded-lg p-5">
            <div className="row mb-[20px] flex gap-[35px]">
              <div className="inputWrapper mb-[10px]">
                <div className="inputTitle bg-no-repeat">
                  Качество на русском
                </div>
                <div className="inputContainer flex py-[10px] px-[5px]">
                  <input className="input" type="text" />
                  <button className="inputBtn p-[5px]">Копировать</button>
                </div>
              </div>
              <div className="inputWrapper mb-[10px]">
                <div className="inputTitle bg-no-repeat">
                  Качество на узбекском
                </div>
                <div className="inputContainer flex py-[10px] px-[5px]">
                  <input className="input" type="text" />
                  <button className="inputBtn p-[5px]">Копировать</button>
                </div>
              </div>
            </div>
            <div className="row mb-[20px] flex gap-[35px]">
              <div className="inputWrapper mb-[10px]">
                <div className="inputTitle bg-no-repeat notImg">
                  Состав на русском{" "}
                  <span className="notRecquired">(не обезательно)</span>
                </div>
                <div className="inputContainer flex py-[10px] px-[5px]">
                  <input className="input" type="text" />
                  <button className="inputBtn p-[5px]">Копировать</button>
                </div>
              </div>
              <div className="inputWrapper mb-[10px]">
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
            <div className="row mb-[20px] flex gap-[35px]">
              <div className="inputWrapper mb-[10px]">
                <div className="inputTitle bg-no-repeat notImg">
                  Бренд <span className="notRecquired">(не обезательно)</span>
                </div>
                <div className="inputContainer flex py-[10px] px-[5px]">
                  <input className="input" type="text" />
                  <button className="inputBtn p-[5px]">Копировать</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
