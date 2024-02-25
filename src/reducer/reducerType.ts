import {Comment} from "src/features/comments/types";
import {Author} from "src/features/users/types";

export type State = {
    comments: Comment[];
    authors: Author[];
};
