import {Result} from "../../core/logic/Result";
import {IPatientDTO} from "../../dto/IPatientDTO";


export default interface IUserServiceOnion  {
  findPatientByPatientId(patientId: string): Promise<Result<IPatientDTO>>;
}
