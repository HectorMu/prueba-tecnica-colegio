import API from "./API";
import helpers from "@/helpers/fetchHelpers";

export const getProfessors = async () => {
  try {
    const response = await fetch(
      `${API}/professors/listall`,
      helpers.authGetConfig()
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getOneProfessor = async (id) => {
  try {
    try {
      const response = await fetch(
        `${API}/professors/listone/${id}`,
        helpers.authGetConfig()
      );

      return await response.json();
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveProfessor = async (payload) => {
  try {
    try {
      const response = await fetch(
        `${API}/professors/save/`,
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

export const editProfessor = async (payload, id) => {
  try {
    try {
      const response = await fetch(
        `${API}/professors/update/${id}`,
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

export const deleteProfessor = async (id) => {
  try {
    try {
      const response = await fetch(
        `${API}/professors/delete/${id}`,
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
