import { Component } from '@angular/core';

@Component({
  selector: 'app-list-card-skeleton',
  templateUrl: './list-card-skeleton.component.html',
  styleUrl: './list-card-skeleton.component.scss',
})
export class ListCardSkeletonComponent {
  skeletonItems: any[] = Array(45).fill(0); // Array to hold skeleton items
}
