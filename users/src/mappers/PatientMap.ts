import {Container} from 'typedi';

import {Mapper} from "../core/infra/Mapper";

import {User} from "../domain/user";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";

import {UserEmail} from "../domain/userEmail";
import {UserPassword} from "../domain/userPassword";

import RoleRepo from "../repos/roleRepo";
import {IPatientDTO} from "../dto/IPatientDTO";
import {Patient} from "../domain/patient";

export class PatientMap extends Mapper<Patient> {

    public static toDTO(user: Patient): IPatientDTO {
        return {
            id: user.id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email.value,
            password: "",
            role: user.role.id.toString(),
            sns: user.sns,
        } as IPatientDTO;
    }

    public static async toDomain(raw: any): Promise<Patient> {
        const userEmailOrError = UserEmail.create(raw.email);
        const userPasswordOrError = UserPassword.create({value: raw.password, hashed: true});
        const repo = Container.get(RoleRepo);
        const role = await repo.findByDomainId(raw.role);

        const userOrError = Patient.create({
            firstName: raw.firstName,
            lastName: raw.lastName,
            email: userEmailOrError.getValue(),
            password: userPasswordOrError.getValue(),
            role: role,
            sns: raw.sns,
        }, new UniqueEntityID(raw.domainId))

        userOrError.isFailure ? console.log(userOrError.error) : '';

        return userOrError.isSuccess ? userOrError.getValue() : null;
    }

    public static toPersistence(user: Patient): any {
        const a = {
            domainId: user.id.toString(),
            email: user.email.value,
            password: user.password.value,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role.id.toValue(),
            sns: user.sns,
        }
        return a;
    }
}