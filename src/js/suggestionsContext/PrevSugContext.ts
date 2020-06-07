/**context for previous suggesions list of books to be used for navigation back to 'suggestions' */

import { createContext } from "react";

export const PrevSugContext = createContext<[any, (prev: any) => void]>([
  {},
  () => {},
]);
