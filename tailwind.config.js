/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightBorderColor: "#f2f2f2",
        borderColor: "#e2e2e2",
        borderGrayColor: "#707070",
        lightBgColor: "#fcfcfc",
        paginationBackground: "#f8f8f8",
        textLightColor: "#A1A1A1",
        textBlackColor: "#000000",
        textBlueColor: "#007DCA",
        textRedColor: "#D50000",

        //Weather Colors
        weatherSpringColor: "#008F0E",
        weatherSummerColor: "#EAA700",
        weatherAutumnColor: "#E17A02",
        weatherWinterColor: "#007DCA",
        //  Wears colors group
        UpperWear: "#FF9500",
        LowerWear: "#00C2FF",
        headWear: "#347AE2",
        ShoesWear: "#77B50A",
        Accessory: "#B50A48",
        MonthTextColor: "#7C8DB5",
        // Reviews
        tableTextTitle: "#3F6175",
        tableTextTitle2: "#2C2C2C",
        ProductReplyBg: "#F4F6FB",
      },
      fontFamily: {
        // 500
        AeonikProMedium: ["RobotoMedium", ...defaultTheme.fontFamily.sans], // 400
        // 400
        AeonikProRegular: ["RobotoRegular", ...defaultTheme.fontFamily.sans], // 500
      },
    },
    screens: {
      ss: "320px",
      ls: "360px",
      ll: "390px",
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1440px",
    },
  },
  plugins: [],
};
