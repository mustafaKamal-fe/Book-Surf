/**NY times list of categories 'names context
 * the AJAX call below is fetching those names at the very first load to be
 * used throughout the App
 */

import { createContext } from "react";
import axios from "axios";
import { ErrorResponse } from "../typed/TypedExports";

type nyNamesList = {
  display_name: string;
  list_name: string;
  list_name_encoded: string;
  updated: string;
}[];

export const baseUrl = "https://api.nytimes.com/svc/books/v3";
export const NyList = createContext([]);
export let names: Promise<nyNamesList & ErrorResponse> = axios
  .get(`${baseUrl}/lists/names.json?api-key=${process.env.REACT_APP_NY_KEY}`)
  .then((resp) => {
    if (resp.status === 200) {
      return resp.data.results;
    }
  })
  .catch((e) => {
    if (e.response) {
      // error with response from server
      if (e.response.status === 429) {
        return {
          error: true,
          errorIn: "response",
          message:
            "Too many request!. Please Try again after a few seconds... This is a free service after all.",
        };
      }
      return {
        error: true,
        errorIn: "response",
        message:
          "No data found for this search. please try again later or change your search value",
      };
    } else if (e.request) {
      // error with request from client
      return {
        error: true,
        errorIn: "request",
        message:
          "Check your internet connection or try a different serach value",
      };
    } else {
      // show error msg
      return {
        error: true,
        errorIn: "random",
        message: "Check your internet connection or try different serach value",
      };
    }
  });
