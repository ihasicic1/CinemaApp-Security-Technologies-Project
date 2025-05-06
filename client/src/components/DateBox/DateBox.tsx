import "./dateBox.scss";

export type DateBoxProps = {
  date: Date;
  isSelected: boolean;
  onSelect: () => void;
};

export const DateBox = ({ date, isSelected, onSelect }: DateBoxProps) => {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const today = new Date();
  const isToday = dateObj.toDateString() === today.toDateString();

  const day = isToday
    ? "Today"
    : dateObj.toLocaleDateString("en-US", { weekday: "short" });

  return (
    <div className="datebox-container">
      <div
        className={`date-block ${isSelected ? "selected" : ""}`}
        onClick={onSelect}
      >
        <p className="date">{formattedDate}</p>
        <p className="day">{day}</p>
      </div>
    </div>
  );
};
