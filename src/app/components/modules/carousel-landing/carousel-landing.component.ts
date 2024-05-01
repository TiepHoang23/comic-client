import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-landing',
  templateUrl: './carousel-landing.component.html',
  styleUrls: ['./carousel-landing.component.scss'] // Change styleUrl to styleUrls
})
export class CarouselLandingComponent implements OnInit {

  carouselItems = [
    { src: 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', alt: 'Image 1' },
    { src: 'https://angular.io/assets/images/tutorials/faa/example-house.jpg', alt: 'Image 2' },
    // { src: 'https://images.unsplash.com/photo-1520769669658-f07657f5a307?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', alt: 'Image 3' }
    // Add more items as needed
  ];
  selectedIndex = 0;
  isTransitioning: boolean = false;
  private interval: any; // Variable to hold the interval

  ngOnInit() {
    // Start automatic sliding on component initialization
    // this.startAutoSlide();
  }

  ngOnDestroy() {
    // Clear the interval to avoid memory leaks when component is destroyed
    clearInterval(this.interval);
  }

  private startAutoSlide() {
    this.interval = setInterval(() => {
      this.nextSlide(); // Move to the next slide automatically
    }, 5000); // Change 5000 to the desired interval in milliseconds
  }
  selectSlide(index: number) {
    this.selectedIndex = index;
  }

  prevSlide() {
    this.selectedIndex = (this.selectedIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
  }

  nextSlide() {
    this.selectedIndex = (this.selectedIndex + 1) % this.carouselItems.length;
  }

  // private resetAutoSlide() {
  //   clearInterval(this.interval); // Clear the existing interval
  //   this.startAutoSlide(); // Restart the automatic sliding
  // }
}
