import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ListingsService } from '../../../listings.service';
import { Menu } from '../../../shared/models/Menu';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {
  menuForm!: FormGroup;
  user_id: string | null = null; // Initialize id as null
  restaurant_id: string | null = null;

  constructor(
    private fb: FormBuilder,
    private listingsService: ListingsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.user_id = this.route.snapshot.paramMap.get('user_id'); // Retrieve id from route parameters
    this.restaurant_id = this.route.snapshot.paramMap.get('id')
  }

  initializeForm(): void {
    this.menuForm = this.fb.group({
      menus: this.fb.array([]) // Initialize an empty array for menu items
    });
    this.addMenuItem(); // Add one menu item by default
  }
  get menuArray() {
    return this.menuForm.get('menus') as FormArray;
  }

  addMenuItem(): void {
    const menuItem = this.fb.group({
      itemName: ['', Validators.required],
      itemPrice: [null, [Validators.required, Validators.min(0)]]
    });
    this.menuArray.push(menuItem);
  }

  removeMenuItem(index: number): void {
    this.menuArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.menuForm.valid && this.restaurant_id) { // Check if id exists
      const menus = this.menuForm.value.menus;
      console.log("step 1");
      console.log("rest: " + this.menuForm.value);
      menus.forEach((menu: any) => {
        const { itemName, itemPrice } = menu;
        console.log("step 2");
        this.listingsService.addMenuRoute(this.user_id!, this.restaurant_id!, itemName, itemPrice).subscribe({
          next: (response) => {
            console.log("step 3");
            console.log('Add menu item successful:', response);
            this.router.navigate(['/ownerPage', this.user_id]);
          },
          error: (err) => {
            console.error('Failed to add menu item:', err);
          }
        });
      });
    } else {
      console.log('restaurant_id: ' + this.restaurant_id)
      console.error('Form is not valid or id is missing');
    }
  }
}
