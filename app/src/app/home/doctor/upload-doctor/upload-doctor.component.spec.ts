import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDoctorComponent } from './upload-doctor.component';

describe('UploadDoctorComponent', () => {
  let component: UploadDoctorComponent;
  let fixture: ComponentFixture<UploadDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadDoctorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
