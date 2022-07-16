import axios from "axios";
import setAuthToken from "../utils/setAuthToken";


const url = process.env.REACT_APP_ENDPOINT;

//Create Contact with JWT
export const createContact = async (name,mail) => {
    setAuthToken(sessionStorage.token);
    const data = {
        name: name,
        email: mail,
    }
   
    try {
        const res = await axios.post(url+"api/contact", data);
        if (res.status === 200) {
            return res;
        }
    } catch (err) {
        return err.response;
    }   
}
export const getContacts = async () => {
    setAuthToken(sessionStorage.token);
    try {
        const res = await axios.get(url+"api/contact");
        if (res.status === 200) {
            return res;
        }
    } catch (err) {
        return err.response;
    }
}