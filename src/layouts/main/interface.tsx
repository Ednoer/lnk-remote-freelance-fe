import { Event as CalendarEvent } from 'react-big-calendar';

export interface Event extends CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
}
