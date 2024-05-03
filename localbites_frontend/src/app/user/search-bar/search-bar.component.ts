import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit{

  searchTerm:String = "";
  constructor(private route:ActivatedRoute, private router:Router) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['searchTerm'])
        this.searchTerm = params['searchTerm'];
    })
  }

  search():void{
    if(this.searchTerm)
      this.router.navigateByUrl('searchPage/search/' + this.searchTerm)
  }
}
