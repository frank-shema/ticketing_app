import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PriorityDisplayProps {
  priority: number;
}

const PriorityDisplay: React.FC<PriorityDisplayProps> = ({ priority }) => {
  return (
    <div className="flex justify-start align-baseline">
      {[...Array(5)].map((_, index) => (
        <FontAwesomeIcon
          key={index}
          icon={faFire}
          className={`pr-1 ${
            priority > index ? "text-red-400" : "text-slate-400"
          }`}
        />
      ))}
    </div>
  );
};

export default PriorityDisplay;
