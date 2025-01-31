import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomePageComponent {

  private currentIndex = 0;
  private readonly itemsPerSlide = 1;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onNext() {
    const track = document.querySelector('.carousel-track') as HTMLElement;
    const items = track.children;
    const totalItems = items.length;
    const itemWidth = items[0].clientWidth;

    if (this.currentIndex < totalItems - this.itemsPerSlide) {
      this.currentIndex++;
      track.style.transform = `translateX(-${this.currentIndex * itemWidth}px)`;
    }
  }

  onPrev() {
    const track = document.querySelector('.carousel-track') as HTMLElement;
    const items = track.children;
    const itemWidth = items[0].clientWidth;

    if (this.currentIndex > 0) {
      this.currentIndex--;
      track.style.transform = `translateX(-${this.currentIndex * itemWidth}px)`;
    }
  }

  navigateToReservation(): void {
    this.router.navigate(['/reservation-form']);
  }
}
