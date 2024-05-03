import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptAddPageComponent } from './prompt-add-page.component';

describe('PromptAddPageComponent', () => {
  let component: PromptAddPageComponent;
  let fixture: ComponentFixture<PromptAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromptAddPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromptAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
