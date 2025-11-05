import React, { useEffect, useState } from "react";
import logo from "@/assets/images/logo.png";
import { FaAngleDown } from "react-icons/fa";
import { CiDiscount1 } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { IoChevronDown } from "react-icons/io5";
import { MdOutlineFoodBank } from "react-icons/md";
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
import { GiHamburgerMenu } from "react-icons/gi";
import {
  RouteBusinessIndex,
  RouteCampusDetails,
  RouteIndex,
  RouteOrders,
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
  const [navOpen, setNavOpen] = useState(false);
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
  const handleNavClick = () => {
    setNavOpen((prev) => !prev);
  };
  const handleClick = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <header className="fixed z-50 bg-white left-0 right-0 py-2.5 border-b">
      <section id="cart">
        <div
          id="cartOverlay"
          className={`fixed bg-black/35 top-0 bottom-0 left-0 right-0 w-full duration-300 ease-in z-30 ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        ></div>
        <div
          id="cartSection"
          className={`fixed top-0 bottom-0 right-0 md:w-xl w-[80vw] min-h-screen bg-white z-30 p-2 duration-500 delay-75 ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-3 ">
            <div>
              <Link className="md:block hidden" to={RouteIndex}>
                <img height={150} width={150} src={logo} alt="" />
              </Link>
              <h3 className="md:hidden block font-semibold text-2xl">
                {" "}
                My Cart
              </h3>
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
      </section>
      <div
        id="websiteNav"
        className="flex justify-between items-center container"
      >
        <div className="flex gap-2 items-center">
          <Link to={RouteIndex}>
            <img height={150} width={150} src={logo} alt="" />
          </Link>
        </div>

        <>
          <div className="hidden justify-between  md:flex">
            <div className="p-1 lg:px-3  px-2 border-l flex gap-1 items-center">
              <button
                onClick={handleClick}
                className="flex items-center  gap-0.5"
              >
                <div className="relative">
                  {cart && cart.items.length > 0 && (
                    <div className="absolute -top-1 rounded-[100%] p-2.5 left-0 w-4 flex items-center justify-center h-4 bg-red-700 text-white">
                      {cart ? cart.items.length : 0}
                    </div>
                  )}
                  <CiShoppingCart size={30} />
                </div>
                View Cart
              </button>
            </div>
            <div className="py-1 lg:px-3 px-2 border-l flex items-center gap-1">
              {/* <CiDiscount1 />
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
              </DropdownMenu> */}
              <Link to={RouteOrders} className="flex items-center  gap-0.5">
                <div className="relative">
                  {/* {cart && cart.items.length > 0 && (
                    <div className="absolute -top-1 rounded-[100%] p-2.5 left-0 w-4 flex items-center justify-center h-4 bg-red-700 text-white">
                      {cart ? cart.items.length : 0}
                    </div>
                  )} */}
                  <MdOutlineFoodBank size={30} />
                </div>
                View Orders
              </Link>
            </div>
            {user && user.user.role === "admin" ? (
              <>
                <div className="px-2 lg:px-3 border-l">
                  <Button asChild variant={""}>
                    <Link className="flex items-center" to={RouteCampusDetails}>
                      Admin Dashboard <FiExternalLink />
                    </Link>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="px-2 lg:px-3 border-l">
                  <Button asChild variant={""}>
                    <Link to={""}>
                      Get App <FiExternalLink />
                    </Link>
                  </Button>
                </div>
              </>
            )}
            <div className="px-2 lg:px-3 border-l">
              <Button asChild variant={""}>
                <Link to={RouteBusinessIndex}>Business</Link>
              </Button>
            </div>

            {user && !user.isLoggedIn ? (
              <div className="px-2 lg:px-3 border-l">
                <Button asChild variant={""}>
                  <Link to={RouteUserLogin}>sign in</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="px-2 lg:px-3 border-l">
                  <Button onClick={handleLogout} variant={""}>
                    Logout
                  </Button>
                </div>
              </>
            )}
          </div>
        </>
        <div className="md:hidden flex items-center gap-3">
          <div className="p-1 px-3 border-l flex gap-1 items-center md:hidden">
            {user && !user.isLoggedIn ? (
              <div className="">
                <Button asChild variant={""}>
                  <Link to={RouteUserLogin}>sign in</Link>
                </Button>
              </div>
            ) : (
              <>
                <button
                  onClick={handleClick}
                  className="flex items-center  gap-0.5"
                >
                  <div className="relative">
                    {cart && cart.items.length > 0 && (
                      <div className="absolute -top-1 rounded-[100%] p-2.5 left-0 w-4 flex items-center justify-center h-4 bg-red-700 text-white">
                        {cart ? cart.items.length : 0}
                      </div>
                    )}
                    <CiShoppingCart size={30} />
                  </div>
                  View Cart
                </button>
              </>
            )}
          </div>
          <button id="hamburgerButton" onClick={handleNavClick}>
            <GiHamburgerMenu />
          </button>
        </div>

        <>
          <div
            id="navOverlay"
            className={`fixed bg-black/35 top-0 bottom-0 left-0 right-0 w-full duration-300 ease-in z-20 flex justify-center items-end ${
              navOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div className="font-bold text-5xl p-3 text-white">
              <IoChevronDown />
            </div>
          </div>

          <div
            id="navSection"
            className={`fixed top-0  right-0 w-full min-h-[60vh] bg-white z-20 p-2 duration-600 ease-in delay-100 ${
              navOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <header>
              <div className="flex justify-between p-3 ">
                <div>
                  <Link to={RouteIndex}>
                    <img height={150} width={150} src={logo} alt="" />
                  </Link>
                </div>
                <div className="cursor-pointer" onClick={handleNavClick}>
                  <RxCross2 />
                </div>
              </div>
            </header>
            <main>
              <div>
                {user && user.user.role === "admin" ? (
                  <>
                    <div className="py-2 border-l">
                      <Button asChild variant={""}>
                        <Link
                          className="flex items-center"
                          to={RouteCampusDetails}
                        >
                          Admin Dashboard <FiExternalLink />
                        </Link>
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="py-2 border-l">
                      <Button asChild variant={"link"}>
                        <Link to={""}>
                          Get App <FiExternalLink />
                        </Link>
                      </Button>
                    </div>
                  </>
                )}
              </div>
              <div className="py-2 border-l">
                <Button onClick={handleNavClick} asChild variant={"link"}>
                  <Link to={RouteBusinessIndex}>Business</Link>
                </Button>
              </div>

              {user && !user.isLoggedIn ? (
                <div className="py-2 border-l">
                  <Button asChild variant={"link"}>
                    <Link to={RouteUserLogin}>sign in</Link>
                  </Button>
                </div>
              ) : (
                <>
                  <div className="py-2 border-l">
                    <Button
                      onClick={(e) => {
                        handleLogout();
                        handleNavClick();
                      }}
                      variant={"link"}
                    >
                      Logout
                    </Button>
                  </div>
                </>
              )}
            </main>
          </div>
        </>
      </div>
    </header>
  );
}
