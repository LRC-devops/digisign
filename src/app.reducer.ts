import { Config, MaxAnn as IMaxAnn, emptyConfig } from "./components/MaxAnns/types"
import { ComponentError } from "./components/error/types"
import { Sessions } from "./components/sessions/types"
import { Snack, emptySnack } from "./components/snackbar.types"

export type State = {
  loading: boolean,
  sessions: Sessions,
  error: ComponentError,
  announcements: IMaxAnn[][]
  rawAnnouncements: IMaxAnn[]
  config: Config,
  snack: Snack
}

export type Action =
  | { type: "setSessions", payload: Sessions }
  | { type: "setAnnouncements", payload: { announcements: IMaxAnn[][], rawAnnouncements: IMaxAnn[] } }
  | { type: "setLoading", payload: boolean }
  | { type: "setError", payload: ComponentError }
  | { type: "setSnack", payload: Snack }
  | { type: "setConfig", payload: Config }
  // | { type: "nextAnnPage" }
  | { type: "setAnnouncementsRunning", payload: boolean }
  | { type: "setAnnouncementsRunning", payload: boolean }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setSessions":
      return { ...state, sessions: action.payload }
    case "setAnnouncements":
      return { ...state, announcements: action.payload.announcements, rawAnnouncements: action.payload.rawAnnouncements }
    case "setConfig":
      return { ...state, config: action.payload }
    case "setLoading":
      return { ...state, loading: action.payload }
    case "setError":
      return { ...state, error: action.payload }
    case "setSnack":
      return { ...state, snack: action.payload }
    case "setAnnouncementsRunning":
      let curr = state.config.currentPage
      // only update the page once announcements are set to not run.
      if (!action.payload) {
        curr = (curr + 1) % state.config.totalPages;
      }
      console.log("running setAnnouncementsRunning to: ", action.payload, curr)
      var config = {
        ...state.config,
        running: action.payload,
        currentPage: curr
      }
      return { ...state, config }
  }
}
export const initialState: State = {
  loading: false,
  sessions: [],
  error: { hasError: false, msg: "" },
  announcements: [],
  rawAnnouncements: [],
  config: emptyConfig,
  snack: emptySnack
}
