import API from "./API";
import helpers from "@/helpers/fetchHelpers";

export const getGrades = async () => {
  try {
    const response = await fetch(
      `${API}/grade/listall`,
      helpers.authGetConfig()
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getOneGrade = async (id) => {
  try {
    try {
      const response = await fetch(
        `${API}/grade/listone/${id}`,
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

export const saveGrade = async (payload) => {
  try {
    try {
      const response = await fetch(
        `${API}/grade/save/`,
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

export const editGrade = async (payload, id) => {
  try {
    try {
      const response = await fetch(
        `${API}/grade/update/${id}`,
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

export const deleteGrade = async (id) => {
  try {
    try {
      const response = await fetch(
        `${API}/grade/delete/${id}`,
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
