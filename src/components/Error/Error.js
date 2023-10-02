import React from "react";

function Error({ colors }) {
  return (
    <div className={`w-full h-[95vh] flex items-center text-[30px] justify-center ${colors} `}>
      {" "}
      Not found
    </div>
  );
}
export default React.memo(Error)
