import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { TagVegOfNonVeg } from "./myrestaurant/DishDetails";
import { BiRupee } from "react-icons/bi";
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, deleteRestId, setRestId } from "@/redux/cart.slice";
import { showToast } from "@/helpers/showToast";

export default function ItemDetail() {
  const { restaurantid: restaurantId, id } = useParams();
  const [cartOpen, setCartOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let quantity;
  const [count, setCount] = useState(quantity);
  const cart = useSelector((state) => state.cart);
  const handleClick = (e, id) => {
    if (user && !user.isLoggedIn) {
      return showToast("error", "Please Login");
    }
    if (cart && cart.restId !== restaurantId) {
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
          itemId: id,
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
        itemId: id,
        quantity: count,
      };
      dispatch(addItemsToCart(myCart));
    }
  }, [count]);
  useEffect(() => {
    const getQuantity = (id) => {
      const index = cart.items.find((i) => i.itemId === id);
      if (index) {
        return index.quantity;
      } else {
        return 0;
      }
    };
    quantity = getQuantity(id);
    quantity > 0 ? setCartOpen(true) : setCartOpen(false);
    quantity > 0 ? setCount(quantity) : setCount(0);
  }, []);
  const { data: itemData, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/menu/get-dish/${id ? id : ""}`,
    {
      method: "get",
      credentials: "include",
    },
    []
  );
  useEffect(() => {
    dispatch(setRestId(restaurantId));
    () => dispatch(deleteRestId());
  });
  if (loading) {
    return <div>Loading....</div>;
  }
  return (
    <div className="pt-10">
      <section>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 border p-2 rounded-2xl">
          <div className="col-span-1">
            <img
              className="w-72 h-60 object-cover rounded-2xl"
              src={itemData ? itemData?.menu?.thumbImg : ""}
              alt=""
            />
          </div>
          <div className="col-span-2 px-2 ">
            <h3 className="md:text-3xl text-lg font-semibold py-2 mb-1 flex gap-1 items-center">
              <TagVegOfNonVeg tag={itemData?.menu?.tag} />
              {itemData?.menu?.name}
            </h3>
            <span className="flex items-center text-md font-semibold mb-3 pb-2 ">
              Price : <BiRupee /> {itemData?.menu?.price}
            </span>
            <p className="text-gray-700">{itemData?.menu?.description}</p>
            <div className="flex justify-end mt-3">
              <div
                className={`py-2 px-4 rounded-lg text-center shadow-lg text-lg w-28 font-bold ${
                  cartOpen
                    ? "border-amber-900 border-2"
                    : "bg-amber-950  text-white"
                }`}
              >
                {cartOpen ? (
                  <>
                    <div className=" rounded-lg flex items-center justify-between">
                      <button
                        className="cursor-pointer"
                        onClick={handleDecrease}
                      >
                        <FiMinus />
                      </button>
                      <div>{count}</div>
                      <button
                        className="cursor-pointer"
                        onClick={handleIncrease}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      onClick={(e) => handleClick(e, id)}
                      className="cursor-pointer"
                    >
                      Add Cart
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
