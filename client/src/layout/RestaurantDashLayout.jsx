import Footer from "@/components/menu/Footer";
import Topbar from "@/components/menu/Topbar";
import RestaurantSidebar from "@/components/RestaurantSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router";

export default function RestaurantDashLayout() {
  return (
    <SidebarProvider>
      <Topbar />
      <RestaurantSidebar />
      <main className="w-full">
        <div className="px-13 py-20 w-full min-h-screen">
          <Outlet />
        </div>
      </main>
      <Footer />
    </SidebarProvider>
  );
}
