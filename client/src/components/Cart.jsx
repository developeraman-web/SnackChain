import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import { TagVegOfNonVeg } from "@/pages/myrestaurant/DishDetails";
import { addItemsToCart } from "@/redux/cart.slice";
import React, { useEffect, useState } from "react";
import { BiRupee } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
function Items({ item }) {
  const [cartOpen, setCartOpen] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  let quantity;
  const [count, setCount] = useState(quantity);
  const handleClick = (e, id) => {
    e.stopPropagation();
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
    const getQuantity = (id) => {
      const itemExist = cart.items.find((i) => i.itemId === id);
      if (itemExist) {
        return itemExist.quantity;
      } else {
        return 0;
      }
    };
    quantity = getQuantity(item._id);
    quantity > 0 ? setCartOpen(true) : setCartOpen(false);
    quantity > 0 ? setCount(quantity) : setCount(0);
  }, [cart]);

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-4 border p-2 rounded-2xl">
      <div className="col-span-1">
        <img
          className="w-40 h-30 object-cover rounded-2xl"
          src={item?.thumbImg || ""}
          alt=""
        />
      </div>
      <div className="col-span-2 px-2 ">
        <div className="md:text-xl text-md font-semibold py-1 mb-0.5 flex justify-between items-center">
          <h3 className="flex gap-1 items-center">
            <TagVegOfNonVeg tag={item?.tag} />
            {item?.name}
          </h3>
          <div
            onClick={handleClick}
            className={`py-1 px-1 rounded-lg text-center shadow-lg text-lg w-24 font-bold ${
              cartOpen
                ? "border-amber-900 border-2"
                : "bg-amber-950  text-white"
            }`}
          >
            {" "}
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
        <span className="flex items-center text-md font-semibold mb-1 pb-1 ">
          Price : <BiRupee /> {item?.price}
        </span>
        <p className="text-gray-700">{item?.description}</p>
      </div>
    </div>
  );
}
export default function Cart({ items, getMenu }) {
  const cart = useSelector((state) => state.cart);
  const { data: itemData, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/menu/cart-dish/`,
    {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ items: items }),
    },
    [cart]
  );
  useEffect(() => {
    if (itemData) {
      getMenu(itemData.menu);
    }
  }, [items]);

  if (items.length < 1) {
    return <h2 className="p-3 font-semibold text-xl">No items in Cart</h2>;
  }

  return (
    <div className="px-2">
      {itemData &&
        itemData?.menu?.length > 0 &&
        itemData.menu.map((item) => {
          return <Items key={item._id} item={item} />;
        })}
      <div>
        <h1 className="py-2 text-xl font-semibold">Billing Details</h1>
        <div className="flex justify-between">
          <p>Items Total</p>
          <p className="flex items-center">
            <BiRupee />
            {itemData && itemData.total}
          </p>
        </div>
      </div>
    </div>
  );
}
