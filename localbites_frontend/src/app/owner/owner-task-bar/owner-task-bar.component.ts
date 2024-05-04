import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/UserService';

@Component({
  selector: 'app-owner-task-bar',
  templateUrl: './owner-task-bar.component.html',
  styleUrl: './owner-task-bar.component.css'
})

export class OwnerTaskBarComponent implements OnInit{
  user_id!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = this.userService.getUserId();
    console.log("idddd: " + userId)
    this.user_id = userId!
  }

  navigateToHomePage(): void {
    console.log("work?: " + this.user_id)
    if (this.user_id) {
      console.log("useId: " + this.user_id)
      // this.router.navigate(['/ownerPage', this.user_id]) 
      this.router.navigate(['/ownerPage', this.user_id])    
    }
    else {
      console.log("didn't work")
      console.error("User ID not available")
    }
  }
}
