import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/User';
import { ListingsService } from '../../listings.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent implements OnInit{
  user!:User;
  user_id!:string;
  user_id_num!:number;
  user_wallet:number = 0;
  amountToAdd:number = 0;

  constructor(private walletService: ListingsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.user_id = params.get('user_id')!;
      this.user_id_num = this.user_id !== null ? parseInt(this.user_id, 10) : 0;
      this.walletService.getUserSpecificAccount(this.user_id).subscribe(user => {
        this.user = user;
        this.user_wallet = user.wallet;
        console.log("check wallet: " + this.user_wallet)
      });
    });
  }

  addToWallet(): void {
    const newAmount = this.user_wallet + this.amountToAdd
    this.walletService.updateWalletByIdRoute(this.user_id_num, newAmount).subscribe({
      next: (updatedInfo) => {
        console.log('Update successful', updatedInfo);  
          this.user_wallet = updatedInfo.wallet;
      },
      // ownerPage/:user_id/updaterestaurant/:restaurant_id/prompt_update/updatemenu
      error: (updateError) => {
        console.error('Failed to update cart', updateError);
      }
    });
  }


}
