import Appsidebar from "@/components/Appsidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <>
      <SidebarProvider>
        <Appsidebar />
        <main className="w-full">
          <div className="w-full px-24 py-24">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </>
  );
}
