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

  public async getModelByDoctorId(doctorId: string): Promise<any> {
    try {
      const response = await fetch(Constants.API_GET_MODELS_DOCTORID + doctorId, {
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

  public async deleteModelPermissionsByModelId(modelId: string): Promise<any> {
    try {
      const response = await fetch(Constants.API_DELETE_MODELS_PERMISSIONS_MODELID + modelId, {
        method: 'DELETE',
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

  public async deleteModelByModelId(modelId: string): Promise<any> {
    try {
      const response = await fetch(Constants.API_DELETE_MODELS_MODELID + modelId, {
        method: 'DELETE',
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

  public async uploadModel(file: File, patientId: string, description: string): Promise<any> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('patientId', patientId);
      formData.append('description', description);

      const response = await fetch(Constants.API_UPLOAD_MODELS, {
        method: 'POST',
        body: formData
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

  public async doctorFilePermission(doctorId: string, modelId: string): Promise<any> {
    try {
      const response = await fetch(Constants.API_UPLOAD_MODELS_PERMISSIONS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          doctorId: doctorId,
          modelId: modelId
        })
      });
    } catch (e) {
      console.error(e)
    }
  }
}
