import { addHours, differenceInSeconds } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUiStore } from "../../hooks/useUiStore";

export const useCalendar = () => {
  const [formValues, setFormValues] = useState({
    title: "Aldrich",
    notes: "Flores",
    start: new Date(),
    end: addHours(new Date(), 2),
  });
  const { closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";

    return formValues.title.length > 0 ? "is-valid" : "is-invalid";
  }, [formValues.title, formSubmitted]);

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      toast.error("Fechas incorrectas");
      return;
    }

    if (formValues.title.length <= 0) {
      toast.error("el titulo es obligatorio");
      return;
    }
    console.log(formValues);

    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmitted(false);
  };

  return {
    formValues,
    onSubmit,
    onDateChanged,
    onInputChanged,
    titleClass,
  };
};
