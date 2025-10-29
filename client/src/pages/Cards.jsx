import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";

export default function Cards() {
  const [count, setCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleClick = () => {
    setIsCartOpen(true);
  };
  const handleDecrease = (e) => {
    e.stopPropagation();
    if (count === 1) {
      setCount(0);
      return;
    }
    if (count === 0) {
      setIsCartOpen(false);
      return;
    }

    setCount((prev) => prev - 1);
  };

  const handleIncrease = (e) => {
    e.stopPropagation();
    setCount((prev) => prev + 1);
  };
  return (
    <div className="container">
      <h1 className="py-3 mb-4 text-3xl font-bold">
        Find the right plan for you
      </h1>
      <div className="grid grid-cols-3 gap-7 mt-4 ">
        <div className="p-3 shadow-md shadow-gray-400 hover:-translate-y-1 duration-200 transition-all border-[0.5px] rounded-3xl">
          <div className="mx-auto min-h-60 relative">
            <div className="absolute top-0 left-0 h-full right-0 bg-[rgb(217,169,35)] rounded-3xl p-7 overflow-hidden ">
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
          <div className="flex flex-col">
            <div className="flex justify-between items-center font-bold text-2xl py-4 border-b">
              <p>Pay Now</p>
              <p>$99</p>
            </div>
            <div className="flex justify-between items-center py-4 text-gray-500">
              <p>Pay Later</p>
              <p>$900</p>
            </div>
            <div className="flex justify-between items-center text-gray-500 my-3">
              <button className="py-2 px-4 rounded-lg text-center shadow-lg text-lg font-bold text-gray-600  bg-white">
                <Link to="/details">View Details</Link>
              </button>
              <div
                onClick={handleClick}
                className={`py-2 px-4 rounded-lg text-center shadow-lg text-lg font-bold ${
                  isCartOpen
                    ? "border-green-500 border-2"
                    : "bg-[#32ab15]  text-white"
                }`}
              >
                {!isCartOpen ? (
                  <>
                    {" "}
                    <div className="cursor-pointer">Add Cart</div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center cursor-pointer text-black  ">
                      <div className="border-r mx-1" onClick={handleDecrease}>
                        <FiMinus />
                      </div>
                      <div className="px-1">{count}</div>
                      <div className="border-l mx-1" onClick={handleIncrease}>
                        <FaPlus />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 shadow-md shadow-gray-400 hover:-translate-y-1 duration-200 transition-all border-[0.5px] rounded-3xl">
          <div className="mx-auto min-h-60  relative">
            <div className="absolute top-0 left-0 h-full right-0 bg-[rgb(192,192,192)] rounded-3xl p-7 overflow-hidden ">
              <div className="mb-2 font-bold flex justify-between items-center gap-1 relative">
                <div>
                  {" "}
                  <h3 className="text-lg  pb-1">Silver</h3>
                  <p className="text-lg  pb-1">000 000 000</p>
                  <p className="text-lg  pb-1">XXX XXX</p>
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
                  <p>3 Months</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between items-center font-bold text-2xl py-4 border-b">
              <p>Pay Now</p>
              <p>$99</p>
            </div>
            <div className="flex justify-between items-center py-4 text-gray-500">
              <p>Pay Later</p>
              <p>$900</p>
            </div>
            <div className="flex justify-between items-center text-gray-500 my-3">
              <button className="py-2 px-4 rounded-lg text-center shadow-lg text-lg font-bold text-gray-600  bg-white">
                <Link to="/details">View Details</Link>
              </button>
              <button className="py-2 px-4 rounded-lg text-center shadow-lg text-lg font-bold text-white  bg-[#32ab15]">
                Add Cart
              </button>
            </div>
          </div>
        </div>
        <div className="p-3 shadow-md shadow-gray-400 hover:-translate-y-1 duration-200 transition-all border-[0.5px] rounded-3xl">
          <div className="mx-auto min-h-60  relative">
            <div className="absolute top-0 left-0 h-full right-0 bg-[rgb(229,228,226)] rounded-3xl p-7 overflow-hidden ">
              <div className="mb-2 font-bold flex justify-between items-center gap-1">
                <div>
                  <h3 className="text-lg  pb-1">Platinum</h3>
                  <p className="text-lg  pb-1">000 000 000</p>
                  <p className="text-lg  pb-1">XXX XXX</p>
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
          <div className="flex flex-col">
            <div className="flex justify-between items-center font-bold text-2xl py-4 border-b">
              <p>Pay Now</p>
              <p>$99</p>
            </div>
            <div className="flex justify-between items-center py-4 text-gray-500">
              <p>Pay Later</p>
              <p>$900</p>
            </div>
            <div className="flex justify-between items-center text-gray-500 my-3">
              <button className="py-2 px-4 rounded-lg text-center shadow-lg text-lg font-bold text-gray-600  bg-white">
                <Link to="/details">View Details</Link>
              </button>
              <button className="py-2 px-4 rounded-lg text-center shadow-lg text-lg font-bold text-white  bg-[#32ab15]">
                Add Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
