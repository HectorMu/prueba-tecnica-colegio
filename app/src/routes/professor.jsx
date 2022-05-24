import IsLoggedIn from "@/components/Authentication/IsLoggedIn";

import Add from "@/pages/Professor/Add";
import Edit from "@/pages/Professor/Edit";
import List from "@/pages/Professor/List";

const prof = {
  dev: [
    {
      path: "/professor/",
      element: <List />,
    },
    {
      path: "/professor/add",
      element: <Add />,
    },
    {
      path: "/professor/edit/:id",
      element: <Edit />,
    },
  ],

  //Protected for production
  production: [
    {
      path: "/professor/",
      element: <IsLoggedIn view={List} />,
    },
    {
      path: "/professor/add",
      element: <IsLoggedIn view={Add} />,
    },
    {
      path: "/professor/edit/:id",
      element: <IsLoggedIn view={Edit} />,
    },
  ],
};

export default prof;
