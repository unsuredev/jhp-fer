import { ROUTES } from "definitions/constant/routes";
import * as React from "react";
// component
import Iconify from "../components/Iconify";

// ----------------------------------------------------------------------

export interface INavConfig {
  title: string;
  path: string;
  icon: React.ReactNode;
}

const getIcon = (name: string) => (
  <Iconify icon={name} width={22} height={22} />
);

export const systemUserNavConfig: INavConfig[] = [
  {
    title: "dashboard",
    path: ROUTES.dashboard,
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "Company",
    path: ROUTES.company,
    icon: getIcon("fluent:building-bank-28-filled"),
  },
];

export const userNavConfig: INavConfig[] = [
  {
    title: "dashboard",
    path: ROUTES.dashboard,
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "user",
    path: "/user",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "Customer",
    path: "/customer1",
    icon: getIcon("fa-solid:users"),
  },
  {
    title: "Daily Reports",
    path: "/report",
    icon: getIcon("ic:baseline-sim-card-download"),
  },
  {
    title: "File upload",
    path: "/uploads",
    icon: getIcon("material-symbols:cloud-upload"),
  },
  {
    title: "Salnes & Connection",
    path: "/uploads2",
    icon: getIcon("fluent:arrow-growth-20-filled"),
  },
  {
    title: "Refil Sale",
    path: "/customer3",
    icon: getIcon("entypo:shop"),
  },
  {
    title: "Transacton",
    path: "/customer4",
    icon: getIcon("heroicons:currency-rupee-20-solid"),
  },
  {
    title: "Trash Consumer",
    path: "/trash",
    icon: getIcon("ri:delete-bin-5-line"),
  },
  {
    title: "Products",
    path: "/customer5",
    icon: getIcon("ps:sale-tag"),
  },
  {
    title: "Orders",
    path: "/customer6",
    icon: getIcon("material-symbols:order-approve"),
  },
];
