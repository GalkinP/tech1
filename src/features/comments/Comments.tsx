import React, {useContext} from "react";
import CommentEl from "./CommentEl";
import {appContext} from "src/context/context";

function Comments({
    page,
    setPage,
}: {
    page: number;
    setPage: (page: number) => void;
}): JSX.Element {
    const comments = useContext(appContext)
        .state.comments.filter((comment) => comment.parent === null)
        .sort(
            (a, b) =>
                new Date(b.created).getTime() - new Date(a.created).getTime(),
        );

    return (
        <div className="comments">
            <p>комментариев</p>
            {comments.map((comment) => (
                <CommentEl comment={comment} key={comment.id} />
            ))}
            {page > 0 && (
                <button
                    type="button"
                    className="button"
                    onClick={() => setPage(page + 1)}
                >
                    Загрузить еще
                </button>
            )}
        </div>
    );
}

export default Comments;
