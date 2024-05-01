import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-layout',
  templateUrl: './carousel-layout.component.html',
  styleUrl: './carousel-layout.component.scss'
})
export class CarouselLayoutComponent implements OnInit {
  images: string[] = [];
  imageUrls: string[] = [
    'https://images.unsplash.com/photo-1520769669658-f07657f5a307?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1520769669658-f07657f5a307?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1520769669658-f07657f5a307?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1520769669658-f07657f5a307?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
  ];

  constructor() { }

  ngOnInit(): void {
    this.preloadImages();
  }

  preloadImages(): void {
    this.imageUrls.forEach((url, index) => {
      const img = new Image();
      img.onload = () => {
        this.images[index] = `url(${url})`;
      };
      img.src = url;
    });
  }


}
