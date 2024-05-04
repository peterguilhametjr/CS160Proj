import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptUpdatePageComponent } from './prompt-update-page.component';

describe('PromptUpdatePageComponent', () => {
  let component: PromptUpdatePageComponent;
  let fixture: ComponentFixture<PromptUpdatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromptUpdatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromptUpdatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
