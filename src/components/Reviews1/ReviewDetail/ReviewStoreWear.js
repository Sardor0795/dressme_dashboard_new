import React, { useState } from "react";
import ReviewStore from "./ReviewStore/ReviewStore";
import ReviewWear from "./ReviewWear/ReviewWear";

export default function ReviewStoreWear() {
  const [storeOrWear, setStoreOrWear] = useState(true);
  return (
    <div className="w-full h-fit">
      <div className="my-[30px] w-full flex justify-center items-center">
        <div className="w-fit h-[44px] bg-lightBorderColor flex items-center justify-center rounded-lg overflow-hidden">
          <button
            onClick={() => setStoreOrWear(true)}
            className={`w-[260px] ${
              storeOrWear
                ? "text-textBlueColor border rounded-lg border-textBlueColor"
                : "text-black"
            } h-full flex items-center justify-center text-base not-italic font-AeonikProMedium`}
          >
            Магазины (2)
          </button>
          <button
            onClick={() => setStoreOrWear(false)}
            className={`w-[260px] ${
              !storeOrWear ? "text-textBlueColor border rounded-lg border-textBlueColor" : "text-black"
            } h-full flex items-center justify-center text-base not-italic font-AeonikProMedium`}
          >
            Одежда (6)
          </button>
        </div>
      </div>
      <div>{storeOrWear ? <ReviewStore /> : <ReviewWear />}</div>
    </div>
  );
}
