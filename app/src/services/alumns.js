import API from "./API";
import helpers from "@/helpers/fetchHelpers";

export const getAlumns = async () => {
  try {
    const response = await fetch(
      `${API}/alumns/listall`,
      helpers.authGetConfig()
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getOneAlumn = async (id) => {
  try {
    const response = await fetch(
      `${API}/alumns/listone/${id}`,
      helpers.authGetConfig()
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const saveAlumn = async (payload) => {
  try {
    try {
      const response = await fetch(
        `${API}/alumns/save/`,
        helpers.authPostConfig(payload)
      );

      return await response.json();
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const editAlumn = async (payload, id) => {
  try {
    try {
      const response = await fetch(
        `${API}/alumns/update/${id}`,
        helpers.authPutConfig(payload)
      );

      return await response.json();
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteAlumn = async (id) => {
  try {
    try {
      const response = await fetch(
        `${API}/alumns/delete/${id}`,
        helpers.authDeleteConfig()
      );

      return await response.json();
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};
