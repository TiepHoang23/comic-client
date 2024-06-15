import { ComicStatus, SortType } from '../../dataSource/enum';

export type IFilter = {
  selected?: boolean;
  name: string;
  value: ComicStatus | SortType | number;
};

export type IFilters = {
  status: IFilter[];
  sorts: IFilter[];


};

export const advancedFiltersOptions: IFilters = {
  status: [
    {
      name: 'Tất Cả',
      value: ComicStatus.ALL,

    },
    {
      name: 'Đang Ra',
      value: ComicStatus.ONGOING,
    },
    {
      name: 'Hoàn Thành',
      value: ComicStatus.COMPLETED,
    },
  ],

  sorts: [
    {
      name: 'Mới cập nhật',
      value: SortType.LastUpdate,

    },
    {
      name: 'Top All',
      value: SortType.TopAll,
    },
    {
      name: 'Top ngày',
      value: SortType.TopDay,
    },
    {
      name: 'Top tuần',
      value: SortType.TopWeek,
    },
    {
      name: 'Top tháng',
      value: SortType.TopMonth,
    },
    {
      name: 'Chapter',
      value: SortType.Chapter,
    },
    {
      name: 'Theo dõi',
      value: SortType.TopFollow,
    },
    {
      name: 'Bình luận',
      value: SortType.TopComment,
    },
    {
      name: 'Truyện mới',
      value: SortType.NewComic,
    },

  ],



};




export const rankFiltersOptions: IFilters = {
  status: [
    {
      name: 'Tất Cả',
      value: ComicStatus.ALL,

    },
    {
      name: 'Đang Ra',
      value: ComicStatus.ONGOING,
    },
    {
      name: 'Hoàn Thành',
      value: ComicStatus.COMPLETED,
    },
  ],

  sorts: [
    {
      name: 'Top All',
      value: SortType.TopAll,

    },
    {
      name: 'Top ngày',
      value: SortType.TopDay,
    },
    {
      name: 'Top tuần',
      value: SortType.TopWeek,
    },
    {
      name: 'Top tháng',
      value: SortType.TopMonth,
    },

    {
      name: 'Chapter',
      value: SortType.Chapter,
    },

    {
      name: 'Truyện mới',
      value: SortType.NewComic,
    },
    {
      name: 'Ngày cập nhật',
      value: SortType.LastUpdate,
    },
  ],


};
