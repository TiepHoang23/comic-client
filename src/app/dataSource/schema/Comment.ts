export interface Comment {
    id: number; // Required, integer comment ID
    chapterID: number; // Required, integer chapter ID
    comicID: number; // Required, integer comic ID
    userID: number; // Required, integer user ID
    content?: string; // Optional string content
    commentedAt: string; // Required Date object for commented time
    userName?: string; // Optional string username
    parentCommentID?: number; // Optional integer parent comment ID
    replies?: Comment[]; // Optional array of nested CommentDTO objects for replies
}

export interface CommentList {
    data: Comment[]
    total: number
    page: number
    pageSize: number
}