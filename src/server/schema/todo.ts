import { z as schema } from "zod";
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

export const TodoSchema = schema.object({
    id: schema.string().uuid(),
    content: schema.string().nonempty(),
    //.datetime()
    date: schema.string().transform((date) => {
        return new Date(date).toISOString();
    }),
    //.boolean()
    done: schema.string().transform((done) => {
        if (done === "true") {
            return true;
        }

        return false;
    }),
});

export type Todo = schema.infer<typeof TodoSchema>;
