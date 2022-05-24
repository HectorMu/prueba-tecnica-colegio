import IsLoggedIn from "@/components/Authentication/IsLoggedIn";

import Add from "@/pages/AlumnsGrades/Add";
import Edit from "@/pages/AlumnsGrades/Edit";
import List from "@/pages/AlumnsGrades/List";

const alumnsg = {
  dev: [
    {
      path: "/alumns-grades/",
      element: <List />,
    },
    {
      path: "/alumns-grades/add",
      element: <Add />,
    },
    {
      path: "/alumns-grades/edit/:id",
      element: <Edit />,
    },
  ],

  //Protected for production
  production: [
    {
      path: "/alumns-grades/",
      element: <IsLoggedIn view={List} />,
    },
    {
      path: "/alumns-grades/add",
      element: <IsLoggedIn view={Add} />,
    },
    {
      path: "/alumns-grades/edit/:id",
      element: <IsLoggedIn view={Edit} />,
    },
  ],
};

export default alumnsg;
