import React, { useState } from 'react';
import ReactCalendar from 'react-calendar';

const Calendar = (props) => {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <ReactCalendar
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default Calendar;