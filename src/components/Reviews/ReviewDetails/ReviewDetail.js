import React from "react";
import { useParams } from "react-router-dom";
import FilterSearch from "./FilterSearch/FilterSearch";
import CommentUsers from "./CommentUsers/CommentUsers";
import { DetailCarousel } from "./Carousels/DetailCarousel";

export default function ReviewDetail() {
  const id = useParams();
  console.log(id, "id");
  return (
    <div className="px-4 md:px-10">
      <div className="hidden md:blok w-full">
        <FilterSearch />
      </div>

      <div className="relative w-full flex flex-col md:flex-row gap-x-[70px] mt-6">
        <section className="w-full md:w-[30%]">
          <DetailCarousel />
        </section>

        <div className="w-full md:w-[calc(70%-70px)] ">
          <CommentUsers />
        </div>
      </div>
    </div>
  );
}
