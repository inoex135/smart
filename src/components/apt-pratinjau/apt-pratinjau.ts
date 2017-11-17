import { Component, ViewChild } from "@angular/core";
import { Slides, NavController } from "ionic-angular";
@Component({
  selector: "apt-pratinjau",
  templateUrl: "apt-pratinjau.html"
})
export class AptPratinjauComponent {
  @ViewChild("slider") slider: Slides;
  currentIndex = 0;
  slides = [
    {
      title: "Dream's Adventure",
      imageUrl: "assets/img/lists/wishlist-1.jpg",
      songs: 2,
      private: false
    },
    {
      title: "Dream's Adventure",
      imageUrl: "assets/img/lists/wishlist-1.jpg",
      songs: 2,
      private: false
    }
  ];
  constructor() {}
  nextSlide() {
    this.slider.slideNext();
  }

  previousSlide() {
    this.slider.slidePrev();
  }

  onSlideChanged() {
    this.currentIndex = this.slider.getActiveIndex();
    console.log("Slide changed! Current index is", this.currentIndex);
  }
}
