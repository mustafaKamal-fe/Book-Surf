/**
 * Typescript Library used across the App
 */

/**
 * Common Exports
 */

// google/ny Error interface
export interface ErrorResponse {
  apiOrigin?: "google";
  error: boolean;
  errorIn: string;
  message: string;
}

/**
 * **************GOOOGLE EXPORTS***************
 */
// Google Request
export interface googleRequest {
  searchProtocol: {
    api: "google";
    method: "random" | "standard";
  };
  words?: string;
  userText?: string;
  startIndex?: number;
}

//google response inteface
export interface DataResponse {
  apiOrigin: "google";
  items?: {}[];
  kind?: string;
  searchProtocol: { api: "google"; method: "standard" | "random" };
  totalItems?: number;
  userText?: string;
  words?: string;
}

/**
 **************NY Times Exports****************
 */

// this one list object
export interface list {
  display_name: string;
  list_name: string;
  list_name_encoded: string;
  updated: string;
}

export interface TopFiveErrorResponse {
  error: boolean;
  errorIn: string;
  message: string;
}
export interface TopFivenoData {
  isNotAvailable: boolean;
  searchProtocol: "top-five";
}

export interface TopFiveresultedList {
  apiOrigin: string;
  books: [];
  display_name: string;
  list_id: number;
  list_image: string;
  list_image_width: number;
  list_name: string;
  list_name_encoded: string;
  searchProtocol: { method: "top-five"; api: "ny" };
  updated: string;
  __proto__: Object;
}
export interface nyRequest {
  searchProtocol: {
    method: "top-five" | "one-catg" | "all-best";
    api: "ny";
  };
  list?: string;
  date?: "current" | Date;
  publisher?: string;
  author?: string;
  price?: string;
  contributor?: string;
  title?: string;
  offset?: number;
  index?: number;
}
// this is similar to nyRequest interface but has the indexed signature to be used like [key] = value !
export interface keyedNyRequest {
  [k: string]: string | "current";
}

export interface allBestDataResponse {
  apiOrigin: "ny";
  author: string;
  contributor: string;
  copyright: "string";
  num_results: number;
  price: string;
  publisher: string;
  results: {}[];
  searchProtocol: { method: "all-best"; api: "ny" };
  status: string;
  title: string;
}

export interface oneCatgDataResponse {
  apiOrigin: "ny";
  date: "current" | Date;
  last_modified: string;
  num_results: number;
  results: {}[];
}
// All possible Ny Responses
export interface possibileNyResps
  extends oneCatgDataResponse,
    allBestDataResponse {}
