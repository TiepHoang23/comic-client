export interface Page {
  id: number; // Primary Key (implicitly set by IDENTITY(1, 1))
  chapterID: number; // Foreign Key
  pageNumber: number;
  content: string;
  imageURL: string;
}
