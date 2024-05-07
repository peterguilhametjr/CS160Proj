import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverTaskbarComponent } from './driver-taskbar.component';

describe('DriverTaskbarComponent', () => {
  let component: DriverTaskbarComponent;
  let fixture: ComponentFixture<DriverTaskbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DriverTaskbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DriverTaskbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
