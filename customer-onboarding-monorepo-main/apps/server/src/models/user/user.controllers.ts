import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import bcrypt from "bcrypt";
import { createUser, getById, getUsers, updateUser } from "./user.service";
import {
  LoginUserInput,
  UpdateUserInput,
  createUserInput,
  updatedUserResponseSchema,
} from "./user.schema";
import prisma from "../../utils/prisma";
// Handler pour l'enregistrement d'un utilisateur
export async function registerUserHandler(
  request: FastifyRequest<{ Body: createUserInput }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const user = await createUser(body);
    reply
      .status(201)
      .send({ message: "User created successfully", data: user });
  } catch (error) {
    reply.status(400).send({ error: "Error creating user" });
  }
}

// Handler pour obtenir tous les utilisateurs
export async function getAllUsersHandler(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const users = await getUsers();
    reply.send(users);
  } catch (error) {
    reply.status(500).send({ error: "Error fetching users" });
  }
}
//handler get user by id
export async function getByIdHandler(
  req: FastifyRequest<{ Params: { id: number } }>,
  res: FastifyReply
) {
  try {
    const Id = Number(req.params.id);
    const user = await getById(Id);

    if (!user) {
      return res.code(404).send({ error: "User not found" });
    }

    return res.send(user);
  } catch (e) {
    console.error(e);
    return res.code(500).send(e);
  }
}
//handler update user by id
export async function updateHandler(
  req: FastifyRequest<{ Params: { id: number }; Body: UpdateUserInput }>,
  res: FastifyReply
) {
  try {
    const Id = Number(req.params.id);
    const userData = req.body;

    const updatedUser = await updateUser(Id, userData);

    return res.send(updatedUserResponseSchema.parse(updatedUser));
  } catch (e) {
    console.error(e);
    return res.code(500).send(e);
  }
}

// Handler pour la connexion d'un utilisateur
export async function loginHandler(
  req: FastifyRequest<{ Body: LoginUserInput }>,
  reply: FastifyReply
) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("Email or password is incorrect");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      reply.send(`Login successful! Welcome ${user.username}`);
      return;
    }

    // If password is not valid
    reply.status(401).send({ error: "Invalid credentials" });
  } catch (error) {
    reply.status(500).send({ error: "Error logging in" });
  }
}
