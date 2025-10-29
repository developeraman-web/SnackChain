import React, { useEffect } from "react";
import logo from "@/assets/images/logo.png";
import { FaAngleDown } from "react-icons/fa";
import { CiDiscount1 } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Link } from "react-router";
import {
  RouteBusinessIndex,
  RouteCampusDetails,
  RouteIndex,
  RouteUserLogin,
} from "@/helpers/RouteNames";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, setUser, updateLocation } from "@/redux/user.slice";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { FiExternalLink } from "react-icons/fi";
export default function Topbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const res = await fetch(`${getEnv("VITE_API_BASE_URL")}/user/logout`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        showToast("error", data.message);
        return;
      }
      showToast("success", data.message);
      dispatch(removeUser());
    } catch (error) {
      showToast("error", error.message);
    }
  };
  return (
    <header className="fixed z-50 bg-white left-0 right-0 py-2.5 border-b">
      <div className="flex justify-between items-center container">
        <div className="flex gap-2 items-center">
          <Link to={RouteIndex}>
            <img height={150} width={150} src={logo} alt="" />
          </Link>
        </div>
        <div className="flex gap-5 px-3">
          <div className="py-1 px-3 border-l flex items-center gap-1">
            <CiDiscount1 />
            <DropdownMenu>
              <DropdownMenuTrigger className="flex gap-1 items-center">
                Deals
                <FaAngleDown />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Deal 1</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="p-1 px-3 border-l flex gap-1 items-center">
            <CiShoppingCart />
            cart
          </div>
          {user && user.user.role === "admin" ? (
            <>
              <div className="px-3 border-l">
                <Button asChild variant={""}>
                  <Link className="flex items-center" to={RouteCampusDetails}>
                    Admin Dashboard <FiExternalLink />
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="px-3 border-l">
                <Button asChild variant={""}>
                  <Link to={""}>
                    Get App <FiExternalLink />
                  </Link>
                </Button>
              </div>
            </>
          )}
          <div className="px-3 border-l">
            <Button asChild variant={""}>
              <Link to={RouteBusinessIndex}>Business</Link>
            </Button>
          </div>

          {user && !user.isLoggedIn ? (
            <div className="px-3 border-l">
              <Button asChild variant={""}>
                <Link to={RouteUserLogin}>sign in</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="px-3 border-l">
                <Button onClick={handleLogout} variant={""}>
                  Logout
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
