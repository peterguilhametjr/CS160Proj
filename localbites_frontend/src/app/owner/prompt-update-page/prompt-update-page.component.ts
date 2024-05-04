import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prompt-update-page',
  templateUrl: './prompt-update-page.component.html',
  styleUrl: './prompt-update-page.component.css'
})
export class PromptUpdatePageComponent {
  user_id: string | null = '';
  restaurant_id: string | null = '';


  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.user_id = params.get('user_id');
      this.restaurant_id = params.get('restaurant_id');
    });
  }
  navigateToUpdtMenu(): void {
    if (this.user_id && this.restaurant_id) {
      this.router.navigate(['/ownerPage', this.user_id, 'updaterestaurant', this.restaurant_id, 'prompt_update', 'updatemenu'])
      // 'ownerPage/:user_id/addrestaurant/:restaurant_id/prompt_add/addmenu'
    }
    else {
      console.error("User ID or Restaurant ID not available")
    }
  }

  navigateToOwnerPage(): void {
    if (this.user_id && this.restaurant_id) {
      this.router.navigate(['/ownerPage', this.user_id])
    }
    else {
      console.error("User ID or Restaurant ID not available")
    }
  }
}
