import { Repo } from "../../core/infra/Repo";
import { User } from "../../domain/user";
import {Patient} from "../../domain/patient";

export default interface IUserRepo extends Repo<User> {
	findPatientByPatientId(patientId: string): Promise<Patient>;
	existDoctorById(doctorId: string): Promise<boolean>;
}
