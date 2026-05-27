import { createHashRouter } from "react-router";
import { AdminLayout } from "./components/admin/AdminLayout";
import { ClientLayout } from "./components/client/ClientLayout";
import { Login } from "./components/Login";
import { AdminUsers } from "./components/admin/AdminUsers";
import { AdminProperties } from "./components/admin/AdminProperties";
import { AdminSales } from "./components/admin/AdminSales";
import { ClientProperties } from "./components/client/ClientProperties";
import { ClientPropertyDetail } from "./components/client/ClientPropertyDetail";
import { ClientPurchases } from "./components/client/ClientPurchases";

export const router = createHashRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminUsers },
      { path: "users", Component: AdminUsers },
      { path: "properties", Component: AdminProperties },
      { path: "sales", Component: AdminSales },
    ],
  },
  {
    path: "/client",
    Component: ClientLayout,
    children: [
      { index: true, Component: ClientProperties },
      { path: "properties", Component: ClientProperties },
      { path: "properties/:id", Component: ClientPropertyDetail },
      { path: "purchases", Component: ClientPurchases },
    ],
  },
]);
