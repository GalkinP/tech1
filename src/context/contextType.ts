import { Dispatch } from "react"
import { State } from "src/reducer/reducerType" 
import { Action } from "src/reducer/action" 

export type Context ={
    state:State,
    dispatch:Dispatch<Action>
}
