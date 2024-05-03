import { Component } from '@angular/core';
import { ListingsService } from '../../../listings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from '../../../shared/models/Menu';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css'
})
export class UserMenuComponent {

  Menus: Menu[] = [];

  constructor(
    private menuService: ListingsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); 
    if (id) {
      this.menuService.getUserRestaurantsMenuRoute(id).subscribe(
        (menus: Menu[]) => {
          this.Menus = menus;
        },
        (error) => {
          console.error('Error loading menus:', error);
        }
      );
    }
  }


  
  
}

