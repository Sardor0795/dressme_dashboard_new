import React, { useEffect } from "react";

export default function NoReviewProduct() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  return (
    <div className="w-full h-[calc(100vh-250px)]  flex items-center justify-center">
      <span className="text-gray-800 text-base md:text-2xl not-italic font-AeonikProRegular">
        У вас пока нет отзывов !
      </span>
    </div>
  );
}
