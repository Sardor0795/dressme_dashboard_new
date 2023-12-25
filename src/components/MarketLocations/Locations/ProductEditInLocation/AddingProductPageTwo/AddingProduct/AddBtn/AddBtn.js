import { useState } from "react";
import { Link } from "react-router-dom";
import { CopyIcon } from "../../../../../../../assets/icons";

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
      className="w-[22px]  h-[22px] rounded-[4px]  active:scale-95  active:opacity-70 flex items-center justify-end"
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
