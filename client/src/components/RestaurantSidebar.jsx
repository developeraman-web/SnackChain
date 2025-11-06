import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { BiFoodMenu } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import {
  RouteRestaurantDashboard,
  RouteRestaurantWiseOrder,
  RouteYourMenu,
} from "@/helpers/RouteNames";
import { CiDeliveryTruck } from "react-icons/ci";
export default function RestaurantSidebar() {
  const restaurant = useSelector((state) => state.restaurant);

  return (
    <Sidebar asChild>
      <SidebarHeader className={"pt-15"}></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key={""}>
                <SidebarMenuButton asChild>
                  <Link to={RouteRestaurantDashboard}>
                    <AiOutlineHome />
                    Home
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem key={""}>
                <SidebarMenuButton asChild>
                  <Link to={RouteYourMenu}>
                    <BiFoodMenu />
                    Your Menu
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem key={""}>
                <SidebarMenuButton asChild>
                  <Link to={RouteRestaurantWiseOrder}>
                    <CiDeliveryTruck />
                    All Orders
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
