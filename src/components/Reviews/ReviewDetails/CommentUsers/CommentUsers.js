import React, { useState } from "react";
import { CloseAnswer, MobileStar, SearchIcon, SendIcon, StarOutlineIcon } from "../../../../assets/icons";

export default function CommentUsers() {

  const [sendAnswer, setSendAnswer] = useState(false)

  const [userInfo, setuserInfo] = useState([
    {
      id: 1,
      userName: "Umar",
      userImg:
        "https://storage.kun.uz/source/thumbnails/_medium/9/I0iHdUWlWwccLwGsh3rqHOJznm3TsLI3_medium.jpg",
      starCount: 5,
      date: "19 февраля 2023 г.",
      userFeedback:
        "Качество среднее но стоит своих денег точно мне понравилась классный оверсайз. Качество среднее но стоит своих денег точно мне понравилась классный оверсайз.",
      wearSubject: [
        {
          id: 1,
          subjectBrand: "Ответ Nike Store Official Dealer",
          subjectReply: "Спасибо вам за оценку!",
          replyDate: "26 февраля 2023 г.",
        },
      ],
    },
    {
      id: 2,
      userName: "Firdavsbek",
      userImg:
        "https://storage.kun.uz/source/thumbnails/_medium/9/I0iHdUWlWwccLwGsh3rqHOJznm3TsLI3_medium.jpg",
      starCount: 4,
      date: "19 февраля 2023 г.",
      userFeedback:
        "Качество среднее но стоит своих денег точно мне понравилась классный оверсайз. Качество среднее но стоит своих денег точно мне понравилась классный оверсайз.",
      wearSubject: [
        {
          id: 1,
          subjectBrand: "",
          subjectReply: "",
          replyDate: "",
        },
      ],
    },
    {
      id: 3,
      userName: "Shohjahon",
      userImg:
        "https://storage.kun.uz/source/thumbnails/_medium/9/I0iHdUWlWwccLwGsh3rqHOJznm3TsLI3_medium.jpg",
      starCount: 5,
      date: "19 февраля 2023 г.",
      userFeedback:
        "Качество среднее но стоит своих денег точно мне понравилась классный оверсайз. Качество среднее но стоит своих денег точно мне понравилась классный оверсайз.",
      wearSubject: [
        {
          id: 1,
          subjectBrand: "Ответ Nike Store Official Dealer",
          subjectReply: "Спасибо вам за оценку!",
          replyDate: "26 февраля 2023 г.",
        },
      ],
    },
  ]);
  return (
    <div className="w-full h-full  flex flex-col md:gap-y-[15px]">
      <div className="pb-1 md:justify-end text-tableTextTitle2 text-xl not-italic font-AeonikProMedium flex items-center md:gap-x-4 mt-[37px] mb-[18px] md:mt-0 md:mb-0">
        <p className="mr-[10px] md:ml-0"> Отзывы клиентов</p>
        <span className="block md:hidden text-xs text-mobileTextColor">(12 отзывы) </span>
      </div>
      <div className="flex md:hidden gap-x-[14px] mb-4">
        <div className="w-[70%] h-[31px] overflow-hidden border border-lightBorderColor flex items-center px-[10px] rounded">
          <input
            type="text"
            className="w-full h-full text-[13px] outline-0	"
            placeholder="Поиск"
          />
          <span> <SearchIcon /> </span>
        </div>
        <button className="w-[30%] h-[31px] bg-textBlueColor flex items-center justify-center text-white rounded px-[8px] ls:px-[10px]">
          <span className="text-[10px] ls:text-[12px] not-italic font-AeonikProMedium mr-[5px]">
          Отправить
          </span>
          <MobileStar />
        </button>
      </div>
      {userInfo.map((data) => {
        return (
          <div className="w-full h-fit border border-lightBorderColor rounded-[5px] p-[15px] mb-[10px] md:mb-0">
            {/* userImg and Date */}
            <div className="w-full md:p-[15px] mb-5 md:mb-0 h-fit flex justify-between">
              <div className="h-10 w-fit flex items-center gap-x-[15px]">
                <figure className="w-10 h-10  rounded-full overflow-hidden flex items-center justify-center">
                  <img src={data?.userImg} alt="" className="w-full h-full" />
                </figure>
                <div className="flex flex-col">
                  <div className="text-tableTextTitle2 text-base md:text-xl font-AeonikProMedium">
                    {data?.userName}
                  </div>
                  <div className="flex md:gap-x-[10px]">
                    <p className="text-gray-700 text-[13px] md:text-sm font-AeonikProRegular leading-normal">
                      Оценка покупки
                    </p>
                    <p className="flex items-center gap-x-[2px] ml-[5px] md:ml-0">
                      <span className="text-gray-700 text-[13px] md:text-sm mr-[2px] font-AeonikProRegular leading-normal	">
                        {data?.starCount}.0
                      </span>
                      <span>
                        <StarOutlineIcon />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-10 w-fit flex items-start md:items-center">
                <span className="text-textLightColor text-xs md:text-base font-AeonikProRegular leading-normal">
                  {data?.date}
                </span>
              </div>
            </div>
            {/* userText and  */}
            <div className="md:p-[15px] w-full md:w-[95%] h-fit ">
              <span className="text-mobileTextColor text-[13px] md:text-base not-italic font-AeonikProRegular leading-normal">
                {data?.userFeedback}
              </span>
            </div>
            {data?.wearSubject.map((item) => {
              return (
                <>
                  {item?.subjectReply.length !== 0 ? (
                    <div>
                      <div className="w-full h-fit mt-[20px] md:mt-[15px] md:p-[15px] ">
                        <div className="w-full h-fit flex justify-between px-[15px] py-3 md:p-[25px] bg-ProductReplyBg rounded-[5px] gap-x-[15px]">
                          <div>
                            <p className="text-tableTextTitle2 text-[12px] md:text-base font-AeonikProMedium mb-4">
                              {item?.subjectBrand}
                            </p>
                            <p className="text-gray-700 text-[12px] md:text-base font-AeonikProRegular">
                              {item?.subjectReply}
                            </p>
                          </div>
                          <div className="flex items-start mt-[2px]">
                            <span className="text-textLightColor text-[11px] md:text-base font-AeonikProRegular leading-normal">
                              {item?.replyDate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {item?.subjectReply.length !== 0 ? null : (
                    <div className="w-full h-fit mt-[25px] md:mt-[5px] flex justify-end">
                      {sendAnswer ? (
                        <div className="w-full flex items-center justify-between">
                          <textarea name="answer" id="answer" className="w-4/5 h-12 text-[13px] md:text-base md:h-14 border rounded p-3 md:mr-[20px] xxl:mr-[30px]" placeholder="Add your answer..."></textarea>
                          <button className="w-[132px] py-2 md:py-0 md:h-11 bg-textBlueColor flex items-center justify-center active:scale-95  active:opacity-70 text-white rounded-lg md:mr-[10px]">
                            <span className="text-[13px] md:text-sm not-italic font-AeonikProMedium">
                            Отправить
                            </span>
                            {/* <SendIcon /> */}
                          </button>
                          <button
                            onClick={() => setSendAnswer(false)}
                            className="w-11 h-11 bg-white flex items-center justify-center active:scale-95  active:opacity-70 text-white border rounded-lg">  
                            <CloseAnswer />
                          </button>                        
                        </div>
                      )
                      : (
                        <button 
                          onClick={() => setSendAnswer(true)}
                          className="w-full md:w-[132px] py-2 md:py-0 md:h-11 bg-textBlueColor flex items-center justify-center active:scale-95  active:opacity-70 text-white rounded-lg">
                          <span className="text-[13px] md:text-sm not-italic font-AeonikProMedium">
                          Ответить
                          </span>
                        </button>
                      )
                    }
                    </div>
                  )}
                </>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
