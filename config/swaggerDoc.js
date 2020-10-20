import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

// Doc Source: https://swagger.io/specification/#info-object
const swaggerOptions = {
    swaggerDefinition: {
        consumes: [
            "application/json"
        ],
        produces: [
            "application/json"
        ],
        info: {
            title: "SM-WebRequestServer",
            version: "v1.0",
            contact: {
                name: "Devesh Kumar",
                email: "deveshkumarsep12@outlook.com",
                url: "https://deveshkumar.online"
            },
            servers: ["http://localhost:80"]
        },
        basePath: '/',
    },
    apis: ["./index.js", "./routes/*.js", "./routes/oAuth/*.js"]
}

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export default (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}