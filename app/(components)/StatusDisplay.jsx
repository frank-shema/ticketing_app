const StatusDisplay = ({ status }) => {
  const getColor = (status) => {
    let color;
    switch (status.toLowerCase()) {
      case "done":
        color = "bg-green-200";
        return color;

      case "started":
        color = "bg-yellow-200";
        return color;
      // today am so tired that I cant commit

      case "not started":
        color = "bg-red-200";
        return color;
      default:
        color = "bg-slate-700";
    }
    // this is the world
    return color;
  };
  return (
    <span
      className={`inline-block  rounded-full px-2 py-1 text-xs font-semibold text-gray-700 ${getColor(
        status
      )}`}
    >
      {status}
    </span>
  );
};

export default StatusDisplay;
