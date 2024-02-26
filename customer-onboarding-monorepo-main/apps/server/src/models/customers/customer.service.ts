import prisma from '../../utils/prisma';
import {CreateCustInput, UpdateCustInput} from './customer.schema';

const customerService = {
        async create(input: CreateCustInput) {
            try {
                return await prisma.customer.create({
                    data: {
                        name: input.name,
                        email:input.email,
                    },
                });
            } catch (error) {
                console.error('Error creating customer:', error);
                throw error;
            }
        },

        async getAll() {
            try {
                return await prisma.organization.findMany({
                    select: {
                        name: true,
                        id: true,
                    },
                });
            } catch (error) {
                console.error('Error retrieving organizations:', error);
                throw error;
            }
        },

        async getById(id: number) {
            try {
                return await prisma.organization.findUnique({
                    where: {
                        id,
                    },
                    select: {
                        name: true,
                        id: true,
                    },
                });
            } catch (error) {
                console.error(`Error retrieving organization with ID ${id}:`, error);
                throw error;
            }
        },

        async update(id: number, data: UpdateCustInput) {
            try {
                return await prisma.organization.update({
                    where: {id},
                    data: {
                        name: data.name,
                    },
                });
            } catch (error) {
                console.error(`Error updating organization with ID ${id}:`, error);
                throw error;
            }
        },

        async delete(id: number) {
            try {
                return await prisma.organization.delete({
                    where: {
                        id,
                    },
                });
            } catch (error) {
                console.error(`Error deleting organization with ID ${id}:`, error);
                throw error;
            }
        },
};
export default customerService;