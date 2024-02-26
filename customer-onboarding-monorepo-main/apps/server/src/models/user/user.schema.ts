import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const userCore = {
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Invalid email",
    })
    .email(),
  username: z.string(),
};

const createUserSchema = z.object({
  id: z.number(),
  ...userCore,
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Invalid password",
    })
    .min(8)
    .max(1024),
});

const createUserResponseSchema = z.object({
  ...userCore,
});
const getUserSchema = z.object({
  userId: z.number(),
  ...userCore,
});

const getAllUsersSchema = z.array(getUserSchema);

const updateUserSchema = z.object({
  ...userCore,
  email: userCore.email.optional(),
  username: userCore.username.optional(),
  password: z
    .string({
      required_error: "Password must be a string",
      invalid_type_error: "Password must be a string",
    })
    .optional(),
});

export const updatedUserResponseSchema = z.object({
  ...userCore,
});
export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Invalid email",
    })
    .email(),
  password: z.string(),
});
export const loginUserResponseSchema = z.object({
  token: z.string(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type LoginUserInput = z.infer<typeof loginSchema>;
export type createUserInput = z.infer<typeof createUserSchema>;
export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema,
  getUserSchema,
  getAllUsersSchema,
  updateUserSchema,
  updatedUserResponseSchema,
  loginSchema,
  loginUserResponseSchema,
});
