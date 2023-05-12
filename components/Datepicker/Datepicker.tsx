import { useEffect, useState } from 'react';
import {
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  subMonths,
  addMonths,
} from 'date-fns';

//components
import Calendar from './Calendar';

interface DatepickerProps {
  onSelect: (date: Date) => void;
}

const Datepicker = ({ onSelect }: DatepickerProps) => {
  const today = new Date();
  //current date => will change when changing months using right/left icons
  const [activeDate, setActiveDate] = useState(today);

  //keep the days of month for display
  const [daysOfMonth, setDaysofMonth] = useState<(Date | null)[]>([]);
  const [daysOfNextMonth, setDaysofNextMonth] = useState<(Date | null)[]>([]);

  //when month is changed, this funtion will generate the days for that month
  useEffect(() => {
    // init array to store dates after logic
    const daysOfMonthArray = [];
    const daysOfNextMonthArray = [];

    //getting first day of first week of month => can be a date from previous month
    let currentDate = startOfWeek(startOfMonth(activeDate));
    const lastDayOfMonth = endOfMonth(activeDate);

    //goest through all days of month and sees
    while (currentDate <= lastDayOfMonth) {
      daysOfMonthArray.push(currentDate);
      currentDate = addDays(currentDate, 1);
    }

    //getting first day of first week of next month => can be a date from previous month
    const nextMonth = addMonths(activeDate, 1);
    let currentDateNextMonth = startOfWeek(startOfMonth(nextMonth));
    const lastDayOfNextMonth = endOfMonth(nextMonth);

    //goest through all days of month and sees
    while (currentDateNextMonth <= lastDayOfNextMonth) {
      if (isSameMonth(currentDateNextMonth, nextMonth)) {
        daysOfNextMonthArray.push(currentDateNextMonth);
      } else daysOfNextMonthArray.push(null);
      currentDateNextMonth = addDays(currentDateNextMonth, 1);
    }

    //sets all days in a week to an array
    setDaysofMonth(daysOfMonthArray);
    setDaysofNextMonth(daysOfNextMonthArray);
  }, [activeDate]);

  return (
    <div className="grid grid-cols-2 gap-2 bg-background">
      {/* month 1 */}
      <section>
        <div className="relative flex justify-center">
          <button
            className="hover:bg-disabled/50 absolute left-0 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full transition-colors duration-150"
            onClick={() => setActiveDate(subMonths(activeDate, 1))}
          >
            <i className="fa-solid fa-chevron-left" />
          </button>
          <h2 className="font-bold">
            {activeDate.toLocaleDateString('en-us', {
              year: 'numeric',
              month: 'short',
            })}
          </h2>
        </div>
        <Calendar
          today={today}
          daysOfMonth={daysOfMonth}
          dateOnClickHandler={onSelect}
          onHoverHandler={(date: Date) => {}}
        />
      </section>

      {/* month 2 */}
      <section>
        <div className="relative flex justify-center">
          <button
            className="hover:bg-disabled/50 absolute right-0 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full transition-colors duration-150"
            onClick={() => setActiveDate(addMonths(activeDate, 1))}
          >
            <i className="fa-solid fa-chevron-right" />
          </button>
          <h2 className="font-bold">
            {addMonths(activeDate, 1).toLocaleDateString('en-us', {
              year: 'numeric',
              month: 'short',
            })}
          </h2>
        </div>
        <Calendar
          today={today}
          daysOfMonth={daysOfNextMonth}
          dateOnClickHandler={onSelect}
          onHoverHandler={(date: Date) => {}}
        />
      </section>
    </div>
  );
};

export default Datepicker;
