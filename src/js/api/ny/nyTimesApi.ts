// import { baseUrl } from "../../NyContext/NyContext";
// import axios from "axios";
import { oneCatg } from "./oneCatg";
import { topFive } from "./topFive";
import { allBest } from "./allBest";
import { names } from "../../NyContext/NyContext";

import {
  nyRequest,
  TopFiveErrorResponse,
  TopFivenoData,
  TopFiveresultedList,
  ErrorResponse,
  list,
  allBestDataResponse,
  oneCatgDataResponse,
} from "../../typed/TypedExports";

// this is an array of lists. each list is n object with these props
type nyNamesList = {
  display_name: string;
  list_name: string;
  list_name_encoded: string;
  updated: string;
}[];

export const nyTimesApi = (
  data: nyRequest
): Promise<
  | TopFiveErrorResponse
  | TopFivenoData
  | TopFiveresultedList
  | ErrorResponse
  | allBestDataResponse
  | oneCatgDataResponse
> => {
  if (data.searchProtocol.method === "one-catg") {
    return names.then((resp) => {
      if (resp.error) {
        return oneCatg(data);
      } else {
        let encodedListName: list = resp.find(
          (list: list) => list.display_name === data.list
        );
        // one-catg
        return oneCatg(data, encodedListName);
      }
    });
  }
  // top-five
  if (data.searchProtocol.method === "top-five") {
    return topFive(data);
  }

  // All-best
  if (data.searchProtocol.method === "all-best") {
    return allBest(data);
  }
};
