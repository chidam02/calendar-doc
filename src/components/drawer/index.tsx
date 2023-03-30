import React from "react";

export default function Drawer({ isOpen, handleModal, children }) {
  const modalRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {

    const outsideClickHandler = (e) => {
      if (modalRef.current && !modalRef.current?.contains(e.target)) {
        handleModal(false);
      }
    };

    document.addEventListener("mousedown", outsideClickHandler);

    return () => {
      document.removeEventListener("mousedown", outsideClickHandler);
    };
  }, [modalRef.current, isOpen]);

  return (
    <div ref={modalRef} className="bg-white backdrop-blur-sm py-4 drop-shadow-2xl z-30 absolute w-1/2 h-screen overflow-auto top-0 right-0 ">
      {children}
    </div>
  );
}
