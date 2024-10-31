import React from "react";

interface EventProps {
    event: {
        title: string;
        start: Date;
        end: Date;
        allDay?: boolean;
    };
    onButtonClick: (event: any) => void;
}

const EventWithButton: React.FC<EventProps> = ({ event, onButtonClick }) => {
    return (
        <div onClick={onButtonClick}>
            <span>{event.title}</span>
        </div>
    );
};

export default EventWithButton;
