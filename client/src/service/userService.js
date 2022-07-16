import axios from "axios";

const url = process.env.REACT_APP_ENDPOINT;

//Login User
export const loginUser = async (data) => {
  try {
    const res = await axios.post(url + "api/auth", data);
    if (res.status === 200) {
      sessionStorage.setItem("token", res.data.token);
      return res.status;
    }
  } catch (err) {
    return err.response.data;
  }
};
export const preRegisterUser = async (data) => {
  try {
    const res = await axios.post(url + "api/prereg", data);
    if (res.status === 201) {
      return res;
    }
  } catch (err) {
    return err.response;
  }
};
export const codeUserVerification = async (temporal) => {
  try {
    const res = await axios.get(url + "api/prereg/"+temporal);
    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    return err.response;
  }
};

export const updateUser = async (data) => {
  try {
    const res = await axios.put(url + "api/users", data);
    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    return err.response;
  }
};

export const continueRegister = async (data) => {
  try {
    const res = await axios.get(url + "api/prereg", data);

    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
