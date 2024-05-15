import {Service, Inject} from 'typedi';
import config from "../../config";
import {Result} from "../core/logic/Result";
import IUserServiceOnion from "./IServices/IUserServiceOnion";
import {IUserDTO} from "../dto/IUserDTO";
import IUserRepo from "./IRepos/IUserRepo";
import {UserMap} from "../mappers/UserMap";
import {ISignUpRequestDTO} from "../dto/ISignUpRequestDTO";
import {SignUpRequestMap} from "../mappers/SignUpRequestMap";
import {SignUpRequest} from "../domain/signUpRequest";
import ISignUpRequestRepo from "./IRepos/ISignUpRequestRepo";
import {Role} from "../domain/role";
import IRoleRepo from "./IRepos/IRoleRepo";
import {randomBytes} from "crypto";
import argon2 from "argon2";
import {ISignUpRequestPatientDTO} from '../dto/ISignUpRequestPatientDTO';
import {SignUpRequestPatient} from "../domain/signUpRequestPatient";
import {SignUpRequestPatientMap} from "../mappers/SignUpRequestPatientMap";
import { IPatientDTO } from '../dto/IPatientDTO';
import {PatientMap} from "../mappers/PatientMap";

@Service()
export default class UserServiceOnion implements IUserServiceOnion {
    constructor(
        @Inject(config.repos.user.name) private userRepo: IUserRepo,
        @Inject(config.repos.signUpRequest.name) private requestRepo: ISignUpRequestRepo,
        @Inject(config.repos.role.name) private roleRepo: IRoleRepo,
        @Inject('logger') private logger,
    ) {
    }

    public async getAllPatients(): Promise<Result<IPatientDTO[]>> {
        try {
            const users = await this.userRepo.findAllPatients();
            if (users.length === 0) {
                return Result.fail<IPatientDTO[]>("No patients found");
            }
            const userDTOs = users.map(user => PatientMap.toDTO(user));
            return Result.ok<IPatientDTO[]>(userDTOs);
        } catch (e) {
            throw e;
        }
    }

    public async deletePatientRequest(email: string): Promise<Result<ISignUpRequestPatientDTO>> {
        try {
            const user = await this.requestRepo.findPatientByEmail(email);

            if (user == null) {
                return Result.fail<ISignUpRequestPatientDTO>("Request does not exist");
            }

            const dto = await this.requestRepo.deletePatient(user);

            if (dto == null) {
                return Result.fail<ISignUpRequestPatientDTO>("Request could not be deleted");
            }

            return Result.ok<ISignUpRequestPatientDTO>(dto);
        } catch (e) {
            throw e;
        }
    }

    public async signUpPatientRequest(userDTO: ISignUpRequestPatientDTO): Promise<Result<ISignUpRequestPatientDTO>> {
        try {

            const userDocument = await this.userRepo.findPatientByEmail(userDTO.email);
            const found = !!userDocument;
            if (found) {
                return Result.fail<ISignUpRequestPatientDTO>("Patient already exists with email=" + userDTO.email);
            }
            const userDocument2 = await this.requestRepo.findPatientByEmail(userDTO.email);
            const found2 = !!userDocument2;
            if (found2) {
                return Result.fail<ISignUpRequestPatientDTO>("Request already exists with email=" + userDTO.email);
            }
            const userDocument3 = await this.userRepo.findByEmail(userDTO.email);
            const found3 = !!userDocument3;
            if (found3) {
                return Result.fail<ISignUpRequestPatientDTO>("User already exists with email=" + userDTO.email);
            }

            const requestOrError = await SignUpRequestPatient.create(userDTO);

            if (requestOrError.isFailure) {
                return Result.fail<ISignUpRequestPatientDTO>(requestOrError.errorValue());
            }

            const user = requestOrError.getValue();

            const salt = randomBytes(32);
            this.logger.silly('Hashing password');
            const hashedPassword = await argon2.hash(user.password, {salt});
            this.logger.silly('Creating user db record');

            user.password = hashedPassword;

            const save = await this.requestRepo.savePatient(user);
            if (save == null) {
                return Result.fail<ISignUpRequestPatientDTO>("Request already exists");
            }
            const requestDTO = SignUpRequestPatientMap.toDTO(save) as ISignUpRequestPatientDTO;
            return Result.ok<ISignUpRequestPatientDTO>(requestDTO);
        } catch (e) {
            throw e;
        }
    }

