import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Shaqty API",
      version: "1.0.0",
      description:
        "Student Housing Finder API for finding and sharing student accommodation.",
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

export const swaggerSpec =
  swaggerJSDoc(swaggerOptions);