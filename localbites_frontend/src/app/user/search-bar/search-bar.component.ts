import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit{

  searchTerm:String = "";
  user_id!:string;

  constructor(private route:ActivatedRoute, private router:Router) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['searchTerm'])
        this.searchTerm = params['searchTerm'];
      if (params['user_id'])
        this.user_id = params['user_id']
    })
  }

  search():void{
    if(this.searchTerm)
      this.router.navigate(['/searchPage', this.user_id, 'search', this.searchTerm])
      // this.router.navigate(['/ownerPage', this.user_id, 'updaterestaurant', id])
  }
}
