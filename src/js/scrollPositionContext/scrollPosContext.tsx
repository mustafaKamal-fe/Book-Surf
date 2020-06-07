import { createContext } from "react";
const ScrollPosContext = createContext<[any, (pos: any) => void]>([
  0,
  () => {},
]);

export default ScrollPosContext;
