import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsDoctorComponent } from './models-doctor.component';

describe('ModelsDoctorComponent', () => {
  let component: ModelsDoctorComponent;
  let fixture: ComponentFixture<ModelsDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelsDoctorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelsDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
