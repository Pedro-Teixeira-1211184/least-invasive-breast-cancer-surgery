import {ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {ModelsImagComponent} from './models-imag.component';
import {AuthService} from '../../../service/auth/auth.service';
import {ModelsService} from '../../../service/models/models.service';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {of} from 'rxjs';
import {By} from '@angular/platform-browser';

class MockAuthService {
  getAllPatients() {
    return Promise.resolve([
      {id: '1', firstName: 'John', lastName: 'Doe', sns: 12345},
      {id: '2', firstName: 'Jane', lastName: 'Smith', sns: 67890}
    ]);
  }

  getAllDoctors() {
    return Promise.resolve([
      {id: '1', firstName: 'Dr. John', lastName: 'Doe', email: 'john@example.com', checked: false},
      {id: '2', firstName: 'Dr. Jane', lastName: 'Smith', email: 'jane@example.com', checked: false}
    ]);
  }

  getPatientById(id: string) {
    return Promise.resolve({id, firstName: 'John', lastName: 'Doe', sns: 12345});
  }

  isAuthenticated() {
    return Promise.resolve(false);
  }
}

class MockModelsService {
  getModelByImagiologistId(imgId: string) {
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

  doctorFilePermissionWithImagiologist(doctorId: string, modelId: string, imgId: string) {
    return Promise.resolve(true);
  }
}

describe('ModelsImagComponent', () => {
  let component: ModelsImagComponent;
  let fixture: ComponentFixture<ModelsImagComponent>;
  let authService: AuthService;
  let modelsService: ModelsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [
        ModelsImagComponent
      ],
      providers: [
        {provide: AuthService, useClass: MockAuthService},
        {provide: ModelsService, useClass: MockModelsService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModelsImagComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    modelsService = TestBed.inject(ModelsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all patients and doctors', fakeAsync(() => {
      spyOn(authService, 'getAllPatients').and.callThrough();
      spyOn(authService, 'getAllDoctors').and.callThrough();
      component.ngOnInit();
      tick();
      expect(authService.getAllPatients).toHaveBeenCalled();
      expect(authService.getAllDoctors).toHaveBeenCalled();
      expect(component.doctors).toEqual([
        {id: '1', firstName: 'Dr. John', lastName: 'Doe', email: 'john@test.com', checked: false},
        {id: '2', firstName: 'Dr. Jane', lastName: 'Smith', email: 'jane@test.com', checked: false}
      ]);
    }
  ));
});
