import {Result} from "../../core/logic/Result";
import {IUserDTO} from "../../dto/IUserDTO";
import {ISignUpRequestDTO} from "../../dto/ISignUpRequestDTO";


export default interface IUserServiceOnion  {
  getAllUsers(): Promise<Result<IUserDTO[]>>;
  signUpRequest(userDTO: ISignUpRequestDTO): Promise<Result<ISignUpRequestDTO>>;
  getAllUserRequests(): Promise<Result<ISignUpRequestDTO[]>>;
  deleteUserRequest(email: string): Promise<Result<ISignUpRequestDTO>>;
}
