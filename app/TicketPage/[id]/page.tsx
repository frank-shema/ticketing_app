import EditTicketForm from "../../(components)/EditTicketForm";

interface Ticket {
  _id: string;
  [key: string]: any;
}

const getTicketById = async (id: string): Promise<Ticket | null> => {
  try {
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch ticket");
    }

    const data = await res.json();
    return data.foundTicket;
  } catch (error) {
    console.error(error);
    return null;
  }
};

interface TicketPageProps {
  params: { id: string };
}

const TicketPage = async ({ params }: TicketPageProps) => {
  const EDITMODE = params.id !== "new";
  let updateTicketData: Ticket = { _id: "new" };

  if (EDITMODE) {
    const ticket = await getTicketById(params.id);
    if (ticket) {
      updateTicketData = ticket;
    }
  }

  return <EditTicketForm ticket={updateTicketData} />;
};

export default TicketPage;
