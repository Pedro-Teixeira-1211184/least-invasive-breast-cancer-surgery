import {AggregateRoot} from "../core/domain/AggregateRoot";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";
import {Result} from "../core/logic/Result";
import {SignUpRequestId} from "./signUpRequestId";
import {ISignUpRequestPatientDTO} from "../dto/ISignUpRequestPatientDTO";


interface UserProps {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    sns: number;
}

export class SignUpRequestPatient extends AggregateRoot<UserProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get signUpRequestId(): SignUpRequestId {
        return SignUpRequestId.caller(this.id)
    }

    get email(): string {
        return this.props.email;
    }

    get firstName(): string {
        return this.props.firstName
    }

    get lastName(): string {
        return this.props.lastName;
    }

    get password(): string {
        return this.props.password;
    }

    set password(value: string) {
        this.props.password = value;
    }

    get sns(): number {
        return this.props.sns;
    }

    set sns(value: number) {
        this.props.sns = value;
    }

    private constructor(props: UserProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: ISignUpRequestPatientDTO, id?: UniqueEntityID): Result<SignUpRequestPatient> {
        const firstName = props.firstName;
        const lastName = props.lastName;
        const email = props.email;
        const password = props.password;
        const sns = props.sns;

        const user = new SignUpRequestPatient({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            sns: sns
        }, id);
        return Result.ok<SignUpRequestPatient>(user);
    }

}
