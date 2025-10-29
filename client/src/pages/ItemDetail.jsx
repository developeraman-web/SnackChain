import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { TagVegOfNonVeg } from "./myrestaurant/DishDetails";
import { BiRupee } from "react-icons/bi";
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteRestId, setRestId } from "@/redux/cart.slice";

export default function ItemDetail() {
  const { restaurantid: restaurantId, id } = useParams();
  const dispatch = useDispatch();
  const [cartOpen, setCartOpen] = useState(false);
  const [count, setCount] = useState(1);
  const handleClick = (e, id) => {
    setCartOpen(true);
  };
  const handleDecrease = (e) => {
    e.stopPropagation();
    if (count === 1) {
      setCartOpen(false);
    } else {
      setCount((prev) => prev - 1);
    }
    return;
  };
  const handleIncrease = (e) => {
    e.stopPropagation();
    setCount((prev) => prev + 1);
  };
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
                onClick={(e) => handleClick(e, id)}
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
                    <div className="cursor-pointer">Add Cart</div>
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
