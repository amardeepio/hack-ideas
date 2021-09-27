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
