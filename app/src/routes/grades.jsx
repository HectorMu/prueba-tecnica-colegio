import IsLoggedIn from "@/components/Authentication/IsLoggedIn";

import Add from "@/pages/Grades/Add";
import Edit from "@/pages/Grades/Edit";
import List from "@/pages/Grades/List";

const grades = {
  dev: [
    {
      path: "/grades",
      element: <List />,
    },
    {
      path: "/grades/add",
      element: <Add />,
    },
    {
      path: "/grades/edit/:id",
      element: <Edit />,
    },
  ],

  //Protected for production
  production: [
    {
      path: "/grades",
      element: <IsLoggedIn view={List} />,
    },
    {
      path: "/grades/add",
      element: <IsLoggedIn view={Add} />,
    },
    {
      path: "/grades/edit/:id",
      element: <IsLoggedIn view={Edit} />,
    },
  ],
};

export default grades;
