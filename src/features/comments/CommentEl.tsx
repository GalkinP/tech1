import React, {useContext} from "react";
import {Comment} from "./types";
import {appContext} from "src/context/context";

function CommentEl({
    comment,
    setCountLikes,
}: {
    comment: Comment;
    setCountLikes: (countLikes: (prev: number) => number) => void;
}): JSX.Element {
    const {dispatch} = useContext(appContext);
    const [heart, setHeart] = React.useState("🤍");
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
    const now = new Date();
    const createdDate = new Date(comment.created);
    const timeDiffInHours =
        (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60);
    const displayDate =
        timeDiffInHours < 24
            ? `${Math.floor(timeDiffInHours)} hours ago`
            : formattedDate;

    function likeFunction(id: number) {
        if (heart === "🤍") {
            dispatch({type: "comments/likeAdd", payload: id});
            setCountLikes((prev) => prev + 1);
        } else {
            dispatch({type: "comments/likeRemove", payload: id});
            setCountLikes((prev) => prev - 1);
        }
        setHeart(heart === "❤️" ? "🤍" : "❤️");
    }
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
                        <p className="date">{displayDate}</p>
                    </div>{" "}
                    <div className="like">
                        <button
                            type="button"
                            className="buttonLike"
                            onClick={() => likeFunction(comment.id)}
                        >
                            {heart}
                        </button>
                        {comment.likes}
                    </div>
                </div>
                <div className="text">{comment.text}</div>
            </div>
            {child.length > 0 && (
                <div className="child">
                    {child.map((commnt) => (
                        <CommentEl
                            key={commnt.id}
                            comment={commnt}
                            setCountLikes={setCountLikes}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CommentEl;
