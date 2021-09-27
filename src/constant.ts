import { Dashboard } from "./Components/Dashboard";
import { LogIn } from "./Components/LogIn";
import { PageNotFound } from "./Components/NotFound";

export const routes = [
  { path: "/", component: Dashboard },
  {
    path: "/login",
    component: LogIn,
  },
  { path: "*", component: PageNotFound },
];

export enum SortOrder{
    ASC = "asc",
    DESC = "desc"
}

export type FieldSortOrder = SortOrder.ASC | SortOrder.DESC;