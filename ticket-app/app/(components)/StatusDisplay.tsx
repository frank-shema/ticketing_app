interface StatusDisplayProps {
  status: "done" | "started" | "not started" | string; // Explicit types for known statuses, plus a fallback for other values
}

const StatusDisplay: React.FC<StatusDisplayProps> = ({ status }) => {
  const getColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case "done":
        return "bg-green-200";
      case "started":
        return "bg-yellow-200";
      case "not started":
        return "bg-red-200";
      default:
        return "bg-slate-700"; // Default color for unknown statuses
    }
  };

  return (
    <span
      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold text-gray-700 ${getColor(
        status
      )}`}
    >
      {status}
    </span>
  );
};

export default StatusDisplay;
