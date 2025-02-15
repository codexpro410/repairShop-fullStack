"use client"

import type React from "react"

import { useState } from "react"


import { useToast } from "@/hooks/use-toast"
import { Textarea } from "@/app/components/ui/textarea"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Contact() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your server
    console.log("Form submitted:", { name, email, message })
    toast({
      title: "Message Sent",
      description: "We've received your message and will get back to you soon.",
    })
    // Reset form fields
    setName("")
    setEmail("")
    setMessage("")
  }

  return (
    <main className="flex flex-wrap justify-center items-center gap-4">

    <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Name
      </label>
      <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
    </div>
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email
      </label>
      <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    </div>
    <div>
      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
        Message
      </label>
      <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required />
    </div>
    <Button type="submit">Send Message</Button>
  </form>

  {/* section two */}
  <div>
      <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
      <ul className="space-y-4">
        <li className="flex items-center">
          <MapPin className="mr-2" /> shbin Street, Ismailia, Egypt
        </li>
        <li className="flex items-center">
          <Phone className="mr-2" /> (+02) 010-945-30343
        </li>
        <li className="flex items-center">
          <Mail className="mr-2" /> islamabozeed247@gmail.com
        </li>
        <li className="flex items-center">
          <Clock className="mr-2" /> Mon-Sat: 9AM-5PM
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Location</h2>
      <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
        <p>Map Placeholder</p>
      </div>
    </div>
    </main>
  )
}

