import axios from "axios";

// url path on the port of which the json fake server with pizza data is located.
// We make a request to it through the axios methods
const API_URL = "/pizzas?";

// We create and export a function that acts as a constructor,
// where we pass data(url is a set of variables that we take from the store,
// they are responsible for sorting and filtering pizzas, method is an axios get request, date is a response promise)
export const request = async ({ url, method, data = {} }) => {
  const response = await axios[method](`${API_URL}${url} `, data);
  return response.data;
};
// the process of getting pizzas itself is a simple get request in which we concatenate
// the string where the sorting and filtering elements are located fake json server with the API_URL constant
