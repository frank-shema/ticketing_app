"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// Define the expected ticket structure
interface Ticket {
  _id: string;
  title: string;
  description: string;
  priority: number;
  progress: number;
  status: string;
  category: string;
}

// Define the props for the form
interface EditTicketFormProps {
  ticket: Ticket;
}

const EditTicketForm: React.FC<EditTicketFormProps> = ({ ticket }) => {
  const EDITMODE = ticket._id !== "new";
  const router = useRouter();

  const startingTicketData: Ticket = {
    _id: ticket._id,
    title: EDITMODE ? ticket.title : "",
    description: EDITMODE ? ticket.description : "",
    priority: EDITMODE ? ticket.priority : 1,
    progress: EDITMODE ? ticket.progress : 0,
    status: EDITMODE ? ticket.status : "not started",
    category: EDITMODE ? ticket.category : "Hardware Problem",
  };

  const [formData, setFormData] = useState<Ticket>(startingTicketData);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]:
        name === "priority" || name === "progress" ? Number(value) : value, // Convert to number where needed
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = EDITMODE ? `/api/Tickets/${ticket._id}` : "/api/Tickets";
    const method = EDITMODE ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error(`Failed to ${EDITMODE ? "update" : "create"} ticket`);
    }

    router.refresh();
    router.push("/");
  };

  const categories = [
    "Hardware Problem",
    "Software Problem",
    "Application Development",
    "Project",
  ];

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-3 w-1/2"
      >
        <h3>{EDITMODE ? "Update Your Ticket" : "Create New Ticket"}</h3>

        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required
          value={formData.title}
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required
          value={formData.description}
          rows={5}
        />

        <label htmlFor="category">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label>Priority</label>
        <div>
          {[1, 2, 3, 4, 5].map((num) => (
            <React.Fragment key={num}>
              <input
                id={`priority-${num}`}
                name="priority"
                type="radio"
                onChange={handleChange}
                value={num}
                checked={formData.priority === num}
              />
              <label htmlFor={`priority-${num}`}>{num}</label>
            </React.Fragment>
          ))}
        </div>

        <label htmlFor="progress">Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />

        <label htmlFor="status">Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>

        <input
          type="submit"
          className="btn max-w-xs"
          value={EDITMODE ? "Update Ticket" : "Create Ticket"}
        />
      </form>
    </div>
  );
};

export default EditTicketForm;
