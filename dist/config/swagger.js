"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Shaqty API",
            version: "1.0.0",
            description: "Student Housing Finder API for finding and sharing student accommodation.",
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Local development server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                        },
                        fullName: {
                            type: "string",
                        },
                        email: {
                            type: "string",
                            format: "email",
                        },
                        role: {
                            type: "string",
                            enum: ["Lister", "Seeker"],
                        },
                    },
                },
                Listing: {
                    type: "object",
                    required: [
                        "location",
                        "price",
                        "roomsAvailable",
                        "description",
                    ],
                    properties: {
                        location: {
                            type: "string",
                        },
                        price: {
                            type: "number",
                            minimum: 0,
                        },
                        roomsAvailable: {
                            type: "integer",
                            minimum: 1,
                        },
                        description: {
                            type: "string",
                        },
                        owner: {
                            type: "string",
                        },
                        isAvailable: {
                            type: "boolean",
                            default: true,
                        },
                    },
                },
                InterestRequest: {
                    type: "object",
                    properties: {
                        listing: {
                            type: "string",
                        },
                        user: {
                            type: "string",
                        },
                        status: {
                            type: "string",
                            enum: [
                                "pending",
                                "accepted",
                                "declined",
                            ],
                        },
                    },
                },
            },
        },
    },
    apis: [
        "./src/routes/*.ts",
        "./dist/routes/*.js",
    ],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
//# sourceMappingURL=swagger.js.map