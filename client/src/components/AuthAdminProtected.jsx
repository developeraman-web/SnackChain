import { RouteIndex } from "@/helpers/RouteNames";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export default function AuthAdminProtected() {
  const user = useSelector((state) => state.user);
  if (user && user.user.role === "admin") {
    return <Outlet />;
  }
  return (
    <div>
      <Navigate to={RouteIndex} />
    </div>
  );
}
