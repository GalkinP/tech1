import React, {useContext} from "react";
import CommentEl from "./CommentEl";
import {appContext} from "src/context/context";
import {
    fetchDataWithRetry,
    getCommentsRequest,
} from "src/api/comments/getCommentsRequest";

function Comments({
    page,
    setPage,
    exist,
    setExist,
    countComments,
    countLikes,
    setCountLikes,
}: {
    page: number;
    setPage: (page: number | ((prev: number) => number)) => void;
    exist: boolean;
    setExist: (exist: boolean) => void;
    countComments: number;
    countLikes: number;
    setCountLikes: (countLikes: (prev: number) => number) => void;
}): JSX.Element {
    const {dispatch} = useContext(appContext);
    const comments = useContext(appContext)
        .state.comments.filter((comment) => comment.parent === null)
        .sort(
            (a, b) =>
                new Date(b.created).getTime() - new Date(a.created).getTime(),
        );
    async function addComments(page: number) {
        const comms = await fetchDataWithRetry(() => getCommentsRequest(page));
        dispatch({type: "comments/load", payload: comms.data});
        if (page >= comms.pagination.total_pages) {
            setExist(false);
        } else {
            setExist(true);
        }
    }
    return (
        <div className="comments">
            <div className="inf">
                <p>{countComments} комментариев </p>
                <p>♡{countLikes}</p>
            </div>
            {comments.map((comment) => (
                <CommentEl
                    comment={comment}
                    key={comment.id}
                    setCountLikes={setCountLikes}
                />
            ))}
            <div className="buttons">
                {" "}
                {exist && (
                    <button
                        type="button"
                        className="button"
                        onClick={() => {
                            setPage((prev) => prev + 1);
                            addComments(page + 1);
                        }}
                    >
                        Загрузить еще
                    </button>
                )}
                {page !== 1 && (
                    <button
                        type="button"
                        className="button"
                        onClick={() => {
                            setPage((prev) => prev - 1);
                            addComments(page - 1);
                        }}
                    >
                        Назад
                    </button>
                )}
            </div>
        </div>
    );
}

export default Comments;
