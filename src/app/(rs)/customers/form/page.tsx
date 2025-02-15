import BackBtn from "@/app/components/ui/backBtn";
import { getCustomer } from "@/lib/queries/getCustomers";
import * as Sentry from "@sentry/nextjs";
import CustomerForm from "./CustomerForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function generateMetadata({
    searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string | undefined }>;
}) {
    const { customerId } = await searchParams;
    if (!customerId) {return {title: "New Customer"}
    } return {title: `Edit Customer #${customerId}`}
}

export default async function CustomerFormPage({
    searchParams,
  }: {
    searchParams: Promise<{ [key: string]: string | string | undefined }>;
}) {
    try {
        const { getPermission } = getKindeServerSession();
        const managerPermission =  await getPermission("manager");
        const isManager = managerPermission?.isGranted;

        // edit customer form 
        const { customerId } = await searchParams;
        if (customerId) {
            const customer = await getCustomer(parseInt(customerId));
        if (!customer) {
            return (
                    <>
                        <h2 className="text-2xl mb-2">Customer ID #{customerId} not found</h2>
                        <BackBtn title="Go Back" variant={"default"}/>
                    </>
                )
            }
            // console.log(customer)
            // put customer data in form
           return <CustomerForm key={customerId} customer={customer} isManager={isManager}/>
        } else{
            // new customer form component
            return <CustomerForm key="new" isManager={isManager}/>
        }
    } catch (error) {
        if (error instanceof Error) {
            Sentry.captureException(error)
            throw error
        }
    }
}
