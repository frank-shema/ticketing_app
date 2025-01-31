import { NextPage } from "next";
import EditTicketForm from "../../(components)/EditTicketForm";

import { Ticket } from "@/app/api/Tickets/models/Ticket";

interface TicketPageProps {
  params: { id: string };
}

// Fetch Ticket from PostgreSQL
const getTicketById = async (id: string) => {
  try {
    const ticket = await Ticket.findByPk(id);
    return ticket ? ticket.toJSON() : null;
  } catch (error) {
    console.error("Error fetching ticket:", error);
    return null;
  }
};

const TicketPage: NextPage<TicketPageProps> = async ({ params }) => {
  const EDITMODE = params.id !== "new";
  let updateTicketData = {
    id: "new",
    title: "",
    description: "",
    category: "",
    priority: 1,
    progress: 0,
    status: "Open",
    active: true,
  };

  if (EDITMODE) {
    const ticket = await getTicketById(params.id);
    if (ticket) {
      updateTicketData = ticket;
    }
  }

  return <EditTicketForm ticket={updateTicketData} />;
};

export default TicketPage;
