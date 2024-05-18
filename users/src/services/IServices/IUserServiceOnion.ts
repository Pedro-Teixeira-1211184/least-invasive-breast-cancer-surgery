import {Result} from "../../core/logic/Result";
import {IUserDTO} from "../../dto/IUserDTO";
import {ISignUpRequestDTO} from "../../dto/ISignUpRequestDTO";
import {ISignUpRequestPatientDTO} from "../../dto/ISignUpRequestPatientDTO";
import {IPatientDTO} from "../../dto/IPatientDTO";


export default interface IUserServiceOnion  {
  getAllUsers(): Promise<Result<IUserDTO[]>>;
  getAllPatients(): Promise<Result<IPatientDTO[]>>;
  getAllPatientRequests(): Promise<Result<ISignUpRequestPatientDTO[]>>;
  signUpRequest(userDTO: ISignUpRequestDTO): Promise<Result<ISignUpRequestDTO>>;
  signUpPatientRequest(userDTO: ISignUpRequestPatientDTO): Promise<Result<ISignUpRequestPatientDTO>>;
  getAllUserRequests(): Promise<Result<ISignUpRequestDTO[]>>;
  deleteUserRequest(email: string): Promise<Result<ISignUpRequestDTO>>;
  deletePatientRequest(email: string): Promise<Result<ISignUpRequestPatientDTO>>;
  getPatientById(patientId: string): Promise<Result<IPatientDTO>>;
}
