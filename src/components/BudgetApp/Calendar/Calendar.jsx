import React, { useState } from 'react';
import Calendar from 'react-calendar';
import "./Calendar.scss";

function ReusableCalendar() {
  const [date, setDate] = useState(new Date());
  
  return (
    <div className='calendar-main'>
      <h1 className='text-center'>calendar</h1>
      <div className='calendar-table'>
        <Calendar
          onChange={setDate}
          value={date}
          selectRange={true}
          className="custom-calendar"
        />
      </div>
    </div>
  );
}

export default ReusableCalendar;
