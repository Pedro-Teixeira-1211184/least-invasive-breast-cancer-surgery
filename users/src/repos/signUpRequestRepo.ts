import {Inject, Service} from 'typedi';

import ISignUpRequestRepo from "../services/IRepos/ISignUpRequestRepo";
import {SignUpRequest} from "../domain/signUpRequest";
import {SignUpRequestMap} from "../mappers/SignUpRequestMap";
import {Document, FilterQuery, Model} from "mongoose";
import {ISignUpRequestPersistence} from "../dataschema/ISignUpRequestPersistence";
import {ISignUpRequestDTO} from "../dto/ISignUpRequestDTO";
import {ISignUpRequestPatientPersistence} from "../dataschema/ISignUpRequestPatientPersistence";
import {SignUpRequestPatient} from '../domain/signUpRequestPatient';
import {UserEmail} from '../domain/userEmail';
import {SignUpRequestPatientMap} from "../mappers/SignUpRequestPatientMap";
import {ISignUpRequestPatientDTO} from '../dto/ISignUpRequestPatientDTO';

@Service()
export default class SignUpRequestRepo implements ISignUpRequestRepo {

    constructor(
        @Inject('signUpRequestSchema') private signUpRequestSchema: Model<ISignUpRequestPersistence & Document>,
        @Inject('signUpRequestPatientSchema') private signUpRequestPatientSchema: Model<ISignUpRequestPatientPersistence & Document>,
    ) {
    }

    public async findByPatientSns(sns: number): Promise<SignUpRequestPatient> {
        try {
            //determines if the floor exists in the database by his number and buildingCode
            const query = {signUpRequestSns: sns};
            const floorDocument = await this.signUpRequestPatientSchema.findOne(query as FilterQuery<ISignUpRequestPatientPersistence & Document>);
            if (floorDocument != null) {
                return await SignUpRequestPatientMap.toDomain(floorDocument);
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    public async deletePatient(signUpRequest: SignUpRequestPatient): Promise<ISignUpRequestPatientDTO> {
        try {
            this.signUpRequestPatientSchema.deleteOne({signUpRequestEmail: signUpRequest.email}, (err) => {
                if (err) return null;
            });
            return SignUpRequestPatientMap.toDTO(signUpRequest);
        } catch (e) {
            throw e;
        }
    }

    public async getAllPatients(): Promise<SignUpRequestPatient[]> {
        try {
            const signUpRequestDocuments = await this.signUpRequestPatientSchema.find();
            let signUpRequests: SignUpRequestPatient[] = [];
            for (let signUpRequestDocument of signUpRequestDocuments) {
                signUpRequests.push(await SignUpRequestPatientMap.toDomain(signUpRequestDocument));
            }
            return signUpRequests;
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public async savePatient(signUpRequest: SignUpRequestPatient): Promise<SignUpRequestPatient> {
        try {
            //determines if the floor exists in the database by his number and buildingCode
            if (!await this.existsPatient(signUpRequest)) {
                const pers = SignUpRequestPatientMap.toPersistence(signUpRequest);
                const signUpRequestDocument = await this.signUpRequestPatientSchema.create(pers);
                return SignUpRequestPatientMap.toDomain(signUpRequestDocument);
            } else {
                return null;
            }
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public async findPatientByEmail(email: string | UserEmail): Promise<SignUpRequestPatient> {
        try {
            //determines if the floor exists in the database by his number and buildingCode
            const query = {signUpRequestEmail: email};
            const floorDocument = await this.signUpRequestPatientSchema.findOne(query as FilterQuery<ISignUpRequestPatientPersistence & Document>);
            if (floorDocument != null) {
                return await SignUpRequestPatientMap.toDomain(floorDocument);
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    public async delete(signUpRequest: SignUpRequest): Promise<ISignUpRequestDTO> {
        try {
            this.signUpRequestSchema.deleteOne({signUpRequestEmail: signUpRequest.email}, (err) => {
                if (err) return null;
            });
            return SignUpRequestMap.toDTO(signUpRequest);
        } catch (e) {
            throw e;
        }
    }

    public async exists(signUpRequest: SignUpRequest): Promise<boolean> {
        try {
            //determines if the floor exists in the database by his number and buildingCode
            const query = {signUpRequestEmail: signUpRequest.email};
            const floorDocument = await this.signUpRequestSchema.findOne(query as FilterQuery<ISignUpRequestPersistence & Document>);
            return floorDocument != null;
        } catch (error) {
            throw error;
        }
    }

    public async existsPatient(signUpRequest: SignUpRequestPatient): Promise<boolean> {
        try {
            //determines if the floor exists in the database by his number and buildingCode
            const query = {signUpRequestEmail: signUpRequest.email};
            const floorDocument = await this.signUpRequestPatientSchema.findOne(query as FilterQuery<ISignUpRequestPersistence & Document>);
            return floorDocument != null;
        } catch (error) {
            throw error;
        }
    }

    public async findByEmail(email: string): Promise<SignUpRequest> {
        try {
            //determines if the floor exists in the database by his number and buildingCode
            const query = {signUpRequestEmail: email};
            const floorDocument = await this.signUpRequestSchema.findOne(query as FilterQuery<ISignUpRequestPersistence & Document>);
            if (floorDocument != null) {
                return await SignUpRequestMap.toDomain(floorDocument);
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    public async save(signUpRequest: SignUpRequest): Promise<SignUpRequest> {
        try {
            //determines if the floor exists in the database by his number and buildingCode
            if (!await this.exists(signUpRequest)) {
                const pers = SignUpRequestMap.toPersistence(signUpRequest);
                const signUpRequestDocument = await this.signUpRequestSchema.create(pers);
                return SignUpRequestMap.toDomain(signUpRequestDocument);
            } else {
                return null;
            }
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public async getAll(): Promise<SignUpRequest[]> {
        try {
            const signUpRequestDocuments = await this.signUpRequestSchema.find();
            let signUpRequests: SignUpRequest[] = [];
            for (let signUpRequestDocument of signUpRequestDocuments) {
                signUpRequests.push(await SignUpRequestMap.toDomain(signUpRequestDocument));
            }
            return signUpRequests;
        } catch (e) {
            return Promise.reject(e);
        }
    }

}
