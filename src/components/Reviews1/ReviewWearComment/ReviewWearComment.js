import React from "react";
import { WearCommentDetail } from "./WearCommentDetail/WearCommentDetail";
import WearCommentTitle from "./WearCommentTitle/WearCommentTitle";

export default function ReviewWearComment() {
  return (
    <div className="px-4 md:px-10">
      <div className="relative w-full flex flex-col md:flex-row gap-x-[70px] mt-6">
        <section className="w-full md:w-[30%]">
          <WearCommentDetail />
        </section>

        <div className="w-full md:w-[calc(70%-70px)] ">
          <WearCommentTitle />
        </div>
      </div>
    </div>
  );
}
