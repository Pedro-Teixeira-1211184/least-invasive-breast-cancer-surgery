import { Result } from "../../core/logic/Result";
import { IUserDTO } from "../../dto/IUserDTO";
import {IPatientDTO} from "../../dto/IPatientDTO";

export default interface IUserService  {
  SignUp(userDTO: IUserDTO): Promise<Result<{userDTO: IUserDTO, token: string}>>;
  SignUpPatient(userDTO: IPatientDTO): Promise<Result<{ userDTO: IPatientDTO, token: string }>>;
  SignIn(email: string, password: string): Promise<Result<{ userDTO: IUserDTO, token: string }>>;
  SignInPatient(email: string, password: string): Promise<Result<{ userDTO: IPatientDTO, token: string }>>;
}
