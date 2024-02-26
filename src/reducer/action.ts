import {Comment} from "src/features/comments/types";
import {Author} from "src/features/users/types";

export type Action =
    | {type: "authors/load"; payload: Author[]}
    | {type: "comments/load"; payload: Comment[]}
    | {type: "comments/add"; payload: Comment[]}
    | {type: "comments/likeAdd"; payload: number}
    | {type: "comments/likeRemove"; payload: number};
