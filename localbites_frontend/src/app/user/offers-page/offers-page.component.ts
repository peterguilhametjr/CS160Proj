import { Component, OnInit } from '@angular/core';
//import {OffersService} from '../../services/offers/offers.service';
import {Offer} from '../../shared/models/Offer'
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from '../../listings.service';

@Component({
  selector: 'app-offers-page',
  templateUrl: './offers-page.component.html',
  styleUrl: './offers-page.component.css'
})
export class OffersPageComponent implements OnInit{
  offers:Offer[] = [];
  filteredoffers: Offer[] = [];

  // searchTitle: string;

  constructor(private offersService:ListingsService, private route:ActivatedRoute){ }

  ngOnInit(): void {
    this.offersService.getAllOffersRoute().subscribe(offers => {
      this.offers = offers;
      this.filteredoffers = offers;
    });
  }

  // if need to add search bar here too 
  filteroffers(event: Event): void {
    const query = (event.target as HTMLInputElement).value; 
    this.filteredoffers = this.offers.filter(offers =>
      offers.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}
