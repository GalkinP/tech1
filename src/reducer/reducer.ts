import {Action} from "./action";
import {State} from "./reducerType";

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "comments/load":
            return {...state, comments: action.payload};
        case "authors/load":
            return {...state, authors: action.payload};
        default: {
            return state;
        }
    }
};
export const initState: State = {
    comments: [],
    authors: [],
};
