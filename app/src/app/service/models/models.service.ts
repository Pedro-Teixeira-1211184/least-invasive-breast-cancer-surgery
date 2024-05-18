import {Injectable} from '@angular/core';
import Constants from "../../utils/Constants";

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  constructor() {
  }

  public async getModelsByPatientId(patientId: string): Promise<any> {
    try {
      const response = await fetch(Constants.API_GET_MODELS_PATIENTID + patientId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        return await response.json();
      } else {
        return null;
      }
    } catch (e) {
      console.error(e)
    }
  }

  public async getModelByModelId(modelId: string): Promise<any> {
    try {
      const response = await fetch(Constants.API_GET_MODELS_MODELID + modelId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        return await response.blob();
      } else {
        return null;
      }
    } catch (e) {
      console.error(e)
    }
  }
}
