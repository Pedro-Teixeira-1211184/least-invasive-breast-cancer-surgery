import {Inject, Service} from 'typedi';

import {Document, Model} from 'mongoose';

import IUserRepo from "../services/IRepos/IUserRepo";
import {User} from "../domain/user";
import {IPatientPersistence} from "../dataschema/IPatientPersistence";
import {Patient} from '../domain/patient';
import {PatientMap} from "../mappers/PatientMap";
import {IUserPersistence} from "../dataschema/IUserPersistence";
import {UserId} from "../domain/userId";

@Service()
export default class UserRepo implements IUserRepo {
    private models: any;

    constructor(
        @Inject('patientSchema') private patientSchema: Model<IPatientPersistence & Document>,
        @Inject('userSchema') private userSchema: Model<IUserPersistence & Document>,
        @Inject('logger') private logger
    ) {
    }

    public async existImagiologistById(imagiologistId: UserId | string): Promise<boolean> {
        const idX = imagiologistId instanceof UserId ? (<UserId>imagiologistId).id.toValue() : imagiologistId;

        const query = {domainId: idX};
        const userDocument = await this.userSchema.findOne(query);

        return !!userDocument === true;
    }

    public async existDoctorById(doctorId: string): Promise<boolean> {
        try {
            const doctor = await this.userSchema.findOne({domainId: doctorId});
            return !!doctor;
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    exists(t: User): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    save(t: User): Promise<User> {
        throw new Error('Method not implemented.');
    }

    public async findPatientByPatientId(patientId: string): Promise<Patient> {
        try {
            const patient = await this.patientSchema.findOne({domainId: patientId});
            if (!patient) {
                return null;
            }
            return PatientMap.toDomain(patient);
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }
}
