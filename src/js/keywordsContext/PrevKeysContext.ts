/**the previous list of books searched by typing to be used to navigate back to it
 * that is when user searches for some book then clicks on one to sse its details and then
 * goes back to that list again!
 */
import { createContext } from "react";

export const PrevKeysContext = createContext<[any, (prev: any) => void]>([
  {},
  () => {},
]);
