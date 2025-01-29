"use client";

import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

// Define props interface
interface DeleteBlockProps {
  id: string;
}

const DeleteBlock: React.FC<DeleteBlockProps> = ({ id }) => {
  const router = useRouter();

  // Delete function with TypeScript
  const deleteTicket = async (): Promise<void> => {
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    }
  }; // Return the delete block

  return (
    <FontAwesomeIcon
      icon={faX}
      className="text-red-400 hover:cursor-pointer hover:text-red-200"
      onClick={deleteTicket}
    />
  );
};

export default DeleteBlock;
