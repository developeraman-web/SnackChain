import Appsidebar from "@/components/Appsidebar";
import Footer from "@/components/menu/Footer";
import Topbar from "@/components/menu/Topbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router";

export default function SideBarLayout() {
  return (
    <SidebarProvider>
      <Appsidebar />
      <main className="w-full">
        <div className="px-13 py-12 w-full  min-h-screen">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
