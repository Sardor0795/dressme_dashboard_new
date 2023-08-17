import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  SearchIcon, StarLabel, TelIcon, YandexFullScreenMapIcon, YandexMazimizeMapIcon } from "../../../../assets/icons";
import { YMaps, Map, GeolocationControl, ZoomControl} from "react-yandex-maps";
import { AiOutlineLeft } from "react-icons/ai";

const mapOptions = {
  modules: ["geocode", "SuggestView"],
  defaultOptions: { suppressMapOpenBlock: true },
  width: 920,
  height: 400,
};

const initialState = {
  title: "",
  center: [41.311753, 69.241822],
  zoom: 12,
};

export default function AddLocation () {
  
  const [state, setState] = useState({ ...initialState });
  const [mapConstructor, setMapConstructor] = useState(null);
  const mapRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // submits
  const handleSubmit = () => {
    console.log({ title: state.title, center: mapRef.current.getCenter() });
  };

  // reset state & search
  const handleReset = () => {
    setState({ ...initialState });
    searchRef.current.value = "";
    mapRef.current.setCenter(initialState.center);
    mapRef.current.setZoom(initialState.zoom);
  };

  // search popup
  useEffect(() => {
    if (mapConstructor) {
      new mapConstructor.SuggestView(searchRef.current).events.add("select", function (e) {
        const selectedName = e.get("item").value;
        mapConstructor.geocode(selectedName).then((result) => {
          const newCoords = result.geoObjects.get(0).geometry.getCoordinates();
          setState((prevState) => ({ ...prevState, center: newCoords }));
        });
      });
    }
  }, [mapConstructor]);

  // change title
  const handleBoundsChange = (e) => {
    const newCoords = mapRef.current.getCenter();
    mapConstructor.geocode(newCoords).then((res) => {
      const nearest = res.geoObjects.get(0);
      const foundAddress = nearest.properties.get("text");
      const [centerX, centerY] = nearest.geometry.getCoordinates();
      const [initialCenterX, initialCenterY] = initialState.center;
      if (centerX !== initialCenterX && centerY !== initialCenterY) {
        setState((prevState) => ({ ...prevState, title: foundAddress }));
      }
    });
  };
  
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="w-full max-w-[920px] mx-auto mt-6 md:mt-12">
      <div className="my-4">
        <div className="text-center mb-6 md:mb-[50px] text-5 md:text-[35px] font-AeonikProMedium">
          Добавить локацию магазина
        </div>
        <div className="mb-3">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="w-8 h-8 flex items-center cursor-pointer justify-center border border-borderColor rounded-lg"
        >
          <AiOutlineLeft />
        </button>
        </div>
        <div className="relative w-full border rounded-lg overflow-hidden">
          
          <YMaps>
            <Map
              {...mapOptions}
              state={state}
              onLoad={setMapConstructor}
              onBoundsChange={handleBoundsChange}
              instanceRef={mapRef}
            >

            <div className="h-[66px] absolute top-2 z-40 mx-2 backdrop-blur-sm bg-yandexNavbar left-0 right-0 flex items-center justify-between border px-3 rounded-lg">
              <div className="w-full flex items-center">
                <div className="w-[489px] flex items-center justify-between bg-white border border-borderColor p-3 rounded-lg">
                  <input ref={searchRef} placeholder="Введите адрес" disabled={!mapConstructor} className="w-full outline-none text-sm font-AeonikProMedium mr-3 rounded-lg" />
                  {/* <div onClick={handleReset} className="cursor-pointer">
                    <SearchIcon />
                  </div> */}
                </div>
              </div>
              <button 
                type="button"
                onClick={handleSubmit} 
                disabled={Boolean(!state.title.length)} 
                className="border cursor-pointer active:scale-95 px-[35px] py-3 bg-textBlueColor text-white rounded-lg text-sm font-AeonikProMedium"
              >
                Подтвердить
              </button>
            </div>

            <ZoomControl
              options={{
                float: "right",
                position: { bottom: 170, right: 8, size: "small" },
                size: "small",
              }}
            />

            <GeolocationControl
              options={{
                float: "right",
                width: "34",
                height: "34",
                position: { bottom: 130, right: 8 },
              }}
            />
            
          </Map>

          </YMaps>           
        </div>

        
        <div className="flex mt-[10px] gap-[25px] mb-[25px]">
          <div className="relative w-full h-[130px] border-2 border-dashed flex items-center justify-center rounded-lg">
            <Link to="#" className="flex items-center justify-center">
              <span className="leading-none text-sm font-AeonikProMedium border-b border-textBlueColor text-textBlueColor">
                Фото локации
              </span>
              <span className="ml-[5px]">
                <StarLabel />
              </span>
            </Link>
          </div>
          <div className="relative w-full h-[130px] border-2 border-dashed flex items-center justify-center rounded-lg">
            <Link to="#" className="flex items-center justify-center">
              <span className="leading-none text-sm font-AeonikProMedium border-b border-textBlueColor text-textBlueColor">
                Второе фото локации ?
              </span>
            </Link>
          </div>
          <div className="relative w-full h-[130px] border-2 border-dashed flex items-center justify-center rounded-lg">
            <Link to="#" className="flex items-center justify-center">
              <span className="leading-none text-sm font-AeonikProMedium border-b border-textBlueColor text-textBlueColor">
                Третье фото локации ?
              </span>
            </Link>
          </div>
        </div>

        <div className="flex items-center w-full gap-[32px] mb-5">
          <div className="flex-1">
            <div className="text-base flex items-center mb-[10px]">
              Имя администратора
              <span className="ml-[5px]">
                <StarLabel />
              </span>
            </div>
            <input
              type="text"
              className="border border-borderColor p-3 rounded-lg w-full max-w-[287px] text-base font-AeonikProMedium"
            />
          </div>
          <div className="flex-1">
            <div className="text-base mb-[10px]">
              Имя второго администратора
            </div>
            <input
              type="text"
              placeholder="(не обезательно)"
              className="border placeholder:text-xs border-borderColor p-3 rounded-lg w-full max-w-[287px] text-base font-AeonikProMedium"
            />
          </div>
          <div className="flex-1">
            <div className="text-base flex items-center mb-[10px]">
              Рабочее время
              <span className="ml-[5px]">
                <StarLabel />
              </span>
            </div>
            от
            <input
              type="text"
              className="mr-5 ml-[5px] border border-borderColor p-3 rounded-lg w-full max-w-[63px] text-base font-AeonikProMedium"
            />
            до
            <input
              type="text"
              className="ml-[5px] border border-borderColor p-3 rounded-lg w-full max-w-[63px] text-base font-AeonikProMedium"
            />
          </div>
        </div>

        <div className="flex items-center w-full gap-[32px] mb-[50px]">
          <div className="flex-1">
            <div className="text-base flex items-center mb-[10px]">
              Номер администратора
              <span className="ml-[5px]">{/* <StarLabel /> */}</span>
            </div>
            <div className="flex items-center border border-borderColor h-[45px] rounded-lg w-full max-w-[287px] text-base font-AeonikProMedium">
              <span className="h-full flex items-center px-[12px] border-r border-lightBorderColor">
                +998
              </span>
              <input type="tel" className="pl-3 outline-none " />
              <span className="mr-12">
                <TelIcon />
              </span>
            </div>
          </div>
          <div className="flex-1">
            <div className="text-base flex items-center mb-[10px]">
              Номер второго администратора
            </div>
            <div className="flex items-center border border-borderColor h-[45px] rounded-lg w-full max-w-[287px] text-base font-AeonikProMedium">
              <span className="h-full flex items-center px-[12px] border-r border-lightBorderColor">
                +998
              </span>
              <input
                type="tel"
                placeholder="(не обезательно)"
                className="pl-3 outline-none placeholder:text-xs"
              />
              <span className="mr-12">
                <TelIcon />
              </span>
            </div>
          </div>
          <div className="flex-1"></div>
        </div>

        <div className="flex justify-center">
          <Link
            className="inline-block px-[100px] py-[15px] bg-textBlueColor text-white rounded-lg active:scale-95"
            // to={"/store"}
          >
            Добавить
          </Link>
        </div>
      </div>
    </div>
  );
}
// export default React.memo(AddLocation);