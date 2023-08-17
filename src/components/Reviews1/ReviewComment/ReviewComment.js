import React from "react";
import { CarouselWear } from "./Carousels/CarouselWear";
import CommentUser from "./CommentUser/CommentUser";

export default function ReviewComment() {
  return (
    <div>
      {" "}
      <div className="relative w-full flex flex-col md:flex-row gap-x-[70px] mt-6">
        <section className="w-full md:w-[30%]">
          <CarouselWear />
        </section>

        <div className="w-full md:w-[calc(70%-70px)] ">
          <CommentUser />
        </div>
      </div>
    </div>
  );
}
