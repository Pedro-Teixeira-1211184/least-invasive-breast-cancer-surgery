import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImagComponent } from './upload-imag.component';

describe('UploadImagComponent', () => {
  let component: UploadImagComponent;
  let fixture: ComponentFixture<UploadImagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadImagComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadImagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
