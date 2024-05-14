import { ComicStatus, SortType } from '../../dataSource/enum';

export type IFilter = {
  selected?: boolean;
  name: string;
  value: ComicStatus | SortType | number;
};

export type IAdvancedFilters = {
  status: IFilter[];
  sorts: IFilter[];
  tops: IFilter[];
};

export const advancedFiltersOptions: IAdvancedFilters = {
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

  tops: [
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
  ],
};
