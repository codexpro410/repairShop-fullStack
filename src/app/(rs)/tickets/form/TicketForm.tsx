"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// import { selectCustomerSchema, type selectCustomerSchemaType, insertCustomerSchema, type insertCustomerSchemaType } from "@/zod-schemas/customer"
import { Form } from "@/app/components/ui/form";
import {type selectTicketSchemaType, insertTicketSchema, type insertTicketSchemaType} from "@/zod-schemas/ticket";
import { selectCustomerSchemaType } from "@/zod-schemas/customer";
import InputWithLabel from "@/app/components/inputs/InputWithLabel";
import { Button } from "@/app/components/ui/button";
import TextAreaWithLabel from "@/app/components/inputs/TextAreaWithLabel";
import CheckboxWithLabel from "@/app/components/inputs/CheckboxWithLabel";
import SelectWithLabel from "@/app/components/inputs/SelectWithLabel";

import { useAction } from "next-safe-action/hooks";
import { saveTicketAction } from "@/app/actions/saveTicketActions";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { DisplayServerActionResponse } from "@/app/components/DisplayServerActionResponse";


type Props = {
    customer: selectCustomerSchemaType,
    ticket?: selectTicketSchemaType,
    techs?:{
        id: string,
        description:string,
    }[],
    isEditable?: boolean,
    isManager?: boolean | undefined,
}



export default function TicketForm({customer, ticket, techs, isEditable= true, isManager = false}:Props) {
    // const isManager = Array.isArray(techs);

    const { toast } = useToast();

    const defaultValues : insertTicketSchemaType = {
        id: ticket?.id ?? "(New)",
        customerId: ticket?.customerId ?? customer.id,
        title: ticket?.title ?? '',
        description: ticket?.description ?? '',
        completed: ticket?.completed ?? false,
        tech: ticket?.tech.toLowerCase() ?? 'new-ticket@example.com',
    }
    const form = useForm<insertTicketSchemaType>({
        mode: "onBlur",
        resolver: zodResolver(insertTicketSchema),
        defaultValues,
    })

    const { execute: executeSave, result:saveResult, isPending:isSaving, reset:resetSaveAction } = useAction(saveTicketAction,{
        onSuccess({data}){
            //toast user
            toast({
                variant: "default",
                title:"Success! ❤",
                description:data?.message,
            })
        },
        onError(){
             //toast user
             toast({
                variant: "destructive",
                title:"Error! 😢",
                description:"Save Failed",
            })
            // capture the exception // sentry
        }
    })
    async function submitForm(data: insertTicketSchemaType) {
        // console.log(data)
        executeSave(data);
    }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
        <DisplayServerActionResponse result={saveResult} />
        <div className="">
            <h2 className="text-2xl font-bold">
                {/* {ticket?.id && isEditable ? "Edit" : "New" } Ticket { ticket?.id ? `# ${ticket.id}` : "Form" }  */}
                {ticket?.id && isEditable ? `Edit Ticket # ${ticket.id}` : 
                ticket?.id ? `View Ticket # ${ticket.id}` :
                 "New Ticket Form" }
            </h2>
        </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitForm)} 
            // className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            className="flex flex-col md:flex-row gap-4 md:gap-8">
                <div className="flex flex-col gap-4 w-full max-w-xs">
                    <InputWithLabel<insertTicketSchemaType> fieldTitle="Title" nameInSchema="title" disabled={!isEditable} className="w-full max-w-xs disabled:text-blue-500 dark:disabled:text-yellow-300 disabled:opacity-75" />
                    {isManager && techs ?(
                        <SelectWithLabel<insertTicketSchemaType> fieldTitle="Tech ID" nameInSchema="tech" data={[{id:'new-ticket@example.com', description:'new-ticket@example.com'},...techs]} className="w-full max-w-xs disabled:text-blue-500 dark:disabled:text-yellow-300 disabled:opacity-75" />
                        ) :(
                        <InputWithLabel<insertTicketSchemaType> fieldTitle="Tech" nameInSchema="tech" disabled={true} />
                    )
                    
                }
                {ticket?.id ? (
                    <CheckboxWithLabel<insertTicketSchemaType> fieldTitle="Completed" nameInSchema="completed"
                    message="Yes"  disabled={!isEditable}/>
                ):null }

                    <div className="mt-4 space-y-2 text-blue-500 dark:text-slate-300">
                        <h3 className="text-lg text-black font-semibold dark:text-sky-400">Customer Info:</h3>
                        <hr className="w-4/5"/>
                        <p>{customer.firstName} {customer.lastName}</p>
                        <p>{customer.address1}</p>
                        {customer.address2 ?<p>{customer.address2}</p> : null}
                        <p>{customer.city}, {customer.state} {customer.zip}</p>
                        <hr className="w-4/5"/>
                        <p>{customer.email}</p>
                        <p>Phone: {customer.phone}</p>
                    </div>
                    </div>
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                    <TextAreaWithLabel<insertTicketSchemaType> fieldTitle="Description" nameInSchema="description"
                     className="w-full h-96 max-w-xs disabled:text-blue-500 dark:disabled:text-yellow-300 disabled:opacity-75"
                       disabled={!isEditable}/>
                    {isEditable ? (
                    <div className="flex gap-2">
                         <Button type="submit" className="w-3/4" variant={"default"} title="Save" disabled={isSaving}>
                            {isSaving ? ( <><LoaderCircle className="animate-spin" /> Saving</> ) : "Save"}
                            </Button>
                        <Button type="button" variant={"destructive"} title="Reset" onClick={() => {form.reset(defaultValues); resetSaveAction()}}>Reset</Button>
                    </div>
                    ): null     
                    }
                </div>
                {/* <p>{JSON.stringify(form.getValues()) }</p> */}
            </form>
        </Form>
    </div>
  )
}
