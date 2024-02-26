import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";
const custCore = {
    name: z.string(),
    email: z.string({ required_error: "Email is required", invalid_type_error: "Email must be a string" })
    .email("Please provide a valid email address"),
};

const createCustSchema = z.object({
    ...custCore,
   
});

const createCustResponseSchema = z.object({
    ...custCore,
   id: z.number(),
});

const getCustSchema = z.object({
    ...custCore,
    id: z.number(),
});

const getAllCustSchema = z.array( getCustSchema );

const updateCustSchema = z.object({
    name: z.string().optional(),
});

const updateCustResponseSchema = z.object({
    ...custCore,
});

export type UpdateCustInput = z.infer<typeof updateCustSchema>;
export type CreateCustInput = z.infer<typeof createCustSchema>;

const models = {
    createCustSchema,
    createCustResponseSchema,
    getCustSchema,
    getAllCustSchema,
    updateCustSchema,
    updateCustResponseSchema,
}
export const { schemas: custSchemas, $ref } = buildJsonSchemas(models, { $id : "custSchema" });