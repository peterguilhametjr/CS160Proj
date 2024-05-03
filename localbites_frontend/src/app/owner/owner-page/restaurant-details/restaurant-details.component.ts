import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrl: './restaurant-details.component.css'
})
export class RestaurantDetailsComponent {
  name:String = "";
  location:String = "";


    
  constructor(private route:ActivatedRoute, private router:Router) {
  
  }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['name'])
        this.name = params['name'];
      if (params['location'])
        this.location = params['location'];
    })
  }
  
  register():void{
    if(this.name && this.location)
      this.router.navigateByUrl('/ownerPage')
  }

  counter(count: number){
    return Array.from({length:count}, (_, index) => index + 1);
  }
}
