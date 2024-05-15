import {AggregateRoot} from "../core/domain/AggregateRoot";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";
import {Result} from "../core/logic/Result";
import {UserId} from "./userId";
import {UserEmail} from "./userEmail";
import {Role} from "./role";
import {UserPassword} from "./userPassword";
import {Guard} from "../core/logic/Guard";


interface PatientProps {
    firstName: string;
    lastName: string;
    email: UserEmail;
    password: UserPassword;
    role: Role;
    sns: number;
}

export class Patient extends AggregateRoot<PatientProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get userId(): UserId {
        return UserId.caller(this.id)
    }

    get email(): UserEmail {
        return this.props.email;
    }

    get firstName(): string {
        return this.props.firstName
    }

    get lastName(): string {
        return this.props.lastName;
    }

    get password(): UserPassword {
        return this.props.password;
    }

    get role(): Role {
        return this.props.role;
    }

    set role(value: Role) {
        this.props.role = value;
    }

    get sns(): number {
        return this.props.sns;
    }

    set sns(value: number) {
        this.props.sns = value;
    }

    private constructor(props: PatientProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: PatientProps, id?: UniqueEntityID): Result<Patient> {

        const guardedProps = [
            {argument: props.firstName, argumentName: 'firstName'},
            {argument: props.lastName, argumentName: 'lastName'},
            {argument: props.email, argumentName: 'email'},
            {argument: props.role, argumentName: 'role'},
            {argument: props.sns, argumentName: 'sns'},
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Patient>(guardResult.message)
        } else {
            const user = new Patient({
                ...props
            }, id);

            return Result.ok<Patient>(user);
        }
    }
}