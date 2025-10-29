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
import { RouteCampusDetails } from "@/helpers/RouteNames";
export default function Appsidebar() {
  const user = useSelector((state) => state.user);
  if (user && user.role === "user") {
    return (
      <Sidebar asChild>
        <SidebarHeader className={"pt-32"}>Menu</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem key={""}>
                  <SidebarMenuButton asChild>
                    <a href={""}>
                      <span>{"hello"}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem key={""}>
                  <SidebarMenuButton asChild>
                    <a href={""}>
                      <span>{"hello"}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
  }
  return (
    <Sidebar asChild>
      <SidebarHeader className={"pt-32"}></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key={""}>
                <SidebarMenuButton asChild>
                  <Link to={RouteCampusDetails}>Campus</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem key={""}>
                <SidebarMenuButton asChild>
                  <Link to={""}>All Restraunts</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
