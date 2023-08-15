import { useState } from "react";
import { CopyIcon } from "../../../../../assets/icons";
import { Link } from "react-router-dom";

export default function AddBtn() {
  const [pressed, setPressed] = useState(false);

  const onClick = () => {
    setPressed(true);

    setTimeout(() => {
      setPressed(false);
    }, 1000);
  };

  return (
    <Link
      className="w-[22px]  h-[22px] rounded-[4px]  active:translate-y-[2px] flex items-center justify-end"
      onClick={onClick}
    >
      {pressed ? (
        <span className="text-xs font-AeonikProRegular bg-white flex items-center justify-center h-full">
          Скопировано
        </span>
      ) : (
        <CopyIcon />
      )}
    </Link>
  );
}