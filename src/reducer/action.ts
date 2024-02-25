import {Comment} from "src/features/comments/types";
import {Author} from "src/features/users/types";

export type Action =
    | {type: "authors/load"; payload: Author[]}
    | {type: "comments/load"; payload: Comment[]};
