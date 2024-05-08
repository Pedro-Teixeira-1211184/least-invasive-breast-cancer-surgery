import mongoose from 'mongoose';
import {IModelPersistence} from "../../dataschema/IModelPersistence";

const ModelSchema = new mongoose.Schema(
    {
        domainId: {type: String, unique: true},
        patientId: {type: String},
        description: {type: String},
        path: {type: String, unique: true},
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IModelPersistence & mongoose.Document>('Model', ModelSchema);
