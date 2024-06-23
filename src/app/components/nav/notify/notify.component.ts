import { Component, ElementRef, HostListener } from '@angular/core';
const filters = [
  (item: any) => item,
  (item: any) => !item.isRead,

];
@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrl: './notify.component.scss'
})

export class NotifyComponent {
  listnotifyDTO = [
    { 'notify': "name1", 'isRead': true },
    { 'notify': "name2", 'isRead': true },
    { 'notify': "name3", 'isRead': false },
    { 'notify': "name4", 'isRead': false },
  ]
  lengthnotify: number = 0
  optionNotify = 0;
  isShowNotify = false;
  isShowOptionGeneral = false;
  isShowOption: number | null = null;;
  hoveredIndexNotify: number | null = null;
  listnotify?: any[]

  constructor(private elementRef: ElementRef) {
  }
  ngOnInit(): void {
    this.listnotify = this.listnotifyDTO.filter(filters[0]);
    this.lengthnotify = this.listnotifyDTO.filter(filters[1]).length
  }
  toggleOptionNotify(value: number) {

    this.optionNotify = value
    this.listnotify = this.listnotifyDTO.filter(filters[this.optionNotify]);

  }
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: any): void {
    let formsElement = this.elementRef.nativeElement.querySelector('.notify');

    if (!formsElement.contains(event.target) && this.isShowNotify) {
      this.isShowNotify = false;
    }

  }

  onDelete(i: any) {
    console.log(i);
    this.isShowOption = null
  }
  OnRead() {
    this.isShowOption = null

  }
  onClickNotifyBell() {

    this.isShowNotify = !this.isShowNotify
    this.isShowOptionGeneral = false
    this.isShowOption = null
  }
  onClickOption(i: number) {

    if (this.isShowOption == i) {
      this.isShowOption = null
      return
    }
    this.isShowOption = i


  }

}
