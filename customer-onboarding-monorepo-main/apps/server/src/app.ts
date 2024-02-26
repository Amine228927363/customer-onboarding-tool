import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import userRoutes from './models/user/user.routes';
import { userSchemas } from './models/user/user.schema';
import fastifyCors from '@fastify/cors';
import custRoutes from './models/customers/customer.routes';
const fastify= Fastify();

fastify.get('/', async () => {
  return { message: 'Hello amine!' };
});

async function main() {
  fastify.register(fastifyCors);
  for (const schema of userSchemas) {
    fastify.addSchema(schema);
  }

  fastify.register(userRoutes);
  fastify.register(custRoutes);
}
  const start = async () => {
    try {
      await fastify.listen({
        port: 3000,
        // You can add other options here if needed
      });
      console.log('Server is running on port 3000');
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  };

main();
start();
