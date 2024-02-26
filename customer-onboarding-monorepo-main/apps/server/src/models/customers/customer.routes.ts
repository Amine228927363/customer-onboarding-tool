import fastify, { FastifyInstance } from "fastify";
import custController from "./customer.contollers";
import { $ref } from "./customer.schema";

async function custRoutes(fastify: FastifyInstance) {
    fastify.post('/createCustomer',
        {
            schema: {
                body: $ref('createCustSchema'),
                response: {
                    201: $ref('createCustResponseSchema')
                }
            }
        }, custController.createHandler);

    fastify.get('/',
        {
            schema: {
                response: {
                    200: $ref('getAllCustSchema')
                }
            }
        }, custController.getAllHandler);

    fastify.get('/:id',
        {
            schema: {
                response: {
                    200: $ref('getCustSchema')
                }
            }
        }, custController.getByIdHandler);

    fastify.put('/update/:id',
        {
            schema: {
                body: $ref('updateCustSchema'),
                response: {
                    200: $ref('updateCustResponseSchema')
                }
            }
        }, custController.updateHandler);

    fastify.delete('/delete/:id', { schema: { params: { id: { type: "number" } } } }, custController.deleteHandler);
}

export default custRoutes;
