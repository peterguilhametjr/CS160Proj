import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerTaskBarComponent } from './owner-task-bar.component';

describe('OwnerTaskBarComponent', () => {
  let component: OwnerTaskBarComponent;
  let fixture: ComponentFixture<OwnerTaskBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OwnerTaskBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerTaskBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
