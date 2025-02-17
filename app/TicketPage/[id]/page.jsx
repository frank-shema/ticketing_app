import EditTicketForm from "@/app/(components)/EditTicketForm";

const getTicketById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch ticket");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return null; // In case of error, return null to handle gracefully
  }
};

const TicketPage = async ({ params }) => {
  const { id } = params; // Destructure `id` from `params`

  const EDITMODE = id === "new" ? false : true;
  let updateTicketData = {};

  if (EDITMODE) {
    // Fetch the ticket if not "new"
    const ticketData = await getTicketById(id);
    updateTicketData = ticketData ? ticketData.foundTicket : {};
  } else {
    // If it's "new", set up the data for creating a new ticket
    updateTicketData = {
      _id: "new",
    };
  }

  return <EditTicketForm ticket={updateTicketData} />;
};

export default TicketPage;
