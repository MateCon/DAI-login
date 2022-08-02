import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://challenge-react.alkemy.org",
});

export const login = async (email: string, password: string) => {
    return axiosClient.post('/', { email, password })
        .then(res => {
            if (res.status < 300) return res.data;
            else console.log(`Response with status code ${res.status}`);
        })
        .catch(err => {
            console.log(err);
        })
}