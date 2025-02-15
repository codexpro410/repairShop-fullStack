import Link from "next/link"

export default function Home() {
  return (
   <div className="bg-black bg-home-img bg-cover bg-center">
    <main className="flex flex-col justify-center text-center max-w-5xl mx-auto h-dvh">
      <div className="flex flex-col gap-6 p-12 rounded-xl bg-black/90 w-4/5 sm:max-w-96 mx-auto text-white sm:text-2xl">
      <h1 className="text-4xl font-bold leading-tight">
        Welcome to <br />
        Islam&apos;s Computer Repair Shop
      </h1>

      {/* Address */}
      <address className="not-italic text-gray-600 hover:text-gray-500">
        Shbin St, <br />
        Ismailia, Egypt
      </address>

      {/* Opening Hours */}
      <p className="text-gray-600 hover:text-gray-500">Open Daily: 9am to 5pm</p>

      {/* Call-to-Action Buttons */}
      <div className="flex flex-col items-center space-y-2">
        <Link
          href="/contact"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Contact Us
        </Link>
        <Link
          href="/home"
          className="text-green-600 hover:underline transition-colors"
        >
          Browse Our Services
        </Link>
      </div>
      </div>
    </main>
   </div>
  );
}