    public async getAllUsers(): Promise<Result<IUserDTO[]>> {
        try {
            console.log("Getting users");
            const users = await this.userRepo.findAll();
            if (users.length === 0) {
                return Result.fail<IUserDTO[]>("No users found");
            }
            const userDTOs = users.map(user => UserMap.toDTO(user));
            return Result.ok<IUserDTO[]>(userDTOs);
        } catch (e) {
            throw e;
        }
    }

    public async deleteUserRequest(email: string): Promise<Result<ISignUpRequestDTO>> {
        try {
            const user = await this.requestRepo.findByEmail(email);

            if (user == null) {
                return Result.fail<ISignUpRequestDTO>("Request does not exist");
            }

            const dto = await this.requestRepo.delete(user);

            if (dto == null) {
                return Result.fail<ISignUpRequestDTO>("Request could not be deleted");
            }

            return Result.ok<ISignUpRequestDTO>(dto);
        } catch (e) {
            throw e;
        }
    }

    public async getAllUserRequests(): Promise<Result<ISignUpRequestDTO[]>> {
        try {
            const requests = await this.requestRepo.getAll();
            if (requests == null || requests.length == 0) {
                return Result.fail<ISignUpRequestDTO[]>("No requests found");
            }
            const requestDTOs = requests.map(request => SignUpRequestMap.toDTO(request) as ISignUpRequestDTO);
            return Result.ok<ISignUpRequestDTO[]>(requestDTOs);
        } catch (e) {
            throw e;
        }
    }

    public async getAllPatientRequests(): Promise<Result<ISignUpRequestPatientDTO[]>> {
        try {
            const requests = await this.requestRepo.getAllPatients();
            if (requests == null || requests.length == 0) {
                return Result.fail<ISignUpRequestPatientDTO[]>("No requests found");
            }
            const requestDTOs = requests.map(request => SignUpRequestPatientMap.toDTO(request) as ISignUpRequestPatientDTO);
            return Result.ok<ISignUpRequestPatientDTO[]>(requestDTOs);
        } catch (e) {
            throw e;
        }
    }

    public async signUpRequest(userDTO: ISignUpRequestDTO): Promise<Result<ISignUpRequestDTO>> {
        try {

            const userDocument = await this.userRepo.findByEmail(userDTO.email);
            const found = !!userDocument;
            if (found) {
                return Result.fail<ISignUpRequestDTO>("User already exists with email=" + userDTO.email);
            }
            const userDocument2 = await this.requestRepo.findByEmail(userDTO.email);
            const found2 = !!userDocument2;
            if (found2) {
                return Result.fail<ISignUpRequestDTO>("Request already exists with email=" + userDTO.email);
            }
            const userDocument3 = await this.userRepo.findPatientByEmail(userDTO.email);
            const found3 = !!userDocument3;
            if (found3) {
                return Result.fail<ISignUpRequestDTO>("Patient already exists with email=" + userDTO.email);
            }

            const requestOrError = await SignUpRequest.create(userDTO);

            if (requestOrError.isFailure) {
                return Result.fail<ISignUpRequestDTO>(requestOrError.errorValue());
            }

            const user = requestOrError.getValue();

            const salt = randomBytes(32);
            this.logger.silly('Hashing password');
            const hashedPassword = await argon2.hash(user.password, {salt});
            this.logger.silly('Creating user db record');

            user.password = hashedPassword;

            const save = await this.requestRepo.save(user);
            if (save == null) {
                return Result.fail<ISignUpRequestDTO>("Request already exists");
            }
            const requestDTO = SignUpRequestMap.toDTO(save) as ISignUpRequestDTO;
            return Result.ok<ISignUpRequestDTO>(requestDTO);
        } catch (e) {
            throw e;
        }
    }

}
