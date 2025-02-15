'use server'

import { insertTicketSchema, type insertTicketSchemaType } from '../../zod-schemas/ticket';
import { eq } from "drizzle-orm";
import { flattenValidationErrors } from 'next-safe-action';
import { redirect } from "next/navigation";

import { db } from "@/db";
import { tickets } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export const saveTicketAction = actionClient
    .metadata({ actionName: 'saveTicketAction'})
    .schema(insertTicketSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
    })
    .action(async ({
        parsedInput: ticket,
    }: {parsedInput: insertTicketSchemaType}) => {
        const { isAuthenticated } = await getKindeServerSession();
        const isAuth = await isAuthenticated();
        if(!isAuth) redirect('/login')

        // try error
        //1 throw Error('test error');
        //2 const data = await fetch('https://jsoplaceholder');
        // const query = sql.raw('SELECT * FROM nothing');
        // const data = await db.execute(query);
        // const query = sql.row('SELECT * FROM customers WHERE email = ?', [customer.email]);

        //  New Customer
        if(ticket.id === '(New)') {
            const result = await db.insert(tickets).values({
                customerId: ticket.customerId,
                title: ticket.title,
                description: ticket.description,
                tech: ticket.tech,
            }).returning({ insertedId: tickets.id});
            return { message: `Ticket ID #${result[0].insertedId} created successfully`};
        }
        // Existing customer
        const result = await db.update(tickets).set({
            customerId: ticket.customerId,
            title: ticket.title,
            description: ticket.description,
            completed: ticket.completed,
            tech: ticket.tech,
        })
        .where(eq(tickets.id, ticket.id!))
        .returning({ updatedId: tickets.id});
            return { message: `Ticket ID #${result[0].updatedId} updated successfully`};
    });
