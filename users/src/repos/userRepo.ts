import {Inject, Service} from 'typedi';

import {Document, Model} from 'mongoose';
import {IUserPersistence} from '../dataschema/IUserPersistence';

import IUserRepo from "../services/IRepos/IUserRepo";
import {User} from "../domain/user";
import {UserId} from "../domain/userId";
import {UserEmail} from "../domain/userEmail";
import {UserMap} from "../mappers/UserMap";
import {IPatientPersistence} from "../dataschema/IPatientPersistence";
import {Patient} from '../domain/patient';
import {PatientMap} from "../mappers/PatientMap";

@Service()
export default class UserRepo implements IUserRepo {
    private models: any;

    constructor(
        @Inject('userSchema') private userSchema: Model<IUserPersistence & Document>,
        @Inject('patientSchema') private patientSchema: Model<IPatientPersistence & Document>,
        @Inject('logger') private logger
    ) {
    }

    public async savePatient(patient: Patient): Promise<Patient> {
        const query = {domainId: patient.id.toString()};

        const userDocument = await this.patientSchema.findOne(query);

        try {
            if (userDocument === null) {
                const rawUser: any = PatientMap.toPersistence(patient);

                const userCreated = await this.patientSchema.create(rawUser);

                return PatientMap.toDomain(userCreated);
            } else {
                userDocument.firstName = patient.firstName;
                userDocument.lastName = patient.lastName;
                await userDocument.save();

                return patient;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findPatientByEmail(email: string | UserEmail): Promise<Patient> {
        const query = {email: email.toString()};
        const userRecord = await this.patientSchema.findOne(query);

        if (userRecord != null) {
            return PatientMap.toDomain(userRecord);
        } else
            return null;
    }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async exists(userId: UserId | string): Promise<boolean> {

        const idX = userId instanceof UserId ? (<UserId>userId).id.toValue() : userId;

        const query = {domainId: idX};
        const userDocument = await this.userSchema.findOne(query);

        return !!userDocument === true;
    }

    public async save(user: User): Promise<User> {
        const query = {domainId: user.id.toString()};

        const userDocument = await this.userSchema.findOne(query);

        try {
            if (userDocument === null) {
                const rawUser: any = UserMap.toPersistence(user);

                const userCreated = await this.userSchema.create(rawUser);

                return UserMap.toDomain(userCreated);
            } else {
                userDocument.firstName = user.firstName;
                userDocument.lastName = user.lastName;
                await userDocument.save();

                return user;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findByEmail(email: UserEmail | string): Promise<User> {
        const query = {email: email.toString()};
        const userRecord = await this.userSchema.findOne(query);

        if (userRecord != null) {
            return UserMap.toDomain(userRecord);
        } else
            return null;
    }

    public async findById(userId: UserId | string): Promise<User> {

        const idX = userId instanceof UserId ? (<UserId>userId).id.toValue() : userId;

        const query = {domainId: idX};
        const userRecord = await this.userSchema.findOne(query);

        if (userRecord != null) {
            return UserMap.toDomain(userRecord);
        } else
            return null;
    }

    public async findAll(): Promise<User[]> {
        const userRecords = await this.userSchema.find();
        let users: User[] = [];
        for (let userRecord of userRecords) {
            users.push(await UserMap.toDomain(userRecord));
        }
        return users;
    }
}
