import {Repo} from "../../core/infra/Repo";
import {User} from "../../domain/user";
import {UserEmail} from "../../domain/userEmail";
import {Patient} from "../../domain/patient";

export default interface IUserRepo extends Repo<User> {
    save(user: User): Promise<User>;

    savePatient(patient: Patient): Promise<Patient>;

    findByEmail(email: UserEmail | string): Promise<User>;

    findPatientByEmail(email: UserEmail | string): Promise<Patient>;

    findBySns(sns: number): Promise<Patient>;

    findById(id: string): Promise<User>;

    findAll(): Promise<User[]>;

    findAllPatients(): Promise<Patient[]>;
}
