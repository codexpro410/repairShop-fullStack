"use client";
import Link from "next/link";
import NavButton from "./NavButton";
import { CarIcon, File, HomeIcon, LogOut, Mail, UsersRound } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { NavButtonMenu } from "./NavButtonMenu";
export default function Header() {
  return (
    <header className="animate-slide bg-background h-12 p-2 border-b sticky top-0 z-20">
        <div className="flex h-8 items-center justify-between w-full">
            <div className="flex items-center gap-2">
                <NavButton href="/home" label="Home" icon={HomeIcon} />
                <Link href="/home" className="flex justify-center items-center gap-2 ml-0" title="home">
                    <h1 className="hidden sm:block text-xl font-bold m-0 mt-1">Computer Repair Shop</h1>
                </Link>
            </div>
            <div className="flex items-center">
            <NavButton href="/tickets" label="Tickets" icon={File} />
            {/* <NavButton href="/customers" label="Customers" icon={UsersRound} /> */}
            <NavButtonMenu icon={UsersRound} label="Customers Menu" 
            choices={[
              {title:"Search Customers", href:"/customers"},
              {title:"New Customers", href:"/customers/form"},
              ]}/>

            <NavButton href="/contact" label="contact-us-page" icon={Mail} />
            
            <ModeToggle/>


            <Button variant="ghost" size="icon" aria-label="logOut" title="logOut" className="rounded-full" asChild>
              {/* <LogoutLink postLogoutRedirectURI="http://localhost:3000/login"> */}
              <LogoutLink>
                <LogOut/>
              </LogoutLink>
            </Button>
            </div>
        </div>
    </header>
  )
}
