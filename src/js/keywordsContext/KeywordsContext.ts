import { createContext } from "react";

export const KeywordsContext = createContext<[any, (keywords: any) => void]>([
  {},
  () => {},
]);
