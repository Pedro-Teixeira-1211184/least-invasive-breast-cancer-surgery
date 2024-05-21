import {Component, inject, Input, OnInit} from '@angular/core';
import {IPatientDTO} from "../../../dto/IPatientDTO";
import {IUserDTO} from "../../../dto/IUserDTO";
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import IModelDTO from "../../../dto/IModelDTO";
import {ModelsService} from "../../../service/models/models.service";
import {AuthService} from "../../../service/auth/auth.service";
import {JsonPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-models-imag',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    JsonPipe
  ],
  templateUrl: './models-imag.component.html',
  styleUrl: './models-imag.component.css'
})
export class ModelsImagComponent implements OnInit {

  ngOnInit(): void {
    const id = localStorage.getItem('id');
    if (id === null) {
      return;
    }
    this.getModelsByImagiologistId(id);
    this.getPatients();
    this.getDoctors();
    this.uploadForm = new FormGroup({
      patient: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  constructor() {
  }

  get result() {
    return this.doctors.filter(item => item.checked);
  }

  models: (IModelDTO & { patient: string, sns: number })[] = [];
  noModels: boolean = false;
  selectedFile: File | null = null;
  patients: IPatientDTO[] = [];
  doctors: any[] = [];

  service: ModelsService = inject(ModelsService);
  auth_service: AuthService = inject(AuthService);

  uploadForm!: FormGroup;

  get patient() {
    return this.uploadForm.get('patient');
  }

  get description() {
    return this.uploadForm.get('description');
  }


  public async getModelsByImagiologistId(imgId: string): Promise<any> {
    const response = await this.service.getModelByImagiologistId(imgId);
    if (response.length === 0) {
      this.noModels = true;
    } else {
      this.models = response;
      await this.updateModelsInfo();
    }
  }

  public async getPatients(): Promise<void> {
    const response = await this.auth_service.getAllPatients();
    if (response.length === 0) {
      console.error('No patients found.');
    } else {
      this.patients = response;
    }
  }

  public async getDoctors(): Promise<void> {
    const response = await this.auth_service.getAllDoctors();
    if (response.length === 0) {
      console.error('No doctors found.');
    } else {
      this.doctors = response;
    }
  }

  public async downloadModel(model: IModelDTO & { patient: string, sns: number }) {
    const blob = await this.service.getModelByModelId(model.id);
    if (blob) {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const type = model.path.split('.').pop();
      a.download = model.id + '.' + type;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } else {
      console.error('Falha ao baixar o arquivo.');
    }
  }

  public async deleteModel(model: IModelDTO & { patient: string, sns: number }) {
    const response = await this.service.deleteModelPermissionsByModelId(model.id);
    if (response.length > 0) {
      this.models = this.models.filter(m => m.id !== model.id);
      const response2 = await this.service.deleteModelByModelId(model.id);
      if (response2) {
        console.log('Model deleted successfully.');
        alert('Model deleted successfully.');
        this.models = this.models.filter(m => m.id !== model.id);
      } else {
        alert('Error deleting model.');
      }
    } else {
      alert('Error deleting model.');
    }
  }

  private async updateModelsInfo() {
    for (let i = 0; i < this.models.length; i++) {
      const patientId = this.models[i].patientId;
      const patient = await this.auth_service.getPatientById(patientId);
      this.models[i].patient = patient.firstName + ' ' + patient.lastName;
      this.models[i].sns = patient.sns;
    }

    // Sort models by patient name
    this.models.sort((a, b) => {
      if (a.patient < b.patient) {
        return -1;
      }
      if (a.patient > b.patient) {
        return 1;
      }
      return 0;
    });
  }

  public async onSubmit(): Promise<void> {
    if (this.patient?.value === '' || this.description?.value === '' || this.selectedFile === null) {
      alert('Fill all fields.');
      return;
    }

    if (this.result.length === 0) {
      alert('Select at least one doctor.');
      return;
    }
    const resp = await this.service.uploadModel(this.selectedFile, this.patient?.value, this.description?.value);

    if (resp !== null) {
      const imgId = localStorage.getItem('id');
      if (imgId === null) {
        return;
      }
      for (let i = 0; i < this.result.length; i++) {
        await this.service.doctorFilePermissionWithImagiologist(
          this.result[i].id,
          resp.id,
          imgId
        );
      }
      await this.getModelsByImagiologistId(imgId);
      // clear form
      this.uploadForm.reset();
      this.selectedFile = null;
      this.doctors.forEach((item) => {
          item.checked = false;
        }
      );
    }
  }

  public async onFileSelected(event: any): Promise<void> {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

}
