import React, {useContext, useEffect, useState} from "react";
import "./App.css";
import Comments from "./features/comments/Comments";
import {appContext} from "./context/context";
import {
    getCommentsRequest,
    fetchDataWithRetry,
} from "./api/comments/getCommentsRequest";
import getAuthorsRequest from "./api/authors/getAuthorsRequest";
import {Comment} from "./features/comments/types";

function App() {
    const {dispatch} = useContext(appContext);
    const [page, setPage] = useState(1);
    const [exist, setExist] = useState(true);
    const [countComments, setCountComments] = useState(0);
    const [countLikes, setCountLikes] = useState(0);
    useEffect(() => {
        const fetchComments = async () => {
            const commentsPage = await fetchDataWithRetry(() =>
                getCommentsRequest(page),
            );
            dispatch({type: "comments/load", payload: commentsPage.data});
            let comms = countComments;
            let likes = countLikes;
            for (let i = 0; i < commentsPage.pagination.total_pages; i++) {
                const res = await fetchDataWithRetry(() =>
                    getCommentsRequest(i + 1),
                );
                comms += res.data.length;
                likes += res.data
                    .map((comment: Comment) => comment.likes)
                    .reduce((a: number, b: number) => a + b, 0);
            }

            setCountComments(comms);
            setCountLikes(likes);

            if (page >= commentsPage.pagination.total_pages) {
                setExist(false);
            }
        };
        fetchComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const authors = await getAuthorsRequest();
                dispatch({type: "authors/load", payload: authors});
            } catch (error) {
                console.log(error);
            }
        };
        fetchAuthors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Comments
            setPage={setPage}
            page={page}
            exist={exist}
            setExist={setExist}
            countComments={countComments}
            countLikes={countLikes}
            setCountLikes={setCountLikes}
        />
    );
}

export default App;
