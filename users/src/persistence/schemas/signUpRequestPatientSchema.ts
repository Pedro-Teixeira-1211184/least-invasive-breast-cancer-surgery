import mongoose from 'mongoose';
import {ISignUpRequestPersistence} from "../../dataschema/ISignUpRequestPersistence";
import {SignUpRequest} from "../../domain/signUpRequest";
import {SignUpRequestPatient} from "../../domain/signUpRequestPatient";
import {ISignUpRequestPatientPersistence} from "../../dataschema/ISignUpRequestPatientPersistence";

const SignUpRequestPatientSchema = new mongoose.Schema(
  {
    signUpRequestDomainId: {type: String, unique: true},
    signUpRequestFirstName: {type: String, required: true},
    signUpRequestLastName: {type: String, required: true},
    signUpRequestEmail: {type: String, lowercase: true, unique: true},
    signUpRequestPassword: {type: String, required: true},
    signUpRequestSns: {type: Number, required: true, unique: true},
  },
  {timestamps: true},
);

SignUpRequestPatientSchema.index({signUpRequestDomainId: 1}, {unique: true});
export default mongoose.model<ISignUpRequestPatientPersistence & mongoose.Document>('SignUpRequestPatient', SignUpRequestPatientSchema);
