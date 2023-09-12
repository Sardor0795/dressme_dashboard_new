import React, { useEffect, useRef, useState } from "react";

export default function WearOfNamuna(props) {
  let ref = useRef();
  const [state, setState] = useState({
    isScrolling: false,
    clientY: 0,
    scrollY: 0,
  });

  useEffect(() => {
    const el = ref.current;
    if (el) {
      const onWheel = (e) => {
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY * 4,
          behavior: "smooth",
        });
      };

      el.addEventListener("wheel", onWheel);

      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);

  //   ----------

  const onMouseDown = (e) => {
    if (ref && ref.current && !ref.current.contains(e.target)) {
      return;
    }
    e.preventDefault();

    setState({ ...state, isScrolling: true, clientY: e.clientY });
  };

  //   ----------

  const onMouseMove = (e) => {
    if (ref && ref.current && !ref.current.contains(e.target)) {
      return;
    }
    e.preventDefault();

    const { clientY, scrollY, isScrolling } = state;

    if (isScrolling) {
      ref.current.scrollLeft = scrollY + e.clientY - clientY;
      let sY = scrollY + e.clientY - clientY;
      let cY = e.clientY;
      setState({ ...state, scrollY: sY, clientY: cY });
    }
  };

  //   ----------

  const onMouseUp = (e) => {
    if (ref && ref.current && !ref.current.contains(e.target)) {
      return;
    }
    e.preventDefault();

    setState({ ...state, isScrolling: false });
  };

  useEffect(() => {
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  });

  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      className={props._class}
    >
      {React.Children.map(props.children, (child) =>
        React.Children.only(child)
      )}
    </div>
  );
}
