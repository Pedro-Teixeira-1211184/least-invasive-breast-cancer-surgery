import {ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {UploadDoctorComponent} from './upload-doctor.component';
import {AuthService} from '../../../service/auth/auth.service';
import {ModelsService} from '../../../service/models/models.service';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';

class MockAuthService {
  getAllPatients() {
    return Promise.resolve([
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@test.com',
        password: 'test',
        role: 'patient',
        sns: 12345
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@test.com',
        password: 'test',
        role: 'patient',
        sns: 54321
      }
    ]);
  }

  getPatientById(id: string) {
    return Promise.resolve({
      id,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.com',
      password: 'test',
      role: 'patient',
      sns: 12345
    });
  }
}

class MockModelsService {
  getModelByDoctorId(doctorId: string) {
    return Promise.resolve([]);
  }

  getModelByModelId(modelId: string) {
    return Promise.resolve(new Blob());
  }

  deleteModelPermissionsByModelId(modelId: string) {
    return Promise.resolve([]);
  }

  deleteModelByModelId(modelId: string) {
    return Promise.resolve(true);
  }

  uploadModel(file: File, patientId: string, description: string) {
    return Promise.resolve({id: '1'});
  }

  doctorFilePermission(doctorId: string, modelId: string) {
    return Promise.resolve(true);
  }
}

describe('UploadDoctorComponent', () => {
  let component: UploadDoctorComponent;
  let fixture: ComponentFixture<UploadDoctorComponent>;
  let authService: AuthService;
  let modelsService: ModelsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        UploadDoctorComponent
      ],
      providers: [
        {provide: AuthService, useClass: MockAuthService},
        {provide: ModelsService, useClass: MockModelsService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadDoctorComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    modelsService = TestBed.inject(ModelsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });

  it('should initialize form', () => {
    expect(component.uploadForm).toBeDefined();
    expect(component.patient).toBeDefined();
    expect(component.description).toBeDefined();
  });

  it('should call onSubmit method', fakeAsync(() => {
    spyOn(component, 'onSubmit').and.callThrough();
    const button = fixture.debugElement.query(By.css('.upload-button')).nativeElement;
    button.click();
    tick();
    expect(component.onSubmit).toHaveBeenCalled();
  }));

  it('should clear form after successful upload', fakeAsync(() => {
    spyOn(modelsService, 'uploadModel').and.returnValue(Promise.resolve({id: '1'}));
    spyOn(component, 'getModelsByDoctorId').and.callThrough();
    component.uploadForm.setValue({patient: '1', description: 'Test model'});
    component.selectedFile = new File([''], 'test-model.obj');

    const button = fixture.debugElement.query(By.css('.upload-button')).nativeElement;
    button.click();
    tick();
    expect(component.uploadForm.value).toEqual({patient: '', description: ''});
    expect(component.selectedFile).toBeNull();
  }));

  it('should populate patients list on initialization', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    expect(component.patients.length).toBe(2);
    expect(component.patients[0].firstName).toBe('John');
    expect(component.patients[1].firstName).toBe('Jane');
  }));

  it('should download model', fakeAsync(() => {
    spyOn(component, 'downloadModel').and.callThrough();
    component.models = [{
      id: '1',
      patient: 'John Doe',
      sns: 12345,
      description: 'Test',
      patientId: '1',
      path: 'test.obj'
    }];
    fixture.detectChanges();
    tick();

    const downloadButton = fixture.debugElement.query(By.css('.download-button')).nativeElement;
    downloadButton.click();
    tick();
    expect(component.downloadModel).toHaveBeenCalledWith(component.models[0]);
  }));

  it('should delete model', fakeAsync(() => {
    spyOn(component, 'deleteModel').and.callThrough();
    component.models = [{
      id: '1',
      patient: 'John Doe',
      sns: 12345,
      description: 'Test',
      patientId: '1',
      path: 'test.obj'
    }];
    fixture.detectChanges();
    tick();

    const deleteButton = fixture.debugElement.query(By.css('.delete-button')).nativeElement;
    deleteButton.click();
    tick();
    expect(component.deleteModel).toHaveBeenCalledWith(component.models[0]);
  }));
});
