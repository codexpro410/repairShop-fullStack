import { Input } from '@/app/components/ui/input';
import SearchBtn from '@/app/components/ui/SearchBtn';
import Form from 'next/form';

export default function CustomerSearch() {
  return (
    <Form action='/customers' className='flex gap-2 items-center'>
        <Input name='searchText' type='text' placeholder='Search Customers' className='w-full' autoFocus/>
        <SearchBtn/>
    </Form>
  )
}
