import IsLoggedIn from "@/components/Authentication/IsLoggedIn";

import authRoutes from "./auth";
import alumnsGradesRoutes from "./alumns.grades";
import alumnsRoutes from "./alumns";
import gradesRoutes from "./grades";
import professorRoutes from "./professor";

import Index from "@/pages/Index";

import NotFound from "@/pages/status/NotFound";

const index = {
  dev: [
    {
      path: "/",
      element: <Index />,
    },
    //all app routes
    ...authRoutes.dev,
    ...alumnsGradesRoutes.dev,
    ...alumnsRoutes.dev,
    ...gradesRoutes.dev,
    ...professorRoutes.dev,

    //not found
    {
      path: "*",
      element: <NotFound />,
    },
  ],

  //Protected for production
  production: [
    {
      path: "/",
      element: <IsLoggedIn view={Index} />,
    },

    //All app routes
    ...authRoutes.production,
    ...alumnsGradesRoutes.production,
    ...alumnsRoutes.production,
    ...gradesRoutes.production,
    ...professorRoutes.production,
    //Not found route
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};

export default index;
