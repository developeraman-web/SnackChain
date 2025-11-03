import { getEnv } from "@/helpers/getEnv";
import { RouteItemDetails } from "@/helpers/RouteNames";
import { useFetch } from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { BiRupee } from "react-icons/bi";
import { Link, useParams } from "react-router";
import Cards from "./Cards";
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, deleteRestId, setRestId } from "@/redux/cart.slice";
import { MdHighQuality } from "react-icons/md";
import { showToast } from "@/helpers/showToast";
function DishCard({ item, restaurantid }) {
  const [cartOpen, setCartOpen] = useState(false);
  const dispatch = useDispatch();
  let quantity;
  const [count, setCount] = useState(quantity);
  const cart = useSelector((state) => state.cart);
  const handleClick = (e, id) => {
    if (cart && cart.restId !== restaurantid) {
      showToast("error", "Cannot order from different restaruants at once");
      return;
    }
    if (count === 0) {
      setCartOpen(true);
      setCount(1);
    }
  };
  const handleDecrease = (e) => {
    e.stopPropagation();
    if (count === 1) {
      setCount((prev) => prev - 1);
      setCartOpen(false);
      dispatch(
        addItemsToCart({
          itemId: item._id,
          quantity: 0,
        })
      );
    } else {
      setCount((prev) => prev - 1);
    }
    return;
  };
  const handleIncrease = (e) => {
    e.stopPropagation();
    setCount((prev) => prev + 1);
  };
  let myCart = {};
  useEffect(() => {
    if (count >= 1) {
      myCart = {
        itemId: item._id,
        quantity: count,
      };
      dispatch(addItemsToCart(myCart));
    }
  }, [count]);
  useEffect(() => {
    const getQuantity = (item) => {
      const index = cart.items.find((i) => i.itemId === item._id);
      if (index) {
        return index.quantity;
      } else {
        return 0;
      }
    };
    quantity = getQuantity(item);
    quantity > 0 ? setCartOpen(true) : setCartOpen(false);
    quantity > 0 ? setCount(quantity) : setCount(0);
  }, []);
  return (
    <div
      className="flex flex-col gap-2 p-2 min-h-48  hover:-translate-y-1.5 duration-300 shadow-md rounded-2xl bg-amber-950/10 "
      key={item._id}
    >
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded mb-4">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={item.thumbImg}
          alt={item.name}
        />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-lg">{item.name}</p>
        <p className="text-lg flex items-center">
          <BiRupee />
          {item.price}
        </p>
      </div>
      <div className="flex justify-between items-center my-3">
        <button className="py-2 px-4 rounded-lg text-center shadow-lg text-lg font-bold text-gray-600  bg-white">
          <Link to={RouteItemDetails(restaurantid, item._id)}>
            View Details
          </Link>
        </button>
        <div
          onClick={(e) => handleClick(e, item._id)}
          className={`py-2 px-4 rounded-lg text-center shadow-lg text-lg w-28 font-bold ${
            cartOpen ? "border-amber-900 border-2" : "bg-amber-950  text-white"
          }`}
        >
          {cartOpen ? (
            <>
              <div className=" rounded-lg flex items-center justify-between">
                <button className="cursor-pointer" onClick={handleDecrease}>
                  <FiMinus />
                </button>
                <div>{count}</div>
                <button className="cursor-pointer" onClick={handleIncrease}>
                  <FaPlus />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="cursor-pointer">Add Cart</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RestaurantPage() {
  const { restaurantid } = useParams();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const userId = user?.user?._id;

  const { data: menuData, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/menu/get-restaurant-menu/${
      restaurantid ? restaurantid : ""
    }`,
    {
      method: "get",
      credentials: "include",
    },
    []
  );
  useEffect(() => {
    if (cart && cart.items.length === 0) {
      dispatch(setRestId(restaurantid));
    }
  }, []);
  return (
    <div className="pt-10 pb-10">
      <h1 className="font-bold md:text-2xl text-lg ">
        Place Your Order
        {menuData ? ` at ${menuData?.menu[0]?.restaurant?.name}` : "Now"}
      </h1>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-3 mt-2 border-t pt-5">
        {menuData && menuData?.menu?.length > 0 ? (
          <>
            {menuData?.menu.map((item) => {
              return (
                <DishCard
                  key={item._id}
                  item={item}
                  userId={userId}
                  restaurantid={restaurantid}
                />
              );
            })}
          </>
        ) : (
          <>
            <p className="font-semibold text-lg p-3">No Menu Items...</p>
          </>
        )}
      </div>
    </div>
  );
}
