import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
    // This error should crash whole process

    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    /**
     * Your favorite port : optional change to 4000 by JRT
     */
    port: parseInt(process.env.PORT, 10) || 4000,

    /**
     * That long string from mlab
     */
    databaseURL: process.env.MONGODB_URI || "mongodb://vsgate-s1.dei.isep.ipp.pt:11003",
    /**
     * Your secret sauce
     */
    jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

    /**
     * Database user and password
     */
    dbUser: process.env.DB_USER || "mongoadmin",
    dbPassword: process.env.DB_PASS || "4078746d57ce9cb03b58d503",

    /**
     * Used by winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || 'info',
    },

    /**
     * API configs
     */
    api: {
        prefix: '/api',
    },

    controllers: {
        user: {
            name: "UserControllerOnion",
            path: "../controllers/userControllerOnion"
        },
        model: {
            name: "ModelController",
            path: "../controllers/modelController"
        }
    },

    repos: {
        user: {
            name: "UserRepo",
            path: "../repos/userRepo"
        },
        model: {
            name: "ModelRepo",
            path: "../repos/modelRepo"
        }
    },

    services: {
        user: {
            name: "UserServiceOnion",
            path: "../services/userServiceOnion"
        },
        model: {
            name: "ModelService",
            path: "../services/modelService"
        }
    },
};
