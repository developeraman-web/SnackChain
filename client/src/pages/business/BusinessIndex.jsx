import { Button } from "@/components/ui/button";
import {
  RouteOwnerCredentials,
  RouteRegisterRestraunt,
} from "@/helpers/RouteNames";
import React, { useEffect } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { Link } from "react-router";
import { FaRegAddressBook } from "react-icons/fa";

export default function BusinessIndex() {
  const imageUrl =
    "https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      className="left-0 right-0 h-[500px] absolute"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute left-0 right-0 h-full bg-black/60"></div>
      <div className="relative z-10 flex flex-col gap-y-10 justify-center items-center h-full">
        <h1 className="md:text-6xl text-lg  font-bold text-white text-center ">
          Partner with{" "}
          <span className="text-white">
            Snack<span className="italic">Chain</span>
          </span>{" "}
          and <br /> grow your business
        </h1>
        <div className="flex md:flex-row flex-col justify-center  items-center gap-4">
          <Button className={"cursor-pointer"}>
            <Link
              className="flex items-center gap-1"
              to={RouteOwnerCredentials}
            >
              <MdOutlineDashboard /> My Restraunt Dashboard
            </Link>
          </Button>
          <Button asChild className={"cursor-pointer"}>
            <Link
              className="flex items-center gap-1"
              to={RouteRegisterRestraunt}
            >
              <FaRegAddressBook /> Register Your Restraunt
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
