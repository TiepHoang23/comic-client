import { Page } from './Page';

export interface Chapter {
  ID: number; // Primary Key (implicitly set by IDENTITY(1, 1))
  ComicID?: number;
  Title: string;
  ChapterNumber?: number;
  ViewCount: number;
  UpdateAt: Date;
  Pages?: Page[];
}
