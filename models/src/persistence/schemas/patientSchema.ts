import {IPatientPersistence} from '../../dataschema/IPatientPersistence';
import mongoose from 'mongoose';

const Patient = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true
        },

        firstName: {
            type: String,
            required: [true, 'Please enter first name'],
            index: true,
        },

        lastName: {
            type: String,
            required: [true, 'Please enter last name'],
            index: true,
        },

        email: {
            type: String,
            lowercase: true,
            unique: true,
            index: true,
        },

        password: String,

        sns: {
            type: Number,
            unique: true,
            required: [true, 'Please enter sns'],
        },

        salt: String,

        role: {
            type: String,
            default: 'user',
        },
    },
    {timestamps: true},
);

export default mongoose.model<IPatientPersistence & mongoose.Document>('Patient', Patient);
