import API from "./API";
import helpers from "@/helpers/fetchHelpers";

export const Login = async (credentials) => {
  try {
    const response = await fetch(
      `${API}/login`,
      helpers.postConfig(credentials)
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const Logout = () => window.localStorage.removeItem("scSession");
