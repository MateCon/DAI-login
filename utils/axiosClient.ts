import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://api.spoonacular.com",
});

export const login = async (email: string, password: string) => {
    return axios.post('http://challenge-react.alkemy.org/', { email, password })
        .then(res => {
            if (res.status < 300) return res.data;
            else console.log(`Response with status code ${res.status}`);
        })
        .catch(err => {
            console.log(err);
        })
}

export const getPlatos = async (query: string) => {
    return axiosClient.get('/recipes/complexSearch')
        .then(res => {
            if (res.status < 300) return res.data;
            else console.log(`Response with status code ${res.status}`);
        })
        .catch(err => {
            console.log(err);
        })
}
