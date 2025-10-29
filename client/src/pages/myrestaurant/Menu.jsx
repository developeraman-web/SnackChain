import { Button } from "@/components/ui/button";
import { getEnv } from "@/helpers/getEnv";
import { RouteAddDish, RouteDishDetails } from "@/helpers/RouteNames";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { BiRupee } from "react-icons/bi";
import { MdRestaurantMenu } from "react-icons/md";

export default function Menu() {
  const restaurant = useSelector((state) => state.restaurant);
  const { data: menuData, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/menu/get-restaurant-menu/${
      restaurant ? restaurant.restaurant._id : ""
    }`,
    {
      method: "get",
      credentials: "include",
    }
  );

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="">
      <h1 className="md:text-3xl text-lg flex items-center gap-1 font-bold mb-3 border-b ">
        <MdRestaurantMenu color="chocolate" />
        Menu
      </h1>
      <div className="flex justify-center items-center gap-15 py-2">
        <h3 className="md:text-xl text-md font-semibold ">
          Want to add more dish?
        </h3>
        <Button asChild className={"animate-pulse hover:animate-none"}>
          <Link className="" to={RouteAddDish}>
            Add New Dish!
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-3 mt-10 border-t pt-5">
        {menuData && menuData?.menu?.length > 0 ? (
          <>
            {menuData?.menu.map((item) => {
              return (
                <Link to={RouteDishDetails(item._id)}>
                  <div
                    className="flex flex-col gap-2 p-2 min-h-48  hover:-translate-y-1.5 duration-300 shadow-md rounded-2xl bg-amber-950/10"
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
                  </div>
                </Link>
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
