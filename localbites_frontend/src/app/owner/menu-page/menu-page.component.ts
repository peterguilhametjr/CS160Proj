import { Component } from '@angular/core';
import { ListingsService } from '../../listings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from '../../shared/models/Menu';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent {

  Menus: Menu[] = [];
  id: string | null = null; // Declare id variable
  user_id: string | null = null;

  constructor(
    private menuService: ListingsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id'); // Assign id from URL to the class variable
    this.user_id = this.route.snapshot.paramMap.get('user_id'); // Assign id from URL to the class variable
    if (this.id) {
      this.menuService.getRestaurantsMenuRoute(this.id).subscribe(
        (menus: Menu[]) => {
          this.Menus = menus;
        },
        (error) => {
          console.error('Error loading menus:', error);
        }
      );
    }
  }

  onDeleteClicked(id: string, item_id: string): void {
    if (!this.id) return; // Check if id is available
    this.menuService.deleteMenuRoute(this.id, item_id).subscribe(
      () => {
        this.Menus = this.Menus.filter(menu => menu.item_id !== parseInt(item_id, 10));
        console.log('Menu item deleted successfully');
      },
      (error) => {
        console.error('Failed to delete menu item:', error);
      }
    );
  }

  navigateToUpdate(item_id: number): void {
    if (this.id && this.user_id && item_id) {
      this.router.navigate(['/ownerPage', this.user_id, 'updaterestaurant', this.id, 'menupage', item_id])
      
      console.log("work: " + this.user_id);
    }
    else {
      console.error("User ID not available")
    }
  }

  navigateToAddMenu(): void {
    if (this.id && this.user_id) {
      this.router.navigate(['/ownerPage', this.user_id, 'addrestaurant', this.id, 'addmenu'])
      
      console.log("work: " + this.user_id);
    }
    else {
      console.error("User ID not available")
    }
  }

  // ownerPage/:user_id/addrestaurant/:id/addmenu

  // {path:'ownerPage/:user_id/updaterestaurant/:id/menupage', component:MenuPageComponent},
  // {path:'ownerPage/:user_id/updaterestaurant/:id/menupage/:menuid', component:UpdateMenuComponent},
  navigateToUpdatePage(id: number): void {
    if (this.id) {
      this.router.navigate(['/ownerPage', this.user_id, 'updaterestaurant', id])
      
      console.log("work: " + this.user_id);
    }
    else {
      console.error("User ID not available")
    }
  }
}
