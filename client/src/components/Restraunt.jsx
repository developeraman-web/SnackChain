import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GoEyeClosed } from "react-icons/go";
import { TagVegOfNonVeg } from "@/pages/myrestaurant/DishDetails";
import { Link } from "react-router";
import { RouteRestaurant } from "@/helpers/RouteNames";

export default function Restraunt() {
  const user = useSelector((state) => state.user);
  const id = user?.user?.campus?._id;
  const [campus, setCampus] = useState(id);
  const { data, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/business/get-all/${id ? id : ""}`,
    {
      method: "get",
      credentials: "include",
    },
    [campus]
  );
  useEffect(() => {
    if (id !== campus) {
      setCampus(id);
    }
  });

  return (
    <div className="pb-10">
      <h1 className="md:text-2xl text-md font-bold pb-5 pt-5 mb-2 mt-3 ">
        Recommended
      </h1>
      <div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-3  border-t py-3 ">
          {data &&
            data?.restaurants?.length > 0 &&
            data?.restaurants?.map((restaurant) => {
              return (
                <Link
                  key={restaurant?._id}
                  to={RouteRestaurant(restaurant?._id)}
                >
                  <div className="p-3 hover:shadow-lg duration-300 relative">
                    <div className="absolute top-10 right-10">
                      <TagVegOfNonVeg tag={restaurant?.tag} />
                    </div>
                    <div className="aspect-[16/9]">
                      <img
                        className="w-full h-full object-cover rounded-t-2xl"
                        src={restaurant?.restaurantFeatureImage}
                        alt=""
                      />
                    </div>
                    <div className="py-3 px-2">
                      <h2 className="md:text-xl font-bold mb-1 py-1 border-b border-gray-300">
                        {restaurant.name}
                      </h2>
                      <div className=" ">
                        {" "}
                        {restaurant.isOpen === "true" ? (
                          "Opened"
                        ) : (
                          <>
                            <span className="flex items-center gap-1 text-red-600">
                              <GoEyeClosed /> Currently Unavailable
                            </span>
                          </>
                        )}
                      </div>
                      <p className="py-2">
                        ratings: {restaurant.restaurantRating}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}
