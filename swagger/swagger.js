import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'PhotoPic API',
            version: '1.0.0',
            description: 'API for management of PhotoPic',
            contact: {
                name: 'Chri'
            },
            servers: [
                {
                    url: 'http://localhost:4000',
                    description: 'Local server'
                }
            ]
        }
    },
    apis: ['../routes/*.js']
};

const specs = swaggerJsdoc(options);
export default specs;