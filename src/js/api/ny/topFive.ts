import axios from "axios";
import { baseUrl } from "../../NyContext/NyContext";
import {
  TopFiveErrorResponse,
  TopFivenoData,
  TopFiveresultedList,
  nyRequest,
} from "../../typed/TypedExports";

export const topFive = (
  data: nyRequest
): Promise<TopFiveErrorResponse | TopFivenoData | TopFiveresultedList> => {
  return axios
    .get(
      `${baseUrl}/lists/overview.json?api-key=${process.env.REACT_APP_NY_KEY}`
    )
    .then((res) => {
      if (res.status === 200) {
        let resultedList = res.data.results.lists.find(
          (list: any) => list.display_name === data.list
        );
        if (resultedList === undefined) {
          return {
            isNotAvailable: true,
            searchProtocol: data.searchProtocol.method,
          };
        }

        resultedList.searchProtocol = data.searchProtocol;
        return resultedList;
      }
    })
    .catch((e) => {
      if (e.response) {
        // error with response from server
        if (e.response.status === 429) {
          return {
            error: true,
            errorIn: "response",
            message: "Please try again in a few moments.",
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
            "Please check your internet connection or try different serach input.",
        };
      }
    });
};
