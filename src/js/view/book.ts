import { createContext } from "react";

const ViewBookContext = createContext<[any, (book: any) => void]>([
  "",
  () => {},
]);
export default ViewBookContext;
