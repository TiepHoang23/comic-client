import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comic } from '../schema/comic';

@Injectable({
  providedIn: 'root',
})
export class fetchComicService {
  data: Comic[];
  constructor() {
    this.data = [
      {
        "id": 21854,
        "title": "Võ Luyện Đỉnh Phong",
        "url": "vo-luyen-dinh-phong",
        "author": "Đang cập nhật",
        "description": null,
        "coverImage": 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        "status": 0,
        "rating": 10,
        "viewCount": 1077998102,
        "updateAt": "2024-04-04T10:01:00",
        "genres": [
          {
            "id": 1,
            "title": "Action"
          },
          {
            "id": 14,
            "title": "Fantasy"
          },
          {
            "id": 22,
            "title": "Manhua"
          },
          {
            "id": 37,
            "title": "Shounen"
          },
          {
            "id": 44,
            "title": "Supernatural"
          },
          {
            "id": 49,
            "title": "Truyện Màu"
          }
        ],
        "chapters": [
          {
            "id": 1586153,
            "title": "Chapter 3",
            "chapterNumber": 3,
            "viewCount": 45363,
            "updateAt": "2018-01-14T00:00:00"
          },
          {
            "id": 1586152,
            "title": "Chapter 2",
            "chapterNumber": 2,
            "viewCount": 568890,
            "updateAt": "2018-01-03T00:00:00"
          },
          {
            "id": 1586151,
            "title": "Chapter 1",
            "chapterNumber": 1,
            "viewCount": 425535,
            "updateAt": "2018-01-02T00:00:00"
          }
        ]
      },
      {
        "id": 19942,
        "title": "Toàn Chức Pháp Sư",
        "url": "toan-chuc-phap-su",
        "author": "Đang cập nhật",
        "description": null,
        "coverImage": "https://static.doctruyenonline.vn/images/vu-luyen-dien-phong.jpg",
        "status": 0,
        "rating": 10,
        "viewCount": 313551415,
        "updateAt": "2024-04-10T13:08:00",
        "genres": [
          {
            "id": 1,
            "title": "Action"
          },
          {
            "id": 3,
            "title": "Adventure"
          },
          {
            "id": 14,
            "title": "Fantasy"
          },
          {
            "id": 22,
            "title": "Manhua"
          },
          {
            "id": 27,
            "title": "Mystery"
          },
          {
            "id": 37,
            "title": "Shounen"
          },
          {
            "id": 44,
            "title": "Supernatural"
          },
          {
            "id": 49,
            "title": "Truyện Màu"
          }
        ],
        "chapters": [
          {
            "id": 1492224,
            "title": "Chapter 3",
            "chapterNumber": 3,
            "viewCount": 480312,
            "updateAt": "2018-02-20T00:00:00"
          },
          {
            "id": 1492223,
            "title": "Chapter 2",
            "chapterNumber": 2,
            "viewCount": 543911,
            "updateAt": "2018-02-18T00:00:00"
          },
          {
            "id": 1492222,
            "title": "Chapter 1",
            "chapterNumber": 1,
            "viewCount": 893090,
            "updateAt": "2018-02-17T00:00:00"
          }
        ]
      },
      {
        "id": 20870,
        "title": "Trọng Sinh Đô Thị Tu Tiên",
        "url": "trong-sinh-do-thi-tu-tien",
        "author": "Đang cập nhật",
        "description": null,
        "coverImage": "https://static.doctruyenonline.vn/images/vu-luyen-dien-phong.jpg",
        "status": 0,
        "rating": 10,
        "viewCount": 284999504,
        "updateAt": "2024-04-05T12:26:00",
        "genres": [
          {
            "id": 22,
            "title": "Manhua"
          },
          {
            "id": 24,
            "title": "Martial Arts"
          },
          {
            "id": 49,
            "title": "Truyện Màu"
          }
        ],
        "chapters": [
          {
            "id": 1537192,
            "title": "Chapter 1",
            "chapterNumber": 1,
            "viewCount": 281571,
            "updateAt": "2018-08-24T00:00:00"
          },
          {
            "id": 1537193,
            "title": "Chapter 2",
            "chapterNumber": 2,
            "viewCount": 177433,
            "updateAt": "2018-08-25T00:00:00"
          },
          {
            "id": 1537194,
            "title": "Chapter 3",
            "chapterNumber": 3,
            "viewCount": 451664,
            "updateAt": "2018-08-26T00:00:00"
          }
        ]
      },
      {
        "id": 2389,
        "title": "Bách Luyện Thành Thần",
        "url": "bach-luyen-thanh-than",
        "author": "Đang cập nhật",
        "description": null,
        "coverImage": "https://static.doctruyenonline.vn/images/vu-luyen-dien-phong.jpg",
        "status": 0,
        "rating": 10,
        "viewCount": 260989538,
        "updateAt": "2024-04-10T18:15:00",
        "genres": [
          {
            "id": 1,
            "title": "Action"
          },
          {
            "id": 11,
            "title": "Drama"
          },
          {
            "id": 27,
            "title": "Mystery"
          },
          {
            "id": 49,
            "title": "Truyện Màu"
          }
        ],
        "chapters": [
          {
            "id": 855013,
            "title": "Chapter 1",
            "chapterNumber": 1,
            "viewCount": 1199075,
            "updateAt": "2015-10-13T00:00:00"
          },
          {
            "id": 855014,
            "title": "Chapter 2",
            "chapterNumber": 2,
            "viewCount": 736770,
            "updateAt": "2015-10-16T00:00:00"
          },
          {
            "id": 855015,
            "title": "Chapter 3",
            "chapterNumber": 3,
            "viewCount": 642205,
            "updateAt": "2015-10-27T00:00:00"
          }
        ]
      },
      {
        "id": 5452,
        "title": "Đại Quản Gia Là Ma Hoàng",
        "url": "dai-quan-gia-la-ma-hoang",
        "author": "Mộng Tiên Giới",
        "description": null,
        "coverImage": "https://static.doctruyenonline.vn/images/vu-luyen-dien-phong.jpg",
        "status": 0,
        "rating": 10,
        "viewCount": 240999737,
        "updateAt": "2024-04-06T10:54:00",
        "genres": [
          {
            "id": 3,
            "title": "Adventure"
          },
          {
            "id": 22,
            "title": "Manhua"
          },
          {
            "id": 49,
            "title": "Truyện Màu"
          }
        ],
        "chapters": [
          {
            "id": 976040,
            "title": "Chapter 0",
            "chapterNumber": 1,
            "viewCount": 846922,
            "updateAt": "2019-04-17T00:00:00"
          },
          {
            "id": 976041,
            "title": "Chapter 1",
            "chapterNumber": 2,
            "viewCount": 888668,
            "updateAt": "2019-04-21T00:00:00"
          },
          {
            "id": 976042,
            "title": "Chapter 2",
            "chapterNumber": 3,
            "viewCount": 169919,
            "updateAt": "2019-04-30T00:00:00"
          }
        ]
      },
      {
        "id": 8339,
        "title": "Hệt Như Hàn Quang Gặp Nắng Gắt",
        "url": "het-nhu-han-quang-gap-nang-gat",
        "author": "Team Nhà Đá - Thần Mộng Team",
        "description": null,
        "coverImage": "https://static.doctruyenonline.vn/images/vu-luyen-dien-phong.jpg",
        "status": 0,
        "rating": 10,
        "viewCount": 231033400,
        "updateAt": "2024-04-07T02:14:00",
        "genres": [
          {
            "id": 5,
            "title": "Chuyển Sinh"
          },
          {
            "id": 22,
            "title": "Manhua"
          },
          {
            "id": 28,
            "title": "Ngôn Tình"
          },
          {
            "id": 31,
            "title": "Romance"
          }
        ],
        "chapters": [
          {
            "id": 1080911,
            "title": "Chapter 2",
            "chapterNumber": 3,
            "viewCount": 987672,
            "updateAt": "2020-03-25T00:00:00"
          },
          {
            "id": 1080910,
            "title": "Chapter 1",
            "chapterNumber": 2,
            "viewCount": 1061083,
            "updateAt": "2020-03-25T00:00:00"
          },
          {
            "id": 1080909,
            "title": "Chapter 0",
            "chapterNumber": 1,
            "viewCount": 1279185,
            "updateAt": "2020-03-25T00:00:00"
          }
        ]
      },
      {
        "id": 5487,
        "title": "Đại Vương Tha Mạng",
        "url": "dai-vuong-tha-mang",
        "author": "Duyệt Động văn hóa",
        "description": null,
        "coverImage": "https://static.doctruyenonline.vn/images/vu-luyen-dien-phong.jpg",
        "status": 0,
        "rating": 10,
        "viewCount": 215095032,
        "updateAt": "2024-04-08T11:16:00",
        "genres": [
          {
            "id": 6,
            "title": "Comedy"
          },
          {
            "id": 22,
            "title": "Manhua"
          },
          {
            "id": 44,
            "title": "Supernatural"
          },
          {
            "id": 49,
            "title": "Truyện Màu"
          }
        ],
        "chapters": [
          {
            "id": 978901,
            "title": "Chapter 3",
            "chapterNumber": 3,
            "viewCount": 684160,
            "updateAt": "2019-12-13T00:00:00"
          },
          {
            "id": 978900,
            "title": "Chapter 2",
            "chapterNumber": 2,
            "viewCount": 739502,
            "updateAt": "2019-12-13T00:00:00"
          },
          {
            "id": 978899,
            "title": "Chapter 1",
            "chapterNumber": 1,
            "viewCount": 977664,
            "updateAt": "2019-12-13T00:00:00"
          }
        ]
      },
      {
        "id": 13833,
        "title": "Nguyên Tôn",
        "url": "nguyen-ton",
        "author": "Thiên Tằm Thổ Đậu",
        "description": null,
        "coverImage": "https://static.doctruyenonline.vn/images/vu-luyen-dien-phong.jpg",
        "status": 0,
        "rating": 10,
        "viewCount": 215046229,
        "updateAt": "2024-04-09T21:50:00",
        "genres": [
          {
            "id": 1,
            "title": "Action"
          },
          {
            "id": 3,
            "title": "Adventure"
          },
          {
            "id": 14,
            "title": "Fantasy"
          },
          {
            "id": 22,
            "title": "Manhua"
          },
          {
            "id": 27,
            "title": "Mystery"
          },
          {
            "id": 49,
            "title": "Truyện Màu"
          }
        ],
        "chapters": [
          {
            "id": 1267820,
            "title": "Chapter 1",
            "chapterNumber": 1,
            "viewCount": 1100662,
            "updateAt": "2017-12-08T00:00:00"
          },
          {
            "id": 1267821,
            "title": "Chapter 2",
            "chapterNumber": 2,
            "viewCount": 660555,
            "updateAt": "2017-12-11T00:00:00"
          },
          {
            "id": 1267822,
            "title": "Chapter 3",
            "chapterNumber": 3,
            "viewCount": 588345,
            "updateAt": "2017-12-15T00:00:00"
          }
        ]
      },
      {
        "id": 22649,
        "title": "Yêu Thần Ký",
        "url": "yeu-than-ky",
        "author": "Mad Snail",
        "description": null,
        "coverImage": "https://static.doctruyenonline.vn/images/vu-luyen-dien-phong.jpg",
        "status": 0,
        "rating": 10,
        "viewCount": 209289583,
        "updateAt": "2024-04-10T13:08:00",
        "genres": [
          {
            "id": 1,
            "title": "Action"
          },
          {
            "id": 14,
            "title": "Fantasy"
          },
          {
            "id": 22,
            "title": "Manhua"
          },
          {
            "id": 37,
            "title": "Shounen"
          },
          {
            "id": 49,
            "title": "Truyện Màu"
          }
        ],
        "chapters": [
          {
            "id": 1624682,
            "title": "Chapter 1",
            "chapterNumber": 1,
            "viewCount": 621794,
            "updateAt": "2015-08-22T00:00:00"
          },
          {
            "id": 1624683,
            "title": "Chapter 2",
            "chapterNumber": 2,
            "viewCount": 371075,
            "updateAt": "2015-08-22T00:00:00"
          },
          {
            "id": 1624684,
            "title": "Chapter 3",
            "chapterNumber": 3,
            "viewCount": 325048,
            "updateAt": "2015-08-23T00:00:00"
          }
        ]
      },
      {
        "id": 20683,
        "title": "Trên Người Ta Có Một Con Rồng",
        "url": "tren-nguoi-ta-co-mot-con-rong",
        "author": "Đang cập nhật",
        "description": null,
        "coverImage": "https://static.doctruyenonline.vn/images/vu-luyen-dien-phong.jpg",
        "status": 0,
        "rating": 10,
        "viewCount": 187402671,
        "updateAt": "2023-05-10T21:29:00",
        "genres": [
          {
            "id": 22,
            "title": "Manhua"
          },
          {
            "id": 24,
            "title": "Martial Arts"
          },
          {
            "id": 49,
            "title": "Truyện Màu"
          }
        ],
        "chapters": [
          {
            "id": 1527033,
            "title": "Chapter 3",
            "chapterNumber": 3,
            "viewCount": 657881,
            "updateAt": "2019-07-23T00:00:00"
          },
          {
            "id": 1527032,
            "title": "Chapter 2",
            "chapterNumber": 2,
            "viewCount": 743015,
            "updateAt": "2019-07-21T00:00:00"
          },
          {
            "id": 1527031,
            "title": "Chapter 1",
            "chapterNumber": 1,
            "viewCount": 930747,
            "updateAt": "2019-06-16T00:00:00"
          }
        ]
      },
      {
        "id": 4662,
        "title": "Cô Vợ Hợp Đồng Bỏ Trốn Của Tổng Giám Đốc",
        "url": "co-vo-hop-dong-bo-tron-cua-tong-giam-doc",
        "author": "Niêm Hoa Phất Liễu",
        "description": null,
        "coverImage": "https://static.doctruyenonline.vn/images/vu-luyen-dien-phong.jpg",
        "status": 0,
        "rating": 10,
        "viewCount": 182795525,
        "updateAt": "2023-05-29T21:01:00",
        "genres": [
          {
            "id": 22,
            "title": "Manhua"
          },
          {
            "id": 28,
            "title": "Ngôn Tình"
          },
          {
            "id": 31,
            "title": "Romance"
          },
          {
            "id": 35,
            "title": "Shoujo"
          },
          {
            "id": 49,
            "title": "Truyện Màu"
          }
        ],
        "chapters": [
          {
            "id": 939807,
            "title": "Chapter 2.1",
            "chapterNumber": 3,
            "viewCount": 931760,
            "updateAt": "2018-02-04T00:00:00"
          },
          {
            "id": 939806,
            "title": "Chapter 1.2",
            "chapterNumber": 2,
            "viewCount": 1034371,
            "updateAt": "2018-02-01T00:00:00"
          },
          {
            "id": 939805,
            "title": "Chapter 1.1",
            "chapterNumber": 1,
            "viewCount": 1353457,
            "updateAt": "2018-02-01T00:00:00"
          }
        ]
      },
      {
        "id": 21357,
        "title": "Tuyệt Thế Võ Thần",
        "url": "tuyet-the-vo-than",
        "author": "Tịnh Vô Ngân",
        "description": null,
        "coverImage": "https://static.doctruyenonline.vn/images/vu-luyen-dien-phong.jpg",
        "status": 0,
        "rating": 10,
        "viewCount": 166418531,
        "updateAt": "2024-04-08T11:27:00",
        "genres": [
          {
            "id": 1,
            "title": "Action"
          },
          {
            "id": 5,
            "title": "Chuyển Sinh"
          },
          {
            "id": 22,
            "title": "Manhua"
          },
          {
            "id": 27,
            "title": "Mystery"
          },
          {
            "id": 49,
            "title": "Truyện Màu"
          },
          {
            "id": 51,
            "title": "Xuyên Không"
          }
        ],
        "chapters": [
          {
            "id": 1565826,
            "title": "Chapter 2",
            "chapterNumber": 2,
            "viewCount": 1022898,
            "updateAt": "2016-11-10T00:00:00"
          },
          {
            "id": 1565825,
            "title": "Chapter 1",
            "chapterNumber": 1,
            "viewCount": 1678333,
            "updateAt": "2016-11-09T00:00:00"
          },
          {
            "id": 1565827,
            "title": "Chapter 3",
            "chapterNumber": 3,
            "viewCount": 798249,
            "updateAt": "2016-11-11T00:00:00"
          }
        ]
      },
    ]
  }
  get(url: string): Observable<any> {
    switch (url) {
      case '/comics':
        return of(this.data);
      default:
        const id = Number(url.substring(url.lastIndexOf('/')).match(/\d+/)?.[0]);
        const comicById = this.data?.find((comic) => comic.id === id);
        return of(comicById);
    }
  }
}
