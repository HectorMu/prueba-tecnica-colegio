import API from "./API";
import helpers from "@/helpers/fetchHelpers";

export const getAlumnGrades = async () => {
  try {
    const response = await fetch(
      `${API}/alumns_grade/listall`,
      helpers.authGetConfig()
    );

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getOnAlumnGrade = async (id) => {
  try {
    try {
      const response = await fetch(
        `${API}/alumns_grade/listone/${id}`,
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

export const saveAlumnGrade = async (payload) => {
  try {
    try {
      const response = await fetch(
        `${API}/alumns_grade/save/`,
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

export const editAlumnGrade = async (payload, id) => {
  try {
    try {
      const response = await fetch(
        `${API}/alumns_grade/update/${id}`,
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

export const deleteAlumnGrade = async (id) => {
  try {
    try {
      const response = await fetch(
        `${API}/alumns_grade/delete/${id}`,
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
