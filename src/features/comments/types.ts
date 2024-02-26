export type Comment = {
    id: number;
    created: string;
    text: string;
    author: number;
    parent: null | number;
    likes: number;
};
export type Pagination = {
    page: number;
    size: number;
    total_pages: number;
};
export type Comments = {
    pagination: Pagination;
    data: Comment[];
};
