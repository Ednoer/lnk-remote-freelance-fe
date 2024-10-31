import { Calendar, Event as CalendarEvent, momentLocalizer, ToolbarProps } from 'react-big-calendar';
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Event } from '@/layouts/main/interface';
import EventWithButton from './EventWithButton';
import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { useRouter } from 'next/router';

const localizer = momentLocalizer(moment);

interface CalendarComponentProps {
    events: Event[];
    onEvent: (event: Dayjs) => void; 
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ events, onEvent }) => {
    const router = useRouter();

    const onClickEvent = (event: Event) => {
        console.log(event)
        router.push(`/events/${event.id}/edit`)
    };

    return (
        <div className="h-[80%] w-full">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                titleAccessor="title"
                defaultView="month"
                views={['month', 'week', 'day', 'agenda']}
                style={{ height: '80vh' }}
                onNavigate={(e:any) => onEvent(e)}
                onSelectEvent={onClickEvent}
            />
        </div>
    );
};

export default CalendarComponent;
