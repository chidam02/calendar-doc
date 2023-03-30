import React from "react";

export default function Modal({ isOpen, handleModal, children }) {
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
    <>
    <div className="absolute top-0 left-0 w-screen h-screen backdrop-contrast-50 z-20"/>
    <div ref={modalRef} className="bg-white backdrop-blur-sm rounded drop-shadow-2xl z-30 absolute w-1/2 h-1/2 overflow-auto top-1/4 right-1/3 ">
    <section className="flex items-center h-full">
      {children}
    </section>
    </div>
    </>
  );
}
