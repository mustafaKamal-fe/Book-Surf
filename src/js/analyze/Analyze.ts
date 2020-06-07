/** call the right api : NY, Google or Goodread */
import { nyTimesApi } from "../api/ny/nyTimesApi";
import GoogleSearch from "../api/ny/google/GoogleSearch";
import {
  oneCatgDataResponse,
  DataResponse,
  TopFiveErrorResponse,
  TopFivenoData,
  TopFiveresultedList,
  ErrorResponse,
  allBestDataResponse,
  googleRequest,
  nyRequest,
} from "../typed/TypedExports";

export const Analyze = (
  data: googleRequest | nyRequest
): Promise<
  | TopFiveErrorResponse
  | TopFivenoData
  | TopFiveresultedList
  | ErrorResponse
  | allBestDataResponse
  | oneCatgDataResponse
  | DataResponse
> => {
  // call the right api : NY, Google or Goodread

  // using type predicates
  function isNy(data: googleRequest | nyRequest): data is nyRequest {
    return (data as nyRequest).searchProtocol.api === "ny";
  }
  function isGoogle(data: googleRequest | nyRequest): data is googleRequest {
    return (data as googleRequest).searchProtocol.api === "google";
  }

  if (isNy(data)) {
    return nyTimesApi(data).then((resp: any) => {
      resp.apiOrigin = "ny";
      return resp;
    });
  }

  if (isGoogle(data)) {
    return GoogleSearch(data).then((resp) => {
      resp.apiOrigin = "google";
      return resp;
    });
  }

  return GoogleSearch(data).then((resp) => {
    resp.apiOrigin = "google";
    return resp;
  });
};
