import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Chapter } from '../../../dataSource/schema/Chapter';

@Component({
  selector: 'app-chapter-selector',
  templateUrl: './chapter-selector.component.html',
  styleUrls: ['./chapter-selector.component.scss'],
})
export class ChapterSelectorComponent {
  @Input() comic: any;
  @Input() mainChapter: any;
  @Output() chapterChange = new EventEmitter<number>();

  isDropdownOpen = false;
  selectedChapter!: Chapter;
  searchTerm: string = '';
  filteredChapters: Chapter[] = [];
  displayedChapters: Chapter[] = [];
  private itemsToShow = 20;

  @ViewChild('dropdownList') dropdownList!: ElementRef;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isDropdownOpen) {
      setTimeout(() => this.scrollToSelectedChapter(), 5);
    }
  }

  ngOnInit() {
    this.filteredChapters = this.comic.chapters;
    this.loadMoreItems();
  }

  selectChapter(chapter: Chapter) {
    this.selectedChapter = chapter;
    this.chapterChange.emit(chapter.id);
    this.isDropdownOpen = false;
  }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value?.toLowerCase();
    this.filteredChapters = this.searchTerm
      ? this.comic.chapters.filter((chapter: any) =>
          chapter.title.toLowerCase().includes(this.searchTerm),
        )
      : this.comic.chapters;
    this.displayedChapters = [];
    this.loadMoreItems();
  }

  loadMoreItems() {
    const nextItems = this.filteredChapters.slice(
      this.displayedChapters.length,
      this.displayedChapters.length + this.itemsToShow,
    );
    this.displayedChapters = this.displayedChapters.concat(nextItems);
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any): void {
    const element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      this.loadMoreItems();
    }
  }

  scrollToSelectedChapter() {
    const selectedIndex = this.filteredChapters.findIndex(
      (chapter) => chapter.id === this.selectedChapter?.id,
    );
    if (selectedIndex >= 0) {
      const chapterItems = this.dropdownList.nativeElement.children;
      const selectedItem = chapterItems[selectedIndex];
      if (selectedItem) {
        selectedItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }
}
