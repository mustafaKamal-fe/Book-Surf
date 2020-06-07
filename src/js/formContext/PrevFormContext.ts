/**
 * the same as PrevKeyWordsContext and PrevSugContext ...
 */
import { createContext } from "react";

export const PrevFormContext = createContext<[{}, (prev: {}) => void]>([
  {},
  () => {},
]);
