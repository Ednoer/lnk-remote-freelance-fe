import dayjs, { Dayjs } from "dayjs";
import { FC, memo, useEffect, useState } from "react";
import { useQuery } from "react-query";
import api from "./api";
import CalendarComponent from "@/components/Calendar";
import { Event } from "./interface";
import MyCalendar from "@/components/Calendar";
import { useRouter } from "next/navigation";

interface EmailCalendarProps {
    initialTime: string;
}

interface DataItem {
    _id: string;
    date: string;
    description: string;
    created_by: string;
    created_at: string;
    updated_at: string;
    __v: number;
}

const EmailCalendar: FC<EmailCalendarProps> = ({
    initialTime
}) => {
    const router = useRouter()
    const [month, setMonth] = useState<Dayjs>(dayjs());
    const [time, setTime] = useState(new Date(initialTime));

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);

        return function cleanup() {
            clearInterval(timerID);
        };
    });

    const tick = () => {
        const currentTime = new Date();
        setTime(currentTime);
    };


    const params: any = {
        month: dayjs(month).format('YYYY-MM'),
    }

    const {
        data, isLoading, refetch, isFetching
    } = useQuery(['list-emails', params], () => api.getListEmails(params))

    const events: Event[] = data?.data?.map((item) => ({
        id: item._id,
        title: item.description,
        start: dayjs(item.date).toDate(),
        end: dayjs(item.date).toDate(),
        allDay: false,
    })) || [];

    return (
        <div className="mt-8">
            <div className="flex flex-col items-end gap-1">
                <button
                    onClick={() => router.push('/events/new')}
                    className={`btn btn-primary ${isLoading && "btn-loading"}`}
                    disabled={isLoading}
                >Add Event</button>
                <div className="flex flex-row items-center justify-between w-full">
                    <h1 className="text-2xl font-semibold">Events</h1>
                    <h1 className="text-lg font-semibold">{dayjs(time).format('h:mm:ss A') || '00:00:00 --'}</h1>
                </div>
                <CalendarComponent events={events} onEvent={(e: Dayjs) => setMonth(e)} />
            </div>
        </div>
    )
}

export default memo(EmailCalendar)