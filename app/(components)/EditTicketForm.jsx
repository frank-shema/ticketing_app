import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const EditTicketForm = ({ ticket }) => {
  const router = useRouter();
  const EDITMODE = ticket._id !== "new";
  const categories = [
    "Hardware Problem",
    "Software Problem",
    "Application Development",
    "Project",
  ];

  // Default state data for a new ticket
  const defaultTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware Problem",
  };

  // State to hold form data
  const [formData, setFormData] = useState(defaultTicketData);

  // Update formData if ticket is in edit mode
  useEffect(() => {
    if (EDITMODE) {
      setFormData({
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        progress: ticket.progress,
        status: ticket.status,
        category: ticket.category,
      });
    }
  }, [EDITMODE, ticket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      EDITMODE ? `/api/Tickets/${ticket._id}` : "/api/Tickets",
      {
        method: EDITMODE ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!res.ok) {
      throw new Error(
        EDITMODE ? "Failed to update ticket" : "Failed to create ticket"
      );
    }

    router.refresh();
    router.push("/");
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-1/2">
        <h3>{EDITMODE ? "Update Your Ticket" : "Create New Ticket"}</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required
          value={formData.title}
        />
        <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required
          value={formData.description}
          rows="5"
        />
        <label>Category</label>
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
          {[1, 2, 3, 4, 5].map((priority) => (
            <div key={priority}>
              <input
                id={`priority-${priority}`}
                name="priority"
                type="radio"
                onChange={handleChange}
                value={priority}
                checked={formData.priority == priority}
              />
              <label>{priority}</label>
            </div>
          ))}
        </div>

        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          min="0"
          max="100"
          onChange={handleChange}
        />
        <label>Status</label>
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
