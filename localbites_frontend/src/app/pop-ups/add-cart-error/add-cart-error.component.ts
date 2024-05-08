import { Component, ViewEncapsulation  } from '@angular/core';

@Component({
  selector: 'app-restaurant-mismatch-popup',
  template: `
    <h2>You can only add items from the same restaurant to the cart</h2>
    <button mat-button (click)="close()">Close</button>
  `,
  styles: [
    `
      :host {
        display: block;
        text-align: center;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None
})
export class AddCartErrorComponent {
  close(): void {
    // Close the dialog
  }
}
