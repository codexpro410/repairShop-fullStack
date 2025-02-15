'use client';

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/app/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
const featuredProducts = [
  { id: 1, name: "Gaming PC", price: "$1299.00", image: "/images/pc.webp" },
  { id: 2, name: "Ultra-thin Laptop", price: "$999.00", image: "/images/labtop.jpg" },
  { id: 3, name: "4K Monitor", price: "$499.00", image: "/images/monitor.png" },
  { id: 4, name: "Mechanical Keyboard", price: "$129.00", image: "/images/keyboard.jpg" },
]

const services = [
  { name: "Custom PC Building", description: "Build your dream PC with our expert technicians" },
  { name: "Repairs & Upgrades", description: "Fast and reliable repair services for all your devices" },
  { name: "IT Consultation", description: "Professional advice for your home or business tech needs" },
  { name: "Data Recovery", description: "Recover your important data from damaged storage devices" },
]

// export const metadata = {
//   title:'Home'
//   }
// import { redirect } from 'next/navigation'


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Islam's computer repair shop</h1>
          <p className="text-xl mb-8">Your one-stop shop for all things computers</p>
          <div className="flex flex-wrap gap-4 justify-center items-center">
          <Button asChild>
            <Link href="/customers">Search Customers</Link>
          </Button>
          <Button asChild>
            <Link href="/tickets">Show Tickets</Link>
          </Button>
          <Button asChild>
            <Link href="/customers/form">Create New Customer</Link>
          </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured-products" className="w-full py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="hover:bg-gray-500">
                <CardHeader>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="mx-auto object-cover rounded-lg"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle>{product.name}</CardTitle>
                  <p className="text-lg font-semibold text-gray-600">{product.price}</p>
                </CardContent>
                {/* <CardFooter>
                  <Button className="w-full">Add to Cart</Button>
                </CardFooter> */}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact/Location Section */}
      <section className="w-full py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Visit Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
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
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Location</h3>
              <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
                <p>Map Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
