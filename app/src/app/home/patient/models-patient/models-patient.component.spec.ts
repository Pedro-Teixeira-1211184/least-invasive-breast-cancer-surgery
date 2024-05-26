import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ModelsPatientComponent } from './models-patient.component';
import { ModelsService } from '../../../service/models/models.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

class MockModelsService {
  getModelsByPatientId(patientId: string) {
    return Promise.resolve([
      { id: '1', patientId: '1', description: 'Model 1', path: 'model1.obj' },
      { id: '2', patientId: '1', description: 'Model 2', path: 'model2.obj' }
    ]);
  }

  getModelByModelId(modelId: string) {
    return Promise.resolve(new Blob());
  }
}

describe('ModelsPatientComponent', () => {
  let component: ModelsPatientComponent;
  let fixture: ComponentFixture<ModelsPatientComponent>;
  let modelsService: ModelsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelsPatientComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [{ provide: ModelsService, useClass: MockModelsService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ModelsPatientComponent);
    component = fixture.componentInstance;
    modelsService = TestBed.inject(ModelsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize models', fakeAsync(() => {
    expect(component.models.length).toBe(0);
    tick();
    fixture.detectChanges();
    expect(component.models.length).toBe(2);
  }));

  it('should download model', fakeAsync(() => {
    spyOn(component, 'downloadModel').and.callThrough();
    component.models = [{ id: '1', patientId: '1', description: 'Model 1', path: 'model1.obj' }];
    fixture.detectChanges();
    tick();

    const downloadButton = fixture.debugElement.query(By.css('.download-button')).nativeElement;
    downloadButton.click();
    tick();
    expect(component.downloadModel).toHaveBeenCalledWith(component.models[0]);
  }));
});
