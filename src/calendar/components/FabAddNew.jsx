import { addHours } from "date-fns";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUiStore } from "../../hooks/useUiStore";

export const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { changeActiveEvent } = useCalendarStore();

  const handleClick = () => {
    changeActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        _id: 123,
        name: "Aldrich",
      },
    });
    openDateModal();
  };

  return (
    <button onClick={handleClick} className="btn btn-primary fab">
      <i className="fas fa-plus"></i>
    </button>
  );
};
