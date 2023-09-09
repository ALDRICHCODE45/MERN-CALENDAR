import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    isLoadingEvent: true,
    events: [],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpadateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }
        return event;
      });
    },
    onDeleteEvent: (state) => {
      state.events = state.events.filter(
        (event) => event.id !== state.activeEvent.id
      );
      state.activeEvent = null;
    },
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvent = false;

      payload.forEach((event) => {
        const exist = state.events.some((dbEvent) => dbEvent.id === event.id);
        if (!exist) {
          state.events.push(event);
        }
      });
    },
    onLogOutCalendar: (state) => {
      state.isLoadingEvent = true;
      state.events = [];
      state.activeEvent = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpadateEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogOutCalendar,
} = calendarSlice.actions;
