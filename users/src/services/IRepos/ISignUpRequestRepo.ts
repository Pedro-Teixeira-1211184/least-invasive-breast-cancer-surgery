import {Repo} from "../../core/infra/Repo";
import {User} from "../../domain/user";
import {UserEmail} from "../../domain/userEmail";
import {SignUpRequest} from "../../domain/signUpRequest";
import {ISignUpRequestDTO} from "../../dto/ISignUpRequestDTO";
import {SignUpRequestPatient} from "../../domain/signUpRequestPatient";
import {ISignUpRequestPatientDTO} from "../../dto/ISignUpRequestPatientDTO";

export default interface ISignUpRequestRepo extends Repo<SignUpRequest> {
  save(signUpRequest: SignUpRequest): Promise<SignUpRequest>;
  savePatient(signUpRequest: SignUpRequestPatient): Promise<SignUpRequestPatient>;
  findByEmail(email: string): Promise<SignUpRequest>;
  findPatientByEmail(email: UserEmail | string): Promise<SignUpRequestPatient>;
  delete(signUpRequest: SignUpRequest): Promise<ISignUpRequestDTO>;
  deletePatient(signUpRequest: SignUpRequestPatient): Promise<ISignUpRequestPatientDTO>;
  exists(signUpRequest: SignUpRequest): Promise<boolean>;
  getAll(): Promise<SignUpRequest[]>;
  getAllPatients(): Promise<SignUpRequestPatient[]>;
}
