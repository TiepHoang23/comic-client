import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { AccountService } from '@services/account.service';
import { Subscription } from 'rxjs';

const filters = [
  (item: any) => item,
  (item: any) => !item.isRead,
];

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {
  listnotifyData: any[] = [];
  lengthnotifyReaded = 0;
  optionNotify = 0;
  isShowNotify = false;
  isShowOptionGeneral = false;
  isShowOption: number | null = null;
  hoveredIndexNotify: number | null = null;
  listnotify: any[] = [];
  lengthnotifyData = 0;
  private subscriptions: Subscription = new Subscription();

  constructor(private elementRef: ElementRef, private accountService: AccountService) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.accountService.getUserNotify().subscribe((res: any) => {
        this.listnotifyData = res.data.map((e: any) => ({
          ...e,
          notificationTimestamp: this.formatTimeNotify(e.notificationTimestamp)
        }));
        this.lengthnotifyData = this.listnotifyData.length;
        this.updateListNotify();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  formatTimeNotify(time: any): string {
    const timenotify = new Date(time).getTime();
    const timenow = new Date().getTime();
    const diffInMinutes = (timenow - timenotify) / 1000 / 60;

    if (diffInMinutes < 1) return 'Mới cập nhật';
    if (diffInMinutes <= 60) return Math.floor(diffInMinutes) + ' phút trước';
    if (diffInMinutes <= 1440) return Math.floor(diffInMinutes / 60) + ' giờ trước';
    if (diffInMinutes <= 10080) return Math.floor(diffInMinutes / 1440) + ' ngày trước';
    return Math.floor(diffInMinutes / 10080) + ' tuần trước';
  }

  toggleOptionNotify(value: number): void {
    this.optionNotify = value;
    this.updateListNotify();
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.querySelector('.notify').contains(event.target) && this.isShowNotify) {
      this.isShowNotify = false;
    }
  }

  onDeleteNotify(idNotify: any): void {
    this.isShowOption = null;
    if (this.listnotifyData.length === 0) return;

    this.accountService.deleteUserNotify(idNotify).subscribe(() => {
      if (idNotify === -1) {
        this.listnotifyData = [];
      } else {
        this.listnotifyData = this.listnotifyData.filter(notifi => notifi.id !== idNotify);
      }
      this.updateListNotify();
    });
  }

  onReadNotify(idNotify: any, option: string | null = null, isRead: boolean = false): void {
    this.isShowOption = null;

    if ((option === 'read' && isRead) || (option === 'all' && !this.listnotifyData.some(e => !e.isRead))) return;

    if (option === 'all') {
      this.accountService.updateUserNotify(idNotify, null).subscribe(() => {
        this.listnotifyData.forEach(e => e.isRead = true);
        this.updateListNotify();
      });
    } else {
      const updateIsRead = (option === 'optionNotify') ? !isRead : true;
      this.accountService.updateUserNotify(idNotify, updateIsRead).subscribe(() => {
        const notify = this.listnotifyData.find(e => e.id === idNotify);
        if (notify) notify.isRead = updateIsRead;
        this.updateListNotify();
      });
    }
  }

  private updateListNotify(): void {
    this.listnotify = this.listnotifyData.filter(filters[this.optionNotify]);
    this.lengthnotifyReaded = this.listnotifyData.filter(filters[1]).length;
    this.lengthnotifyData = this.listnotifyData.length;
  }

  onClickNotifyBell(): void {
    this.isShowNotify = !this.isShowNotify;
    this.isShowOptionGeneral = false;
    this.isShowOption = null;
  }

  onClickOption(i: number): void {
    this.isShowOption = this.isShowOption === i ? null : i;
  }
}
