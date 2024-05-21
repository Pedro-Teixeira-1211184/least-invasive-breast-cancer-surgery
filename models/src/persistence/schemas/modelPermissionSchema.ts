import mongoose from 'mongoose';
import {IModelPermissionPersistence} from "../../dataschema/IModelPermissionPersistence";

const ModelPermissionSchema = new mongoose.Schema(
    {
        domainId: {type: String, unique: true},
        modelId: {type: String, required: true},
        doctorId: {type: String, required: true},
        imagiologistId: {type: String},
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IModelPermissionPersistence & mongoose.Document>('ModelPermission', ModelPermissionSchema);
