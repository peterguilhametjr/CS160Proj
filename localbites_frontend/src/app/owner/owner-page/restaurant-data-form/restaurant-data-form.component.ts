import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from '../../../shared/models/Restaurant';
import { ReactiveFormsModule } from '@angular/forms'; // Ensure this import is present

@Component({
  selector: 'app-restaurant-data-form',
  templateUrl: './restaurant-data-form.component.html',
  styleUrls: ['./restaurant-data-form.component.css']
})
export class RestaurantDataFormComponent implements OnInit {
  @Input() buttonText: any;
  @Input() currentName = '';
  @Input() currentLocation = '';
 // @Input() currentTags: string[] = [];
  @Input() currentStars = 0;
  @Input() currentImageURL = '';

  name: string = '';
  location: string = '';
  tags: string[] = [];
 // tagsString: string = '';  // Add this line here
  stars: number = 0;
  imageURL: string = '';

  @Output() onSubmit = new EventEmitter<Restaurant>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.name = this.currentName;
    this.location = this.currentLocation;
  //  this.tags = this.currentTags;
    this.stars = this.currentStars;
    this.imageURL = this.currentImageURL;
   // this.tagsString = this.tags.join(', ');  // Convert array to comma-separated string
  }

  onButtonClicked() {
    const newRestaurant: Restaurant = {
      name: this.name,
      location: this.location,
      //  tags: this.tagsString.split(',').map(tag => tag.trim()), // Convert string back to array
      //   favorite: this.favorite,
      stars: this.stars,
      imageURL: this.imageURL,
      id: 0,
      favorite: false
    };
    this.onSubmit.emit(newRestaurant);
  }
}



