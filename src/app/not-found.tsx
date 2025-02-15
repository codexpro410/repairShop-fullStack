import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
    title: "Page Not Found",
}
 
export default function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
      <h2 className='text-2xl'>Page Not Found</h2>
      <Image src="/images/notFound.jpg" className="m-0 rounded-xl" alt="404" sizes='300px' priority={true} title="Page Not Found" width={300} height={500} />
      <Link href="/tickets" className='text-center hover:underline'>
        <h3>Go Home</h3>
        </Link>
    </div>
  )
}