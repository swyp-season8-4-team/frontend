// WeeklyPicker.tsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import { startOfWeek, endOfWeek, format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import CustomButton from "../CustomCalendarButton";

interface WeeklyPickerProps {
  value: { start: Date; end: Date } | null;
  selectedDate: Date;
  onChange: (range: { start: Date; end: Date }, pickedDate: Date) => void;
}

const WeeklyPicker: React.FC<WeeklyPickerProps> = ({ value, selectedDate, onChange }) => {
  const today = new Date();

  const handleChange = (date: Date | null) => {
    if (date) {
      const start = startOfWeek(date, { weekStartsOn: 1, locale: ko });
      const end = endOfWeek(date, { weekStartsOn: 1, locale: ko });
      onChange({ start, end }, date); // 선택한 날짜도 같이 전달
    }
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleChange}
      locale={ko}
      dateFormat="yyyy.MM.dd"
      customInput={
        <CustomButton />
      }
      dayClassName={(date: Date) =>
        value && date >= value.start && date <= value.end
          ? "react-datepicker__day--highlighted"
          : ""
      }
      maxDate={today}
      popperPlacement="bottom-start"
    />
  );
};

export default WeeklyPicker;
