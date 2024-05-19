import {Component, inject, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import IModelDTO from "../../../dto/IModelDTO";
import {ModelsService} from "../../../service/models/models.service";
import {AuthService} from "../../../service/auth/auth.service";
import {IPatientDTO} from "../../../dto/IPatientDTO";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-upload-doctor',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './upload-doctor.component.html',
  styleUrl: './upload-doctor.component.css'
})
export class UploadDoctorComponent implements OnInit {
  ngOnInit(): void {
    const id = localStorage.getItem('id');
    if (id === null) {
      return;
    }
    this.getModelsByDoctorId(id);
    this.getPatients();
    this.uploadForm = new FormGroup({
      patient: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  constructor() {
  }

  models: (IModelDTO & { patient: string, sns: number })[] = [];
  noModels: boolean = false;
  selectedFile: File | null = null;
  patients: IPatientDTO[] = [];

  service: ModelsService = inject(ModelsService);
  auth_service: AuthService = inject(AuthService);

  uploadForm!: FormGroup;

  get patient() {
    return this.uploadForm.get('patient');
  }

  get description() {
    return this.uploadForm.get('description');
  }

  public async getModelsByDoctorId(doctorId: string): Promise<any> {
    const response = await this.service.getModelByDoctorId(doctorId);
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
  }

  public async onSubmit(): Promise<void> {
    if (this.patient?.value === '' || this.description?.value === '' || this.selectedFile === null) {
      alert('Fill all fields.');
      return;
    }
    const resp = await this.service.uploadModel(this.selectedFile, this.patient?.value, this.description?.value);

    if (resp !== null) {
      const docId = localStorage.getItem('id');
      if (docId === null) {
        return;
      }
      await this.service.doctorFilePermission(docId, resp.id);
      await this.getModelsByDoctorId(docId);
      // clear form
      this.uploadForm.reset();
    }
  }

  public async onFileSelected(event: any): Promise<void> {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
}
