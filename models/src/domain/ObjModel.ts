import {AggregateRoot} from "../core/domain/AggregateRoot";
import {UniqueEntityID} from "../core/domain/UniqueEntityID";
import {Result} from "../core/logic/Result";
import {ObjModelId} from "./objModelId";
import IModelDTO from "../dto/IModelDTO";

interface ModelProps {

    patientId: string;
    modelId: string;
    description: string;
}

export class ObjModel extends AggregateRoot<ModelProps> {

    get id(): UniqueEntityID {
        return this._id;
    }

    get objModelId(): ObjModelId {
        return new ObjModelId(this.objModelId.toValue());
    }

    get modelId(): string {
        return this.props.modelId;
    }

    get patientId(): string {
        return this.props.patientId;
    }

    get description(): string {
        return this.props.description;
    }

    private constructor(props: ModelProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(modelDTO: IModelDTO, id?: UniqueEntityID): Result<ObjModel> {
        const patientId = modelDTO.patientId;
        const modelId = modelDTO.modelId;
        const description = modelDTO.description;

        if (!!patientId === false || patientId.length === 0) {
            return Result.fail<ObjModel>('Must provide a patient id')
        } else if (!!modelId === false || modelId.length === 0) {
            return Result.fail<ObjModel>('Must provide a model id')
        } else if (!!description === false || description.length === 0) {
            return Result.fail<ObjModel>('Must provide a description')
        } else {
            const model = new ObjModel({patientId: patientId, modelId: modelId, description: description}, id);
            return Result.ok<ObjModel>(model)
        }
    }
}
