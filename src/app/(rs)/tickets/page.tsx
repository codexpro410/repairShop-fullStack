import { getOpenTickets } from "@/lib/queries/getOpenTickets";
import TicketSearch from "./TicketSearch";
import { getTicketSearchResults } from "@/lib/queries/getTicketSearchResults";
import TicketTable from "./TicketTable";

export const metadata = {
    title:'Tickets Search'
    }
export default async function Tickets({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string | undefined }>;
}) {
  const { searchText } = await searchParams;
  if (!searchText){ 
    const results = await getOpenTickets();
    return (
    <>    
      <TicketSearch/>
      {/* <p>{JSON.stringify(results)}</p> */}
    {results.length ? <TicketTable data={results} /> : 
    <p className="mt-4">No Open Tickets found</p>}

    </>
  )}

  // query database
  const results = await getTicketSearchResults(searchText);
  // return results
  return (
    <>
      <TicketSearch/>
      {/* <p>{JSON.stringify(results)}</p> */}
    {results.length ? <TicketTable data={results} /> : 
    <p className="mt-4">No results found</p>}

    </>
  )
  }
  