import {Mapper} from "../core/infra/Mapper";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";
import {SignUpRequest} from "../domain/signUpRequest";
import {ISignUpRequestDTO} from "../dto/ISignUpRequestDTO";
import {SignUpRequestPatient} from "../domain/signUpRequestPatient";
import {ISignUpRequestPatientDTO} from "../dto/ISignUpRequestPatientDTO";

export class SignUpRequestPatientMap extends Mapper<SignUpRequestPatient> {

    public static toDTO(request: SignUpRequestPatient): ISignUpRequestPatientDTO {
        return {
            //id: user.id.toString(),
            firstName: request.firstName,
            lastName: request.lastName,
            email: request.email,
            password: "",
            sns: request.sns,
        } as ISignUpRequestPatientDTO;
    }

    public static async toDomain(raw: any): Promise<SignUpRequestPatient> {
        const userOrError = SignUpRequestPatient.create(
            {
                domainId: raw.signUpRequestDomainId,
                firstName: raw.signUpRequestFirstName,
                lastName: raw.signUpRequestLastName,
                email: raw.signUpRequestEmail,
                password: raw.signUpRequestPassword,
                sns: raw.signUpRequestSns,
            },
            new UniqueEntityID(raw.domainId)
        );

        userOrError.isFailure ? console.log(userOrError.error) : '';

        return userOrError.isSuccess ? userOrError.getValue() : null;
    }

    public static toPersistence(user: SignUpRequestPatient): any {
        return {
            signUpRequestDomainId: user.id.toString(),
            signUpRequestEmail: user.email,
            signUpRequestPassword: user.password,
            signUpRequestFirstName: user.firstName,
            signUpRequestLastName: user.lastName,
            signUpRequestSns: user.sns,
        };
    }
}
