import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Chapter } from '../../../dataSource/schema/Chapter';

@Component({
  selector: 'app-chapter-selector',
  templateUrl: './chapter-selector.component.html',
  styleUrl: './chapter-selector.component.scss',
})
export class ChapterSelectorComponent {
  @Input() comic: any;
  @Input() mainChapter: any;
  @Output() chapterChange = new EventEmitter<number>();

  isDropdownOpen = false;
  selectedChapter!: Chapter;
  searchTerm: string = '';
  filteredChapters: Chapter[] = [];
  @ViewChild('dropdownList') dropdownList!: ElementRef;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isDropdownOpen) {
      setTimeout(() => this.scrollToSelectedChapter(), 5);
    }
  }

  ngOnInit() {
    this.filteredChapters = this.comic.chapters;
  }

  selectChapter(chapter: Chapter) {
    this.selectedChapter = chapter;
    this.chapterChange.emit(chapter.id);
    this.isDropdownOpen = false;
  }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value?.toLowerCase();
    if (!this.searchTerm) {
      this.filteredChapters = this.comic.chapters;
      return;
    }
    this.filteredChapters = this.comic.chapters.filter((chapter: any) =>
      chapter.title.toLowerCase().includes(this.searchTerm),
    );
  }
  scrollToSelectedChapter() {
    const selectedIndex = this.filteredChapters.findIndex(
      (chapter) => chapter.id === this.selectedChapter?.id,
    );
    console.log({ selectedIndex });
    if (selectedIndex >= 0) {
      const chapterItems = this.dropdownList.nativeElement.children;
      const selectedItem = chapterItems[selectedIndex];
      if (selectedItem) {
        selectedItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }
}
