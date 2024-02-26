import { FastifyReply, FastifyRequest } from "fastify";
import customerService from "./customer.service";
import { CreateCustInput,UpdateCustInput } from "./customer.schema";
import {number} from "zod";

const custController = {
    createHandler: async function (req: FastifyRequest<{ Body: CreateCustInput }>, res: FastifyReply){
        const body= req.body;
        try{
            const org = await customerService.create(body);
            return res.code(201).send(org);
        }catch (e) {
            console.log(e);
            return res.code(500).send(e);
        }

    },

    getAllHandler: async function (_req: FastifyRequest, res: FastifyReply){
        try {
            const orgs = await customerService.getAll();
            return res.send(orgs);
        } catch (e) {
            console.error(e);
            return res.code(500).send(e);
        }
    },

    getByIdHandler: async function (req: FastifyRequest<{ Params: { organizationId: number } }>, res: FastifyReply){
        const organizationId = Number(req.params.organizationId);
        try {
            const org = await customerService.getById(organizationId);
            if (!org) {
                return res.code(404).send({ error: 'Organization not found' });
            }
            return res.send(org);
        } catch (e) {
            console.error(e);
            return res.code(500).send(e);
        }
    },

    updateHandler: async function (req: FastifyRequest<{ Params: { id: number }; Body: UpdateCustInput }>, res: FastifyReply){
        const id = Number(req.params.id);
        const data = req.body;
        try {
            const updatedOrg = await customerService.update(id, data);
            return res.send(updatedOrg);
        } catch (e) {
            console.error(e);
            return res.code(500).send(e);
        }
    },

    deleteHandler: async function (req: FastifyRequest<{ Params: { organizationId: number } }>, res: FastifyReply){
        const organizationId = Number(req.params.organizationId);
        try {
            const deletedOrg = await customerService.delete(organizationId);
            if (!deletedOrg) {
                return res.code(404).send({ error: 'Organization not found' });
            }
            return res.send({ message: `Organization with ID ${organizationId} was deleted successfully` });
        } catch (e) {
            console.error(e);
            return res.code(500).send(e);
        }
    },
};

export default custController;
