import React, { useEffect, useState } from "react";
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
import { RxCross2 } from "react-icons/rx";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router";
import {
  RouteBusinessIndex,
  RouteCampusDetails,
  RouteIndex,
  RouteUserLogin,
  RouteViewCart,
} from "@/helpers/RouteNames";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, setUser, updateLocation } from "@/redux/user.slice";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import { FiExternalLink } from "react-icons/fi";
import Cart from "../Cart";
import { deleteRestId, emptyCart } from "@/redux/cart.slice";
export default function Topbar() {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderMenu, setOrderMenu] = useState([]);
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
  const handleClick = () => {
    setIsCartOpen((prev) => !prev);
  };
  const handlePlaceOrder = async () => {
    try {
      const orderDetails = { ...cart, orderMenu: orderMenu };
      const res = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/order/place-order`,
        {
          method: "post",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(orderDetails),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        return showToast("error", data.message);
      }
      showToast("success", data.message);
      dispatch(emptyCart());
      dispatch(deleteRestId());
      setIsCartOpen(false);
      navigate(RouteIndex);
    } catch (error) {
      showToast("error", error.message);
    }
  };
  const getMenu = (menu = []) => {
    setOrderMenu(menu);
  };

  return (
    <header className="fixed z-50 bg-white left-0 right-0 py-2.5 border-b">
      <div
        className={`fixed bg-black/35 top-0 bottom-0 left-0 right-0 w-full duration-300 ease-in z-20 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      ></div>
      <div
        className={`fixed top-0 bottom-0 right-0 w-xl min-h-screen bg-white z-20 p-2 duration-500 delay-75 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between p-3 ">
          <div>
            <Link to={RouteIndex}>
              <img height={150} width={150} src={logo} alt="" />
            </Link>
          </div>
          <div className="cursor-pointer" onClick={handleClick}>
            <RxCross2 />
          </div>
        </div>
        {cart && cart?.items.length > 0 ? (
          <>
            <div>
              {isCartOpen && <Cart items={cart?.items} getMenu={getMenu} />}
            </div>
            <div className="absolute bottom-0 w-full p-3">
              <Button
                onClick={handlePlaceOrder}
                className={"w-full cursor-pointer"}
              >
                Place order
              </Button>
            </div>
          </>
        ) : (
          <>No items in cart</>
        )}
      </div>
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
            <Link onClick={handleClick} className="flex items-center  gap-0.5">
              <div className="relative">
                {cart && cart.items.length > 0 && (
                  <div className="absolute -top-1 rounded-[100%] p-2.5 left-0 w-4 flex items-center justify-center h-4 bg-red-700 text-white">
                    {cart ? cart.items.length : 0}
                  </div>
                )}
                <CiShoppingCart size={30} />
              </div>
              View cart
            </Link>
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
