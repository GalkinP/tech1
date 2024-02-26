import axios from "axios";

export async function getCommentsRequest(page: number) {
    const {data} = await axios.get("/api/comments", {params: {page}});
    return data;
}

export const fetchDataWithRetry = async (
    requestFunction: () => Promise<any>,
    retries = 2,
) => {
    try {
        return await requestFunction();
    } catch (error) {
        if (retries) {
            return new Promise((resolve, reject) => {
                resolve(fetchDataWithRetry(requestFunction, retries - 1));
            });
        } else {
            throw error;
        }
    }
};

