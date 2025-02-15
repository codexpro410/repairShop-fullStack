import BackBtn from "@/app/components/ui/backBtn";
import { getCustomer } from "@/lib/queries/getCustomers";
import { getTicket } from "@/lib/queries/getTickets";
import * as Sentry from "@sentry/nextjs";
import TicketForm from "./TicketForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Users, init as kindeInit } from "@kinde/management-api-js";
export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string | undefined }>;
}) {
    const { customerId, ticketId } = await searchParams;
    if (!customerId && !ticketId) return {title: "Missing Ticket ID or Customer ID"};
    if (customerId) {return {title: `New Ticket for Customer #${customerId}`}};
    if (ticketId) {return {title: `New Ticket  #${ticketId}`}};
}

export default async function TicketFormPage({
    searchParams,
  }: {
    searchParams: Promise<{ [key: string]: string | string | undefined }>;
}) {
    try {
        // edit customer form 
        const { customerId, ticketId } = await searchParams;
        if (!customerId && !ticketId) {
            return (
                    <>
                        <h2 className="text-2xl mb-2">Ticket ID or Customer ID required to load ticket form</h2>
                        <BackBtn title="Go Back" variant={"default"}/>
                    </>
                )
            }
            const { getPermission, getUser } = getKindeServerSession();
            const [ managerPermission, user ] = await Promise.all([getPermission("manager"), getUser()]); 
            const isManager = managerPermission?.isGranted;
            
            // new ticket form
            if (customerId){
                const customer = await getCustomer(parseInt(customerId));
                if (!customer) {
                    return (
                            <>
                                <h2 className="text-2xl mb-2">Customer ID #{customerId} not found</h2>
                                <BackBtn title="Go Back" variant={"default"}/>
                            </>
                        )
                    }
                if (!customer.active) {
                    return (
                            <>
                                <h2 className="text-2xl mb-2">Customer ID #{customerId} is not active.</h2>
                                <BackBtn title="Go Back" variant={"default"}/>
                            </>
                        )
                    }
                // return ticket form
                if(isManager) {
                    kindeInit()
                    const {users} = await Users.getUsers()
                    const techs = users ? users.map(user => ({id: user.email!, description: user.email!})) : []
                    return <TicketForm customer={customer} techs={techs} isManager={isManager}/>

                }else {
                    return <TicketForm customer={customer} />
                }
                // console.log(customer);
                // return <TicketForm customer={customer} />
            }
            // edit ticket form
            if(ticketId){
                const ticket = await getTicket(parseInt(ticketId));
                if (!ticket) {
                    return (
                        <>
                        <h2 className="text-2xl mb-2">Ticket ID #{ticketId} not found</h2>
                        <BackBtn title="Go Back" variant={"default"}/>
                    </>
                )
                }
                const customer = await getCustomer(ticket.customerId);
                // return ticket form
                if(isManager) {
                    kindeInit()
                    const {users} = await Users.getUsers()
                    const techs = users ? users.filter((user): user is {email: string} => typeof user.email === 'string').map(user => ({id: user.email?.toLowerCase(), description: user.email?.toLowerCase()})) : []
                    return <TicketForm customer={customer} ticket={ticket} techs={techs} isManager={isManager}/>

                }else {
                    const isEditable = user.email?.toLowerCase() === ticket.tech.toLowerCase();
                    console.log('user :',user.email);
                    console.log('tech :',ticket.tech);
                    return <TicketForm customer={customer} ticket={ticket} isEditable={isEditable}/>
                }
                // console.log('ticket: ',ticket);
                // console.log('customer: ',customer);
                // return <TicketForm customer={customer} ticket={ticket}/>
            }
         
    } catch (error) {
        if (error instanceof Error) {
            Sentry.captureException(error)
            throw error
        }
    }
}
