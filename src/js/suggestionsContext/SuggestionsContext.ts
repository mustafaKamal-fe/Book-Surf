import { createContext } from "react";

export const SuggestionsContext = createContext<
  [any, (suggesion: any) => void]
>([{}, () => {}]);
