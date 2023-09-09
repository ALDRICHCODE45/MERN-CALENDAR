import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Navbar } from "../components/Navbar";
import { localizer } from "../../helpers/calendarLocalizer";
import { getMessagesEs } from "../../helpers/getMessages";
import { CalendarEvent } from "../components/CalendarEvent";
import { useEffect, useState } from "react";
import { CalendarModal } from "../components/CalendarModal";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { FabAddNew } from "../components/FabAddNew";
import { FabDelete } from "../components/FabDelet";
import { useSelector } from "react-redux";

export const CalendarPage = () => {
  const { user } = useSelector((state) => state.auth);
  // eslint-disable-next-line no-unused-vars
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );
  const { openDateModal } = useUiStore();
  const { events, changeActiveEvent, activeEvent, startLoadingEvents } =
    useCalendarStore();

  const eventStyleGetter = (event) => {
    const myEvent = user.uid === event.user._id || user.uid === event.user.uid;
    console.log(event);
    const style = {
      backgroundColor: myEvent ? "#347CF7" : "#465660",
      borderRadius: "2px",
      opacity: 0.8,
      color: "white",
    };
    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    console.log({ doubleClick: event });
    openDateModal();

    changeActiveEvent(event);
    console.log(activeEvent);
  };

  const onClick = (event) => {
    console.log({ click: event });
    changeActiveEvent(event);
  };

  const onViewChanged = (event) => {
    localStorage.setItem("lastView", event);
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onClick}
        onView={onViewChanged}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
