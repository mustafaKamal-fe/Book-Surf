import axios from "axios";
import {
  googleRequest,
  ErrorResponse,
  DataResponse,
} from "../../../typed/TypedExports";

const editUserInput = (text: string): string => {
  let modify = text.trim();
  modify = modify.split(" ").join("+");
  return modify;
};

function filterBooks(book: any): boolean {
  if (
    book.volumeInfo.title !== undefined &&
    book.volumeInfo.authors !== undefined &&
    book.volumeInfo.imageLinks.thumbnail !== undefined
  ) {
    return true;
  }
}

const GoogleSearch = (
  data: googleRequest
): Promise<ErrorResponse | DataResponse> => {
  if (data.userText !== undefined) {
    data.userText = editUserInput(data.userText);
  } else {
    data.words = editUserInput(data.words);
  }
  const baseUrl = "https://www.googleapis.com/books/v1/volumes?q=";
  if (data.searchProtocol.method === "standard") {
    return axios
      .get(
        `${baseUrl}${data.userText}&startIndex=${data.startIndex || 0}&key=${
          process.env.REACT_APP_GOOGLE_KEY
        }`
      )
      .then((resp) => {
        if (resp.status === 200) {
          resp.data.searchProtocol = data.searchProtocol;
          resp.data.userText = data.userText;
          return resp.data;
        }
      })
      .catch((e) => {
        if (e.response) {
          // error with response from server
          return {
            error: e.response,
            errorIn: "Response",
            message:
              "No data found was found for this search. Please try again later or change your search inputs.",
          };
        } else if (e.request) {
          // error with request from client
          return {
            error: e.request,
            errorIn: "Request",
            message:
              "Please check your internet connection or try a different serach value.",
          };
        } else {
          // show error msg
          return {
            error: e,
            errorIn: "Request",
            message:
              "Please check your internet connection or try a different serach value.",
          };
        }
      });
  } else {
    return axios
      .get(
        `${baseUrl}${data.words}&startIndex=${data.startIndex || 0}&key=${
          process.env.REACT_APP_GOOGLE_KEY
        }`
      )
      .then((resp) => {
        if (resp.status === 200) {
          resp.data.searchProtocol = data.searchProtocol;
          resp.data.words = data.words;
          resp.data.items = resp.data.items.filter(filterBooks);
          return resp.data;
        }
      })
      .catch((e) => {
        if (e.response) {
          // error with response from server
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
              "Please Check your internet connection or try a different serach input.",
          };
        } else {
          // show error msg
          return {
            error: true,
            errorIn: "random",
            message:
              "Please check your internet connection or try a different serach input",
          };
        }
      });
  }
};

export default GoogleSearch;
