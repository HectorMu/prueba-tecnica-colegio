import IsAlreadyLogged from "@/components/Authentication/IsAlreadyLogged";

import Login from "@/pages/Auth/Login";

const auth = {
  dev: [
    {
      path: "/login",
      element: <Login />,
    },
  ],

  //Protected for production
  production: [
    {
      path: "/login",
      element: <IsAlreadyLogged view={Login} />,
    },
  ],
};

export default auth;
