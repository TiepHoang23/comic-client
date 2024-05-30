import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent {
  @Input() initialRating: number = 0;
  @Output() ratingChanged: EventEmitter<number> = new EventEmitter<number>();

  selectedStars: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];

  ngOnInit() {
    this.selectedStars = this.initialRating;
  }

  rateStar(starIndex: number) {
    this.selectedStars = starIndex;
    this.ratingChanged.emit(this.selectedStars);
  }

  highlightStars(starIndex: number) {
    this.selectedStars = starIndex;
  }

  resetStars() {
    this.selectedStars = this.initialRating;
  }
}
