import { createContext } from "react";

const OverlayContext = createContext<[boolean, (overlay: boolean) => void]>([
  false,
  () => {},
]);
const CollapseFromOverLay = createContext<
  [boolean, (collapse: boolean) => void]
>([false, () => {}]);

export default OverlayContext;
export { CollapseFromOverLay };
