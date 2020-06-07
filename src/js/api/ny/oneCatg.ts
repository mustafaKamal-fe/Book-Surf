import axios from "axios";
import { baseUrl } from "../../NyContext/NyContext";
import {
  nyRequest,
  list,
  ErrorResponse,
  oneCatgDataResponse,
} from "../../typed/TypedExports";

export const oneCatg = (
  data: nyRequest,
  encodedListName?: list
): Promise<ErrorResponse | oneCatgDataResponse> => {
  return axios
    .get(
      `${baseUrl}/lists/${data.date}/${
        encodedListName.list_name_encoded
      }.json?offset=${data.offset || 0}&api-key=${process.env.REACT_APP_NY_KEY}`
    )
    .then((res) => {
      if (res.status === 200) {
        res.data.date = data.date;
        res.data.searchProtocol = data.searchProtocol;
        return res.data;
      }
    })
    .catch((e) => {
      if (e.response) {
        // error with response from server
        if (e.response.status === 429) {
          return {
            error: true,
            errorIn: "response",
            message: "Please try searching books again in a few moments.",
          };
        }
        return {
          error: true,
          errorIn: "response",
          message:
            "No data found was found. Please try again later or change your search inputs.",
        };
      } else if (e.request) {
        // error with request from client
        return {
          error: true,
          errorIn: "request",
          message:
            "Please check your internet connection or try a different serach input.",
        };
      } else {
        // show error msg
        return {
          error: true,
          errorIn: "Request",
          message:
            "Please check your internet connection or try a different serach input.",
        };
      }
    });
};
