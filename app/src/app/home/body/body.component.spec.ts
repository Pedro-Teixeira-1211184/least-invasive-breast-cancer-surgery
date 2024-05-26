import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyComponent } from './body.component';

describe('BodyComponent', () => {
  let component: BodyComponent;
  let fixture: ComponentFixture<BodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the welcome message', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.home-container h2').textContent).toContain('Welcome to Least Invasive Breast Cancer Surgery!');
  });

  it('should render the project description', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.home-container .project-description').textContent).toContain('This web application has been developed to help reduce the invasiveness of breast cancer surgery.');
  });

  it('should render the image', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.home-container .image-gallery img')).toBeTruthy();
  });
});
