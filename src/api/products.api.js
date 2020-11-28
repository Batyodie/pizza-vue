import { request } from "./generic.api";

const getProducts = (tagCategoryID, dropDownActive) =>
  request({
    url: `${tagCategoryID !== null ? `category=${tagCategoryID}` : ""}&_sort=${
      dropDownActive.type
    }&_order=${dropDownActive.order}`,
    method: "get",
  });

// const getProduct = () => request({ url: ``, method: "get" });

export { getProducts };
