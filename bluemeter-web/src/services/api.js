import axios from 'axios';

const prod = 1;

const url = (prod === 0 ? "http://localhost:3000" : "https://bluemeter-backend.herokuapp.com/");

const api = axios.create({
    baseURL: url
});

export default api;