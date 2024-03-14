import { AiOutlineLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const BackBtn = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate(-1);
      }}
      className="w-8 h-8 flex items-center cursor-pointer justify-center border border-borderColor  rounded-lg active:scale-95  active:opacity-70"
    >
      <AiOutlineLeft />
    </button>
  );
};
