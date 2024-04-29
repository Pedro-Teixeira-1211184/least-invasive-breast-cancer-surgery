import { Repo } from "../../core/infra/Repo";
import {Model} from "../../domain/ObjModel";

export default interface IModelRepo extends Repo<Model> {
    exists(model: Model): Promise<boolean>;
    save(model: Model): Promise<Model>;
    findByPatientId(patientId: string): Promise<Model[]>;
}