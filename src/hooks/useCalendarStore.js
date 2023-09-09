import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpadateEvent,
} from "../store/calendar/calendarSlice";
import calendarApi from "../api/calendarApi";
import { convertEventsToDate } from "../helpers/convertEventsToDate";
import { toast } from "sonner";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const changeActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (newEvent) => {
    try {
      if (newEvent.id) {
        //actualizando
        await calendarApi.put(`/events/${newEvent.id}`, newEvent);
        dispatch(onUpadateEvent({ ...newEvent, user }));
        return;
      }
      //creando
      const { data } = await calendarApi.post("/events", newEvent);
      dispatch(onAddNewEvent({ ...newEvent, id: data.event.id, user }));
    } catch (error) {
      console.log(error.data.msg);
      toast.error("no puedes guardar un evento que no es tuyo");
    }
  };

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      toast.error("error al eliminar");
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      const events = convertEventsToDate(data.events);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //*propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //*metodos
    changeActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
