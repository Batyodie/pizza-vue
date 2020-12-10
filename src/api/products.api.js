import { request } from "./generic.api";

const getProducts = (tagCategoryID, dropDownActive) =>
  request({
    url: `${tagCategoryID !== null ? `category=${tagCategoryID}` : ""}&_sort=${
      dropDownActive.type
    }&_order=${dropDownActive.order}`,
    method: "get",
  });

export { getProducts };
