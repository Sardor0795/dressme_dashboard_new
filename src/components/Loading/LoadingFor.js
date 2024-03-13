import React from "react";
import styles from "./forLoading.module.css";
import WiFiLoader from "../../assets/loader/wifi_loader.gif";
export default function LoadingForSeller() {
  return (
    <div className={styles.loader}>
      <div
        style={{
          backgroundImage: `url('${WiFiLoader}')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
        className="md:w-[100px] w-[60px] md:h-[100px] h-[60px]"
      ></div>
    </div>
  );
}
