import axios from "axios";

const API = axios.create({baseURL: 'https://restcountries.com/v3.1/'});

export default API;