'use client';
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes } from "react";
import { Button } from "./button";


type Props = {
    title:string,
    className?:string,
    variant?:"default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined,

} & ButtonHTMLAttributes<HTMLButtonElement>

export default function BackBtn({title,className,variant,...props}:Props) {
    const router = useRouter();
  return (
    <Button variant={variant} title={title} className={className} onClick={() => router.back()} {...props}>
        {title}
    </Button>
  )
}