import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';
import moment, { isDate } from 'moment-timezone';

moment.tz.setDefault('Asia/Ho_Chi_Minh');
const translateToVNAgo = (dateString: string, ago: string = 'trước'): string => {
  if (!dateString) {
    return '';
  }
  return dateString
    .replace('ago', ago)
    .replace('about', '')
    .replace('over', 'hơn')
    .replace('almost', 'gần')
    .replace('less than', '')
    .replace(/day[s]*/, 'ngày')
    .replace(/hour[s]*/, 'giờ')
    .replace(/minute[s]*/, 'phút')
    .replace(/second[s]*/, 'giây')
    .replace(/month[s]*/, 'tháng')
    .replace(/year[s]*/, 'năm')
    .replace(/a[s]*/, '1')
};

@Pipe({
  name: 'dateAgo',
})
export class DateAgoPipe implements PipeTransform {
  transform(date?: string, FORMAT_DATE: string = 'DD/MM/YYYY', ago: string = 'trước'): string {
    if (!date) {
      return '';
    }
    const fromDate = moment(date);
    const now = moment();
    const isOverMonth = now.diff(fromDate, 'months') >= 1;

    if (isOverMonth) {
      return fromDate.format(FORMAT_DATE);
    }
    const distance = formatDistanceToNow(new Date(date), {
      addSuffix: true,
    });
    return translateToVNAgo(distance, ago);
  }
}
