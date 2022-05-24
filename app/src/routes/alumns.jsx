import IsLoggedIn from "@/components/Authentication/IsLoggedIn";

import Add from "@/pages/Alumns/Add";
import Edit from "@/pages/Alumns/Edit";
import List from "@/pages/Alumns/List";

const alumns = {
  dev: [
    {
      path: "/alumns/",
      element: <List />,
    },
    {
      path: "/alumns/add",
      element: <Add />,
    },
    {
      path: "/alumns/edit/:id",
      element: <Edit />,
    },
  ],

  //Protected for production
  production: [
    {
      path: "/alumns/",
      element: <IsLoggedIn view={List} />,
    },
    {
      path: "/alumns/add",
      element: <IsLoggedIn view={Add} />,
    },
    {
      path: "/alumns/edit/:id",
      element: <IsLoggedIn view={Edit} />,
    },
  ],
};

export default alumns;
