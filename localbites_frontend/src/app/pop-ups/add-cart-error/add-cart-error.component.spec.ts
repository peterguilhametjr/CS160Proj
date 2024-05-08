import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCartErrorComponent } from './add-cart-error.component';

describe('AddCartErrorComponent', () => {
  let component: AddCartErrorComponent;
  let fixture: ComponentFixture<AddCartErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCartErrorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCartErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
