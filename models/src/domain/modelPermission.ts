import {AggregateRoot} from "../core/domain/AggregateRoot";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";
import {Result} from "../core/logic/Result";
import {ModelPermissionId} from "./modelPermissionId";
import IModelPermissionDTO from "../dto/IModelPermissionDTO";

interface ModelProps {
    modelId: string;
    doctorId: string;
}

export class ModelPermission extends AggregateRoot<ModelProps> {

    get id(): UniqueEntityID {
        return this._id;
    }

    get modelPermissionId(): ModelPermissionId {
        return new ModelPermissionId(this.modelPermissionId.toValue());
    }

    get modelId(): string {
        return this.props.modelId;
    }

    get doctorId(): string {
        return this.props.doctorId;
    }

    private constructor(props: ModelProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(modelDTO: IModelPermissionDTO, id?: UniqueEntityID): Result<ModelPermission> {
        const modelId = modelDTO.modelId;
        const doctorId = modelDTO.doctorId;

        if (!!modelId === false || modelId.length === 0) {
            return Result.fail<ModelPermission>('Must provide a model id')
        } else if (!!doctorId === false || doctorId.length === 0) {
            return Result.fail<ModelPermission>('Must provide a doctor id')
        } else {
            const model = new ModelPermission({
                modelId: modelId,
                doctorId: doctorId
            }, id);
            return Result.ok<ModelPermission>(model)
        }
    }
}
