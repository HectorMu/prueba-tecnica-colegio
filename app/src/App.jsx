import Aos from "aos";
import { useEffect } from "react";
import "../../node_modules/aos/dist/aos.css";
import "../../node_modules/sweetalert2/dist/sweetalert2.css";
import "./css/main.css";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Global/Layout";
import AppRoutes from "./routes/";
import SessionContextProvider from "./context/SessionContextProvider";

function App() {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div>
      <SessionContextProvider>
        <Layout>
          <Routes>
            {/* <Route path="/" element={<IsAlreadyLogged view={Index} />} /> */}
            {/* <Route path="/home" element={<IsLoggedIn view={Home} />} /> */}
            {AppRoutes.production.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </Layout>
        <Toaster />
      </SessionContextProvider>
    </div>
  );
}

export default App;
