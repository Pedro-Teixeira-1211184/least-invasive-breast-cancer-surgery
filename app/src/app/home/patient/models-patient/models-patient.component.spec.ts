import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsPatientComponent } from './models-patient.component';

describe('ModelsPatientComponent', () => {
  let component: ModelsPatientComponent;
  let fixture: ComponentFixture<ModelsPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelsPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModelsPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
