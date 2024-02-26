import { FastifyInstance, RouteShorthandOptions } from "fastify";
import {
  registerUserHandler,
  getAllUsersHandler,
  loginHandler,
  getByIdHandler,
  updateHandler,
} from "./user.controllers";
import { createUserInput } from "./user.schema";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/register", registerUserHandler);
  fastify.get("/users", getAllUsersHandler);
  fastify.get("/user/:id", getByIdHandler);
  fastify.put("/update/:id", updateHandler);
  fastify.post("/login", loginHandler);
}
export default userRoutes;
