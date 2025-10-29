import Footer from "@/components/menu/Footer";
import Topbar from "@/components/menu/Topbar";

import React from "react";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <Topbar />
      <div className="container">
        <main className="w-full">
          <div className="px-13 pt-12 w-full  min-h-screen">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
