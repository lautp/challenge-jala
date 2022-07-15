import axios from "axios";

const url = process.env.REACT_APP_ENDPOINT;

//Login User
export const loginUser = async (data) => {
    try {
        const res = await axios.post(url+"api/auth", data);
        if (res.status === 200) {
            sessionStorage.setItem("token", res.data.token);
            return res.data;
        }
    } catch (err) {
        return err.response.data;
    }
};
export const preRegisterUser = async (data) => {
    try {
        const res = await axios.post(url+"api/prereg", data);
        if (res.status === 201) {
            return res;
        }
    } catch (err) {
        return err.response;
    }   
}

export const registerUser = async (data) => {
    try {
        const res = await axios.post(url+"api/auth/register", data);
        console.log(res);
        if (res.status === 200) {
            sessionStorage.setItem("token", res.data.token);
            return res.data;
        }
    } catch (err) {
        return err.response.data;
    }
}