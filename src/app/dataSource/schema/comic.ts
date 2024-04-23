// export interface Comic {
//   id: number;
//   title: string;
//   description: string;
//   thumbnail: string;
// }

import { Chapter } from "./Chapter";
import { Genre } from "./Genre";

export interface Comic {
  id: number;
  title: string;
  url: string;
  author?: string;
  description?: string|null;
  coverImage?: string;
  viewCount: number;
  status: number;
  rating: number;
  createAt?: string;
  updateAt?: string;
  genres: Genre[];
  chapters: Chapter[];
}
