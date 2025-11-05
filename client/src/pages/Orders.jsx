import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getEnv } from "@/helpers/getEnv";
import { useFetch } from "@/hooks/useFetch";
import moment from "moment";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router";

export default function Orders() {
  const user = useSelector((state) => state.user);
  const { data: orderData, loading } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/order/show-my-order/${
      user ? user.user._id : ""
    }`,
    {
      method: "get",
      credentials: "include",
    },
    []
  );
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="py-5">
      <Card>
        <CardContent>
          <Table className={"overflow-x-auto"}>
            <TableCaption>My Orders</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Order Id</TableHead>
                <TableHead>Restaurant</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Ordered on</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderData && orderData.orders && orderData.orders.length > 0 ? (
                <>
                  {orderData?.orders?.map((order, index) => {
                    return (
                      <TableRow key={order._id}>
                        <TableCell>{order._id}</TableCell>
                        <TableCell>{order.restaurant.name}</TableCell>
                        <TableCell
                          className={"whitespace-normal break-words max-w-xs"}
                        >
                          <ul className="list-decimal">
                            {order.orderItems.map((item) => {
                              return (
                                <li
                                  className="block p-1 list-disc"
                                  key={item._id}
                                >
                                  {item.menu.name}{" "}
                                  <span className="font-bold text-amber-800">
                                    x {item?.quantity}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </TableCell>

                        <TableCell>
                          {moment(order?.createdAt).format("DD-MM-YYYY")}
                        </TableCell>
                        <TableCell>{order?.orderStatus || "Pending"}</TableCell>
                      </TableRow>
                    );
                  })}
                </>
              ) : (
                <>
                  <TableRow>
                    <TableCell colSpan={"3"}>Data not found</TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
