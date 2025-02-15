import { Input } from '@/app/components/ui/input';
import SearchBtn from '@/app/components/ui/SearchBtn';
import Form from 'next/form';

export default function TicketSearch() {
  return (
    <Form action='/tickets' className='flex gap-2 items-center'>
        <Input name='searchText' type='text' placeholder='Search Tickets' className='w-full' autoFocus/>
        <SearchBtn/>
    </Form>
  )
}
