import {Repo} from "../../core/infra/Repo";
import {User} from "../../domain/user";
import {UserEmail} from "../../domain/userEmail";
import {SignUpRequest} from "../../domain/signUpRequest";
import {ISignUpRequestDTO} from "../../dto/ISignUpRequestDTO";

export default interface ISignUpRequestRepo extends Repo<SignUpRequest> {
  save(signUpRequest: SignUpRequest): Promise<SignUpRequest>;
  findByEmail(email: string): Promise<SignUpRequest>;
  delete(signUpRequest: SignUpRequest): Promise<ISignUpRequestDTO>;
  exists(signUpRequest: SignUpRequest): Promise<boolean>;
  getAll(): Promise<SignUpRequest[]>;
}
