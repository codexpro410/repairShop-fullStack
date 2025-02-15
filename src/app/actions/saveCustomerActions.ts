'use server'

import { insertCustomerSchema, type insertCustomerSchemaType } from './../../zod-schemas/customer';
import { eq } from "drizzle-orm";
import { flattenValidationErrors } from 'next-safe-action';
import { redirect } from "next/navigation";

import { db } from "@/db";
import { customers } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export const saveCustomerAction = actionClient
    .metadata({ actionName: 'saveCustomerAction'})
    .schema(insertCustomerSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
    })
    .action(async ({
        parsedInput: customer,
    }: {parsedInput: insertCustomerSchemaType}) => {

        // redirect('/customers'); // just for test

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
        if(customer.id === 0) {
            const result = await db.insert(customers).values({
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.email.toLowerCase(),
                phone: customer.phone,
                address1: customer.address1,
                ...(customer.address2?.trim()?{address2: customer.address2} : {}),
                city: customer.city,
                state: customer.state,
                zip: customer.zip,
                ...(customer.notes?.trim()?{notes: customer.notes} : {}),
            }).returning({ insertedId: customers.id});
            return { message: `Customer ID #${result[0].insertedId} created successfully`};
        }
        // Existing customer
        const result = await db.update(customers).set({
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            phone: customer.phone,
            address1: customer.address1,
            address2: customer.address2?.trim() ?? null,
            city: customer.city,
            state: customer.state,
            zip: customer.zip,
            notes: customer.notes?.trim() ?? null,
            active: customer.active
        })
        .where(eq(customers.id, customer.id!))
        .returning({ updatedId: customers.id});
            return { message: `Customer ID #${result[0].updatedId} updated successfully`};
    });
