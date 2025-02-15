'use client'

import { TextareaHTMLAttributes } from "react"
import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Textarea } from "../ui/textarea"


// s for schema
type Props<S> = {
    fieldTitle:string,
    nameInSchema:keyof S & string,
    className?: string,
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export default function TextAreaWithLabel<S>({fieldTitle,nameInSchema,className,...props}:Props<S>) {
    const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base mb-2" htmlFor={nameInSchema}>{fieldTitle}</FormLabel>
          <FormControl>
            <Textarea  id={nameInSchema} 
            className={`w-full max-w-xs disabled:text-blue-500 dark:disabled:text-yellow-300 disabled:opacity-75 ${className}`}
             {...field} {...props}/>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
      />
  )
}
