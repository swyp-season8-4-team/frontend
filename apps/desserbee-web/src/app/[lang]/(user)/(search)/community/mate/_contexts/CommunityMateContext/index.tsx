import type { WithChildren } from "@repo/ui";
import { createContext } from "react";

interface State {

}

const defaultState: State = {

}

export const CommunityMateContext = createContext<State>(defaultState);

interface Props extends WithChildren {}

export function CommunityMateProvider({ children }: Props) {
  // const [state, setState] = useState<State>(defaultState);

  return (
    <CommunityMateContext.Provider value={{}}>
      {children}
    </CommunityMateContext.Provider>
  )
}