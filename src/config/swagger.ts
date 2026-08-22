import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Shaqty API",
      version: "1.0.0",
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);