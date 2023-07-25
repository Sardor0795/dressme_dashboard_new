import React from "react";
import { useParams } from "react-router-dom";
import FilterSearch from "./FilterSearch/FilterSearch";
import CommentUsers from "./CommentUsers/CommentUsers";
import { DetailCarousel } from "./Carousels/DetailCarousel";

export default function ReviewDetail() {
  const id = useParams();
  console.log(id, "id");
  return (
    <div className="border border-green-500 px-10">
      <div className="w-full">
        <FilterSearch />
      </div>
      <div className="relative w-full flex gap-x-[70px]">
        <section className="w-[30%] ">
          <DetailCarousel />
          {/* <ProductCarousel /> */}
        </section>
        <div className="w-[calc(70%-70px)] border border-green-500">
          <CommentUsers />
        </div>
      </div>
    </div>
  );
}
