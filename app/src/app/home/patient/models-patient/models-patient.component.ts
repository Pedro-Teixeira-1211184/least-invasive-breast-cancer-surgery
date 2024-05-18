import {Component, inject, OnInit} from '@angular/core';
import {ModelsService} from "../../../service/models/models.service";
import IModelDTO from "../../../dto/IModelDTO";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-models-patient',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './models-patient.component.html',
  styleUrl: './models-patient.component.css'
})
export class ModelsPatientComponent implements OnInit {

  ngOnInit(): void {
    const id = localStorage.getItem('id');
    if (id === null) {
      return;
    }
    this.getModelsByPatientId(id).then(r => {
      this.models = r;
    });
    if (this.models.length == null) {
      this.noModels = true;
    }
  }

  constructor() {
  }

  models: IModelDTO[] = [];
  noModels: boolean = false;

  service: ModelsService = inject(ModelsService);

  public async getModelsByPatientId(patientId: string): Promise<any> {
    return await this.service.getModelsByPatientId(patientId);
  }

  public async downloadModel(model: IModelDTO) {
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
}
