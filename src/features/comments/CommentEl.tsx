import React, {useContext} from "react";
import {Comment} from "./types";
import {appContext} from "src/context/context";

function CommentEl({comment}: {comment: Comment}): JSX.Element {
    const author = useContext(appContext).state.authors.find(
        (auth) => auth.id === comment.author,
    );
    const child = useContext(appContext)
        .state.comments.filter(
            (commnt) => commnt.parent !== null && commnt.parent === comment.id,
        )
        .sort(
            (a, b) =>
                new Date(b.created).getTime() - new Date(a.created).getTime(),
        );
    const formattedDate = new Date(comment.created).toLocaleDateString(
        "ru-RU",
        {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        },
    );

    return (
        <div>
            {" "}
            <div className="comment">
                <div className="author">
                    <div
                        className="avatar"
                        style={{backgroundImage: `url(${author?.avatar})`}}
                    ></div>
                    <div className="info">
                        <p>{author?.name}</p>
                        <p className="date">{formattedDate}</p>
                    </div>{" "}
                    <div className="like">🧡{comment.likes}</div>
                </div>
                <div className="text">{comment.text}</div>
            </div>
            {child.length > 0 && (
                <div className="child">
                    {child.map((commnt) => (
                        <CommentEl key={commnt.id} comment={commnt} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CommentEl;
