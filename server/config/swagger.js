import swaggerJsDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  info: {
    title: 'Quick Credit',
    version: '1.0.0',
    description: 'Quick Credit is an online lending platform that provides short term soft loans to individuals',
  },
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'x-auth-token',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['*/swagger-doc/*.yaml'],
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
