import {
  RouteBusinessIndex,
  RouteRegisterRestraunt,
  RouteUserLogin,
  RouteUserSignUp,
} from "@/helpers/RouteNames";
import React from "react";
import { Link } from "react-router";
import { PiLinkSimpleBold } from "react-icons/pi";
import { IoIosArrowForward } from "react-icons/io";
import { IoCompassOutline } from "react-icons/io5";

export default function Footer() {
  return (
    <div className="bg-amber-950/95 py-5 border-t">
      <div className="container">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-3 text-white items-center">
          <div className="px-1">
            <h3 className="mb-3 md:text-3xl text-2xl font-semibold ">
              Snack<span className="italic">Chain</span>
            </h3>
            <p className="py-3 text-[16px] text-justify">
              A campus food ordering and takeaway system, specifically designed
              for cafes, restaurants and college canteens with in the campus,
              this system helps college students to order food from anywhere, by
              choosing campus and particular cafe a order can be placed on that
              cafe's food items, when the order is processed the customer can
              come and receive order.
            </p>
          </div>
          <div className="md:pl-5 pr-2 col-span-2 flex md:flex-row flex-col md:gap-15 gap-5">
            <div id="usefulLinks">
              <h3 className="font-semibold md:text-xl text-sm mb-3 flex items-center gap-0.5">
                <PiLinkSimpleBold />
                Useful Links
              </h3>
              <div className="flex flex-col gap-3 py-3 ">
                <Link className="flex items-center gap-1" to={RouteUserSignUp}>
                  <IoIosArrowForward />
                  Sign Up
                </Link>
                <Link className="flex items-center gap-1" to={RouteUserLogin}>
                  <IoIosArrowForward />
                  Sign In
                </Link>
              </div>
            </div>
            <div id="explore">
              <h3 className="font-semibold md:text-xl text-sm mb-3 flex items-center gap-0.5">
                <IoCompassOutline />
                Explore
              </h3>
              <div className="flex flex-col gap-3 py-3 ">
                <Link
                  className="flex items-center gap-1"
                  to={RouteBusinessIndex}
                >
                  <IoIosArrowForward />
                  Business
                </Link>
                <Link
                  className="flex items-center gap-1"
                  to={RouteRegisterRestraunt}
                >
                  <IoIosArrowForward />
                  Register Your Restaurant
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
