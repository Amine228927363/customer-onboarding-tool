import bcrypt from "bcrypt";
import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { UpdateUserInput, createUserInput } from "./user.schema";
import { Prisma } from "@prisma/client";
export async function createUser(input: createUserInput) {
  const { password, ...rest } = input;
  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: { ...rest, password: hashedPassword },
  });
  return user;
}
export async function getUsers() {
  const users = prisma.user.findMany();
  return users;
}
//get by id
export async function getById(Id: number) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Id,
      },
      select: {
        email: true,
        username: true,
        id: true,
      },
    });

    if (!user) {
      throw new Error(`User with ID ${Id} not found`);
    }

    return user;
  } catch (e) {
    console.error(`Error retrieving user with ID ${Id}:`, e);
    throw e;
  }
}
//update user
export async function updateUser(Id: number, data: UpdateUserInput) {
  try {
    // Hash the new password if provided
    if (data.password) {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      data.password = await bcrypt.hash(data.password, salt);
    }

    // Prepare the update data
    const userData: Prisma.UserUpdateInput = {
      ...(data.email && { email: data.email }),
      ...(data.username && { username: data.username }),
      ...(data.password && { password: data.password }),
    };

    // Update the user in the database
    const updatedUser = await prisma.user.update({
      where: { id: Id },
      data: userData,
    });

    if (!updatedUser) {
      throw new Error(`User with ID ${Id} not found`);
    }

    return updatedUser;
  } catch (e) {
    console.error(`Error updating user with ID ${Id}:`, e);
    throw e;
  }
}
//delete user
export async function deleteUser(Id: number) {
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id: Id,
      },
    });

    if (!deleteUser) {
      throw new Error(`User with ID ${Id} not found`);
    }

    return `User with ID ${Id} was deleted successfully`;
  } catch (e) {
    console.error(`Error deleting user with ID ${Id}:`, e);
    throw e;
  }
}
