// axios interceptors
import axios from "axios";
import { AppURL } from "../config/variables";
// store
import { store } from "../store";
import { setValues } from "../store/general";

/**
 * axios instance
 */
export const AppMS = axios.create({
  baseURL: AppURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

// request header
AppMS.interceptors.request.use((config) => {
  store.dispatch(setValues({isLoading: true}));
  return config;
}, error => {
  return Promise.reject(error);
})

// response parse
AppMS.interceptors.response.use((response) => {
  store.dispatch(setValues({isLoading: false}));
  return response;
}, error => {
  store.dispatch(setValues({isLoading: false, error: "An internal error occurred during your request!"}));
  console.warn('Error status', error.response.status);
  // return Promise.reject(error)
  if (error.response) { 
    return error.response;
  } else {
    return Promise.reject(error);
  }
})