"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/app/components/ui/form";
import { type selectCustomerSchemaType, insertCustomerSchema, type insertCustomerSchemaType} from "@/zod-schemas/customer";
import InputWithLabel from "@/app/components/inputs/InputWithLabel";
import { Button } from "@/app/components/ui/button";
import TextAreaWithLabel from "@/app/components/inputs/TextAreaWithLabel";
import SelectWithLabel from "@/app/components/inputs/SelectWithLabel";
import { StatesArray } from "@/constants/StatesArray";
// import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import CheckboxWithLabel from "@/app/components/inputs/CheckboxWithLabel";
import { useAction } from "next-safe-action/hooks";
import { saveCustomerAction } from "@/app/actions/saveCustomerActions";
import { useToast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { DisplayServerActionResponse } from "@/app/components/DisplayServerActionResponse";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";


type Props = {
    customer?: selectCustomerSchemaType
    isManager?: boolean | undefined,
}

export default function CustomerForm({customer, isManager = false}:Props) {
    // const { getPermission, getPermissions, isLoading } = useKindeBrowserClient();
    // const isManager = !isLoading && getPermission("manager")?.isGranted;

    // const permObj = getPermissions();
    // const isAuthorized = !isLoading && permObj.permissions.some((perm) => perm === "manager" || perm === "admin");
    
    const { toast} = useToast();

    const searchParams = useSearchParams()
    const hasCustomerId = searchParams.has("customerId");
    const emptyValues: insertCustomerSchemaType = {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        notes: "",
        active: true
    }
    
    const defaultValues: insertCustomerSchemaType = hasCustomerId ? {
        id: customer?.id ?? 0,
        firstName: customer?.firstName ?? "",
        lastName: customer?.lastName ?? "",
        email: customer?.email ?? "",
        phone: customer?.phone ?? "",
        address1: customer?.address1 ?? "",
        address2: customer?.address2 ?? "",
        city: customer?.city ?? "",
        state: customer?.state ?? "",
        zip: customer?.zip ?? "",
        notes: customer?.notes ?? "",
        active: customer?.active ?? true
    } : emptyValues;
    const form = useForm<insertCustomerSchemaType>({
        mode: "onBlur",
        resolver: zodResolver(insertCustomerSchema),
        defaultValues,
    });

    useEffect(() => {
        form.reset(hasCustomerId ? defaultValues : emptyValues);
    }, [searchParams.get('customerId')]) // eslint-disable-line react-hooks/exhaustive-deps

    const { execute: executeSave, result:saveResult, isPending:isSaving, reset:resetSaveAction } = useAction(saveCustomerAction,{
        onSuccess({data}){
            //toast user
            if(data?.message){
            toast({
                variant: "default",
                title:"Success! ❤",
                description:data?.message,
            })
        }
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

    async function submitForm(data: insertCustomerSchemaType) {
        // console.log(data);
        executeSave(data);
        // executeSave({ ...data, firstName: '', phone: ''});
    }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
        <DisplayServerActionResponse result={saveResult}/>
        <div className="">
            <h2 className="text-2xl font-bold">
                { customer?.id ? "Edit" : "New" } Customer {customer?.id ? `# ${customer.id}` : "Form"}
            </h2>
        </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitForm)} 
            // className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            className="flex flex-col md:flex-row gap-4 md:gap-8 h-[100vh]">
                <div className="flex flex-col gap-4 w-full max-w-xs">
                    <InputWithLabel<insertCustomerSchemaType> fieldTitle="First Name" nameInSchema="firstName" />
                    <InputWithLabel<insertCustomerSchemaType> fieldTitle="Last Name" nameInSchema="lastName" />
                    <InputWithLabel<insertCustomerSchemaType> fieldTitle="Address 1" nameInSchema="address1" />
                    <InputWithLabel<insertCustomerSchemaType> fieldTitle="Address 2" nameInSchema="address2" />
                    <InputWithLabel<insertCustomerSchemaType> fieldTitle="City" nameInSchema="city" />
                    <SelectWithLabel<insertCustomerSchemaType> fieldTitle="State" nameInSchema="state" data={StatesArray} />
                    </div>
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                    <InputWithLabel<insertCustomerSchemaType> fieldTitle="Zip" nameInSchema="zip" />
                    <InputWithLabel<insertCustomerSchemaType> fieldTitle="Email" nameInSchema="email" />
                    <InputWithLabel<insertCustomerSchemaType> fieldTitle="Phone" nameInSchema="phone" />
                    
                    <TextAreaWithLabel<insertCustomerSchemaType> fieldTitle="Notes" nameInSchema="notes" className="h-40" />
                    {/* { isLoading ? <p>Loading...</p> : isManager && customer?.id ?(
                         <CheckboxWithLabel<insertCustomerSchemaType> fieldTitle="Active" nameInSchema="active" message="Yes" />
                        ):null } */}
                    {isManager && customer?.id ?(
                         <CheckboxWithLabel<insertCustomerSchemaType> fieldTitle="Active" nameInSchema="active" message="Yes" />
                        ):null }
                    <div className="flex gap-2">
                        <Button type="submit" className="w-3/4" variant={"default"} title="Save" disabled={isSaving}>
                            {isSaving ? ( <><LoaderCircle className="animate-spin" /> Saving</> ) : "Save"}
                            </Button>
                        <Button type="button" variant={"destructive"} title="Reset" onClick={() => {form.reset(defaultValues); resetSaveAction()}}>Reset</Button>
                    </div>
                    </div>
                {/* <p>{JSON.stringify(form.getValues()) }</p> */}
            </form>
        </Form>
    </div>
  )
}
