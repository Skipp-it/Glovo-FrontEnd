import Axios from "axios";

export const axios = Axios.create({
  baseURL: process.env.REACT_APP_EXTERNAL_URL,
});

export const axiosSpring = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

