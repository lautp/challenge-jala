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
