import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsImagComponent } from './models-imag.component';

describe('ModelsImagComponent', () => {
  let component: ModelsImagComponent;
  let fixture: ComponentFixture<ModelsImagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelsImagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelsImagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
