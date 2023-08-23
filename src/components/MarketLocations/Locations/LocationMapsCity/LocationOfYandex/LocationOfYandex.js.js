import React, { useRef, useState, useEffect } from "react";
import "../../../../../index.css";
import { YMaps, Map, ZoomControl, GeolocationControl } from "react-yandex-maps";
import {
  MapLocationIcon,
  MenuCloseIcons,
  SearchIcon,
  StarIcon,
  marketIcons,
} from "../../../../../assets/icons";
import "./LocationOfYandex.css";
import { GrClose } from "react-icons/gr";
const mapOptions = {
  modules: ["geocode", "SuggestView"],
  defaultOptions: { suppressMapOpenBlock: true },
};

const initialState = {
  title: "",
  center: [41.311753, 69.241822],
  zoom: 12,
};

export default function LocationOfYandex() {
  const [state, setState] = useState({ ...initialState });
  const [mapConstructor, setMapConstructor] = useState(null);
  const mapRef = useRef(null);
  const searchRef = useRef(null);

  // submits
  const handleSubmit = () => {
    console.log({ title: state.title, center: mapRef.current.getCenter() });
  };

  // reset state & search
  const handleReset = () => {
    setState({ ...initialState });
    // searchRef.current.value = "";
    mapRef.current.setCenter(initialState.center);
    mapRef.current.setZoom(initialState.zoom);
  };

  // search popup
  useEffect(() => {
    if (mapConstructor) {
      new mapConstructor.SuggestView(searchRef.current).events.add(
        "select",
        function (e) {
          const selectedName = e.get("item").value;
          mapConstructor.geocode(selectedName).then((result) => {
            const newCoords = result.geoObjects
              .get(0)
              .geometry.getCoordinates();
            setState((prevState) => ({ ...prevState, center: newCoords }));
          });
        }
      );
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
  // setAttribute
  return (
    <div className="w-full h-[400px]">
      <div className={"mapRoot"}>
        <YMaps
          query={{
            apikey: "29294198-6cdc-4996-a870-01e89b830f3e",
            lang: "uz",
          }}
        >
          <Map
            className="mapsuz"
            {...mapOptions}
            state={state}
            onLoad={setMapConstructor}
            onBoundsChange={handleBoundsChange}
            instanceRef={mapRef}
          >
            <div className="h-[66px] absolute top-2 z-40 mx-2 backdrop-blur-sm bg-yandexNavbar left-0 right-0 flex items-center justify-between border px-3 rounded-lg">
              <div className="w-full flex items-center">
                <div className="min-w-[500px] flex items-center justify-between bg-white border border-borderColor p-3 rounded-lg">
                  {!state.title && (
                    <input
                      ref={searchRef}
                      placeholder="Введите адрес"
                      disabled={!mapConstructor}
                      // disabled={true}
                      className="w-full outline-none text-sm font-AeonikProMedium mr-3 rounded-lg"
                    />
                  )}
                  {state.title && (
                    <div className="w-full gap-x-3 flex items-center justify-between h-full mr-3 rounded-lg  ">
                      <div
                        className="w-full whitespace-nowrap	"
                        title={state.title}
                      >
                        {state.title}
                      </div>
                      <div
                        onClick={handleReset}
                        className=" cursor-pointer flex items-center justify-center "
                      >
                        <GrClose />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <button
                type="button"
                className="border cursor-pointer active:scale-95 px-[35px] py-3 bg-textBlueColor text-white rounded-lg text-sm font-AeonikProMedium"
                onClick={handleSubmit}
                disabled={Boolean(!state.title.length)}
              >
                Подтвердить
              </button>
            </div>
            {/* <div
              className={
                "w-full h-fit border border-black relative flex items-center justify-center bg-transparent"
              }
            >
              <div className="absolute top-0 left-0 z-[50]" title={state.title}>
                {state.title}
              </div>
              <button onClick={handleReset}>
                <MenuCloseIcons />
              </button>
            </div>
          */}
            <span className={"placemark"}>
              <MapLocationIcon color="primary" />
            </span>
            <ZoomControl
              options={{
                float: "right",
                position: { bottom: 270, right: 10, size: "small" },
                size: "small",
              }}
            />{" "}
            <GeolocationControl
              options={{
                float: "right",
                position: { bottom: 220, right: 10 },
              }}
            />
          </Map>
        </YMaps>
      </div>
    </div>
  );
}
