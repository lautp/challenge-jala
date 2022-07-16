import axios from "axios";

const url = process.env.REACT_APP_ENDPOINT;

//Create Contact with JWT
export const createContact = async (name,mail) => {
    const data = {
        name: name,
        mail: mail,
    }
    try {
        const res = await axios.post(url+"api/contact", data);
        if (res.status === 201) {
            return res;
        }
    } catch (err) {
        return err.response;
    }   
}
    