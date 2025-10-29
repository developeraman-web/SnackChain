import React, { useState } from "react";
import { Link } from "react-router";
import { FaAngleDown } from "react-icons/fa6";

export default function Details() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="container ">
      <div className="grid grid-cols-3 gap-5 mt-7 py-2">
        <div className="col-span-1">
          <div className="relative min-h-60 bg-[rgb(217,169,35)] rounded-3xl p-7 overflow-hidden ">
            <div className="mb-2 font-bold flex justify-between items-center gap-1">
              <div>
                <h3 className="text-lg pb-1">Gold</h3>
                <p className="text-lg pb-1">000 000 000</p>
                <p className="text-lg pb-1">XXX XXX</p>
              </div>
              <div className="relative flex h-auto pb-14">
                <img
                  className="w-14 h-14 self-start"
                  src="	https://vahanwire.com/_next/static/media/motor.3f18d581.svg"
                  alt=""
                />
              </div>
            </div>
            <div className="py-2 px-7 bg-black/10 absolute bottom-0 left-0 right-0 rounded-b-3xl">
              <div className="flex justify-between items-center pb-2">
                <p>Vehicle Number</p>
                <p>Valid For:</p>
              </div>
              <div className="flex justify-between items-center pb-2 font-semibold ">
                <p>00-00</p>
                <p>12 Months</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-y-4 px-3">
          <h1 className="font-semibold text-4xl">Vahanwire Gold Member</h1>
          <p className="text-[#838383] text-[14px] leading-7">
            Experience reliable two-wheeler care with the Vahanwire Gold Plan –
            designed for everyday convenience. It covers essential services like
            puncture support, refreshing bike washes, doorstep fuel delivery,
            and routine general servicing. Plus, enjoy an exclusive 10% discount
            on bike insurance and a 20%{" "}
            <span
              className={`${isOpen ? "" : "cursor-pointer"}`}
              onClick={handleClick}
            >
              {isOpen ? (
                <>
                  discount on additional general services. Ideal for regular
                  riders who want dependable support without the hassle. Stay
                  road-ready with Vahanwire by your side{" "}
                  <span
                    onClick={(e) => setIsOpen(false)}
                    className="text-blue-400 cursor-pointer"
                  >
                    ...Show Less
                  </span>
                </>
              ) : (
                <>
                  <span className="text-blue-400">...Show More</span>
                </>
              )}
            </span>
          </p>
          <div className="flex justify-between gap-2 ">
            <div className="text-[#838383] text-[14px]">
              <p className="pb-1">Duration 12 Months</p>
              <p className="pb-1">One Vehicle Covered</p>
              <p className="pb-1">Total Services</p>
            </div>
            <div>
              <div className="flex justify-between gap-30 items-center font-bold pb-3 text-3xl border-b">
                <p>Pay Now</p>
                <p>$99</p>
              </div>
              <div className="flex justify-between items-center mt-2 text-gray-500">
                <p>Pay Later</p>
                <p>$900</p>
              </div>
            </div>
          </div>
          <div className="mt-7">
            <div className="flex justify-between items-center my-3">
              <div className="py-2 px-4 w-62 shadow-md rounded-lg text-center shadow-gray-500 text-md  text-white flex justify-between items-center gap-7  bg-[#4184ed]">
                <div>Service Package</div>
                <div>
                  <FaAngleDown />
                </div>
              </div>
              <div className="py-2 px-4 w-62 shadow-md rounded-lg text-center shadow-gray-500 text-lg font-semibold  text-white  bg-[#32ab15]">
                <div>Add Cart</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
