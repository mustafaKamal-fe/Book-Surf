import axios from "axios";
import { generateUrl } from "./generateUrl";
import {
  nyRequest,
  ErrorResponse,
  allBestDataResponse,
} from "../../typed/TypedExports";

export const allBest = (
  data: nyRequest
): Promise<ErrorResponse | allBestDataResponse> => {
  return axios
    .get(generateUrl(data))
    .then((resp) => {
      if (resp.status === 200) {
        resp.data.publisher = data.publisher;
        resp.data.author = data.author;
        resp.data.price = data.price;
        resp.data.contributor = data.contributor;
        resp.data.title = data.title;
        resp.data.searchProtocol = data.searchProtocol;
        return resp.data;
      }
    })
    .catch((e) => {
      if (e.response) {
        // error with response from server
        if (e.response.status === 429) {
          return {
            error: true,
            errorIn: "response",
            message: "Please try searching books in a few minutes.",
          };
        }
        return {
          error: true,
          errorIn: "response",
          message:
            "No data was found for this search. Please try again later or change your search inputs.",
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
            "Please Check your internet connection or try a different serach value",
        };
      }
    });
};
