
import { createContext } from "react";
import { Context } from "./contextType";
import { initState } from "src/reducer/reducer";

export const initialContext: Context = {
    state: initState,
    dispatch:()=>{}
}
export const appContext = createContext(initialContext)