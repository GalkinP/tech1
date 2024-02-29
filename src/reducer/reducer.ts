import {Action} from "./action";
import {State} from "./reducerType";

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "comments/load":console.log(action.payload);
        
            return {...state, comments: action.payload};
        case "authors/load":
            return {...state, authors: action.payload};
        case "comments/add":
            return {...state, comments: [...state.comments, ...action.payload]};
        case "comments/likeAdd":
            return {
                ...state,
                comments: state.comments.map((comment) =>
                    comment.id === action.payload
                        ? {
                              ...comment,
                              likes: comment.likes + 1,
                          }
                        : comment,
                ),
            };
        case "comments/likeRemove":
            return {
                ...state,
                comments: state.comments.map((comment) =>
                    comment.id === action.payload
                        ? {
                              ...comment,
                              likes: comment.likes - 1,
                          }
                        : comment,
                ),
            };
        default: {
            return state;
        }
    }
};
export const initState: State = {
    comments: [],
    authors: [],
};
// https://GalkinP.github.io/tech1