import { isAfter, isBefore, isSameDay } from 'date-fns';
import clsx from 'clsx';

//utils
import { WEEKDAYS } from '~/constants/date';
import { formatDate } from '../../../bonavoy-plannerOLD/utils/date';

interface CalendarProps {
  today: Date;
  daysOfMonth: (Date | null)[];
  dateRange: { startDate: Date | null; endDate: Date | null; colour: string };
  dateOnClickHandler: (date: Date) => void;
  onHoverHandler: (date: Date) => void;
}

export default function Calendar({
  today,
  daysOfMonth,
  dateRange,
  dateOnClickHandler,
  onHoverHandler,
}: CalendarProps) {
  //function that gets colours of other places
  const categorizeDateColor = (date: Date): object => {
    // // go over places and get index of the color map for the date
    // for (let i = 0; i < otherPlaces!.length; i++) {
    //   // get index of individual places
    //   const place = otherPlaces![i];

    //   //get start and end dates
    //   const start = new Date(place.startDate as Date);
    //   const end = new Date(place.endDate as Date);

    //   //return a style object
    //   if (isSameDay(start, date)) {
    //     return {
    //       background: place.colour + 60,
    //       color: 'black',
    //     };
    //   }
    //   if (isSameDay(end, date)) {
    //     return {
    //       background: place.colour + 60,
    //       color: 'black',
    //     };
    //   }
    //   if (start <= date && date <= end) {
    //     return { background: place.colour + 60, color: 'black' };
    //   }
    // }

    return {};
  };

  return (
    <div className="flex flex-col text-sm">
      {/* day of week */}
      <section className="grid grid-cols-7">
        {WEEKDAYS.map((dayOfWeek) => (
          <div
            key={dayOfWeek}
            className="flex h-10 w-full items-center justify-center text-center"
          >
            {dayOfWeek}
          </div>
        ))}
      </section>

      {/* actual dates of month */}
      <section className="grid grid-cols-7">
        {daysOfMonth.map((date: Date | null, idx: number) => {
          //if null, render empty div
          if (!date) return <div key={idx} />;

          // const otherPlacesStyles = otherPlaces
          //   ? categorizeDateColor(date)
          //   : {};

          const isBeforeToday = isBefore(date, today);
          const isStartOrEnd =
            isSameDay(dateRange.startDate as Date, date) ||
            isSameDay(dateRange.endDate as Date, date);
          const isBetweenStartAndEnd =
            isAfter(date, dateRange.startDate as Date) &&
            isBefore(date, dateRange.endDate as Date);

          return (
            <div
              key={date.getTime()}
              onClick={() => dateOnClickHandler(date)}
              onPointerEnter={() => onHoverHandler(date)}
              style={{
                background: clsx({
                  [`${dateRange.colour}` + 30]: isBetweenStartAndEnd,
                  [`${dateRange.colour}`]: isStartOrEnd,
                }),

                // ...otherPlacesStyles,
              }}
              className={clsx(
                'relative flex h-10 w-full cursor-pointer items-center justify-center text-center',
                {
                  'text-disabled pointer-events-none': isBeforeToday,
                  'before:bg-inherit rounded-full bg-gradient-to-r from-black to-black font-semibold text-white before:absolute before:h-full before:w-full before:opacity-20':
                    isStartOrEnd,
                },
              )}
            >
              <span className="relative z-20">
                {formatDate(date, { day: 'numeric' })}
              </span>
            </div>
          );
        })}
      </section>
    </div>
  );
}
