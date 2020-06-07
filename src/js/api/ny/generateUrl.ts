import { baseUrl } from "../../NyContext/NyContext";
import { nyRequest, keyedNyRequest } from "../../typed/TypedExports";

export const generateUrl = (data: nyRequest): string => {
  let str = `${baseUrl}/lists/best-sellers/history.json?`;
  let updated = false;

  let keyedNyRequestObj: keyedNyRequest = {
    publisher: data.publisher,
    author: data.author,
    price: data.price,
    contributor: data.contributor,
    title: data.title,
  };

  Object.keys(keyedNyRequestObj).forEach((key, i) => {
    if (i !== 0 && i !== 1) {
      if (keyedNyRequestObj[key].length > 0) {
        updated = true;
        str += `&${key}=${keyedNyRequestObj[key]}`;
      }
    }
  });
  str += `&offset=${data.index || 0}&api-key=${process.env.REACT_APP_NY_KEY}`;

  return updated ? str.replace("&", "") : str;
};
