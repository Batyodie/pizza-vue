// import request func from generic api
import { request } from "./generic.api";

// we pass data to the request function that is responsible for sorting and filtering in the store
const getProducts = (tagCategoryID, dropDownActive) =>
  request({
    // url the string we send
    url: `${tagCategoryID !== null ? `category=${tagCategoryID}` : ""}&_sort=${
      dropDownActive.type
    }&_order=${dropDownActive.order}`,
    // axios method
    method: "get"
  });

// exporting the function to work
export { getProducts };
