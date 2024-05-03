import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListingsService } from '../../../listings.service';
import { Menu } from '../../../shared/models/Menu';

@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.css'] 
})
export class UpdateMenuComponent implements OnInit {
  menuForm!: FormGroup;  // Using the definite assignment assertion '!' since it will be initialized in ngOnInit

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private listingsService: ListingsService
  ) {}

  ngOnInit(): void {
    this.initializeForm();  // Ensure form is initialized here
    const id = this.route.snapshot.paramMap.get('id');
    const itemId = this.route.snapshot.paramMap.get('item_id');

    if (id && itemId) {  // Checking that both id and itemId are not null
      this.loadMenuItem(id, itemId);
    } else {
      console.error('ID or Item ID is missing');
      // Optionally redirect the user or display an error message
      this.router.navigate(['/some-error-page']); // Redirect to an error page or dashboard
    }
  }

  initializeForm(): void {
    this.menuForm = this.fb.group({
      itemName: ['', Validators.required],
      itemPrice: [null, [Validators.required, Validators.min(0)]]
    });
  }
  
  loadMenuItem(id: string, itemId: string): void {
    this.listingsService.getItemRoute(id, itemId).subscribe({
      next: (menu: Menu) => { 
        console.log('Received menu data:', menu);
        if (menu.itemDetails) {   // this is where i had to add items_details to make it load the data onto form, else it wouldn't work
          this.menuForm.patchValue({
            itemName: menu.itemDetails.name,
            itemPrice: menu.itemDetails.price
          });
        } else {
          console.error('Item details are missing');
        }
      },
      error: (err) => {
        console.error('Error loading menu item:', err);
        this.router.navigate(['/error']); // Handle errors appropriately
      }
    });
  }

  onSubmit(): void { //its updaing without itemsdetails.
    if (this.menuForm.valid) {
      const { itemName, itemPrice } = this.menuForm.value; // update only name and price and take 2 ids from url only
      const id = this.route.snapshot.paramMap.get('id')!;
      const itemId = this.route.snapshot.paramMap.get('item_id')!;
      console.log(`Submitting update for ID: ${id}, Item ID: ${itemId}, Name: ${itemName}, Price: ${itemPrice}`);

      this.listingsService.updateMenuRoute(id, itemId, itemName, itemPrice).subscribe({
        next: (updatedMenu) => {
          console.log('Update successful', updatedMenu);
          this.router.navigateByUrl(`ownerPage/menu/${id}`); // routerlink issue, maybe url not valid or so
        },
        error: (updateError) => {
          console.error('Failed to update menu item', updateError);
          alert('Update failed: ' + updateError.message);
        }
      });
    } else {
      console.error('Form is not valid', this.menuForm.errors);
    }
  }
}
