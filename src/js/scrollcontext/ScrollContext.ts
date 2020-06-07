/** tells App where the current scrolling is taking place 'google, ny,.. */
import { createContext } from "react";

export const ScrollContext = createContext<[any, (scroll: any) => void]>([
  {},
  () => {},
]);
