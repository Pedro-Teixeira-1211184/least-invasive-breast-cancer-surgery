import {Inject, Service} from 'typedi';

import {Document, Model} from 'mongoose';

import IUserRepo from "../services/IRepos/IUserRepo";
import {User} from "../domain/user";
import {IPatientPersistence} from "../dataschema/IPatientPersistence";
import {Patient} from '../domain/patient';
import {PatientMap} from "../mappers/PatientMap";

@Service()
export default class UserRepo implements IUserRepo {
    private models: any;

    constructor(
        @Inject('patientSchema') private patientSchema: Model<IPatientPersistence & Document>,
        @Inject('logger') private logger
    ) {
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
