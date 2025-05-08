import React from 'react'
import ReactDOM from 'react-dom'
import image from '../assets/availability.jpg'
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { DateTime } from "luxon";

import '../styles/Availability.css'


export default function AvailabilitySection() {

    const [allSlots, setAllSlots] = useState([]);
    const [selectedSlotId, setSelectedSlotId] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(DateTime.local().startOf("month"));

    useEffect(() => {
        async function fetchSlots() {
            const { data, error } = await supabase
                .from("availability")
                .select("*")
                .order("start_time", { ascending: true });

            if (error) {
                console.error(error);
                return;
            }

            setAllSlots(data);
        }

        fetchSlots();
    }, []);

    const visibleSlots = allSlots.filter(slot => {
        const dt = DateTime.fromISO(slot.start_time).setZone("Europe/London");
        return dt.hasSame(currentMonth, "month");
    });

    // Get current time in London
    const now = DateTime.local().setZone("Europe/London");

    // Group by date
    const grouped = {};
    visibleSlots.forEach(slot => {
        const localDate = DateTime.fromISO(slot.start_time).setZone("Europe/London");
        if (localDate < now) return; // skip past slots in past

        const dateKey = localDate.toISODate();
        if (!grouped[dateKey]) grouped[dateKey] = [];
        grouped[dateKey].push({
            ...slot,
            time: localDate.toFormat("HH:mm"),
            date: localDate,
        });
    });

    const sortedDates = Object.keys(grouped).sort();

    function handlePrevMonth() {
        setCurrentMonth(currentMonth.minus({ months: 1 }));
        setSelectedSlotId(null);
    }

    function handleNextMonth() {
        setCurrentMonth(currentMonth.plus({ months: 1 }));
        setSelectedSlotId(null);
    }

    function handleSelect(slotId) {
        setSelectedSlotId(slotId === selectedSlotId ? null : slotId);
    }

    return (
        <section id="availability" >
            <div className="section-body">
                <a href='#availability' ><h1 data-aos="fade-right" data-aos-anchor-placement="bottom-bottom" >Availability</h1></a>
                <div className="booking-calendar">
                    <div className="calendar-header">
                        <button onClick={handlePrevMonth} disabled={currentMonth <= DateTime.local().setZone("Europe/London").startOf("month")}>&lt;</button>
                        <h2>{currentMonth.toFormat("LLLL yyyy")}</h2>
                        <button onClick={handleNextMonth}>&gt;</button>
                    </div>

                    <div className="calendar-grid">
                        {sortedDates.length === 0 ? (
                            <p>No available slots this month.</p>
                        ) : (
                            sortedDates.map(date => (
                                <div key={date} className="calendar-row">
                                    <div className="calendar-date">
                                        {DateTime.fromISO(date).toFormat("ccc dd")}
                                    </div>
                                    <div className="calendar-times">
                                        {grouped[date].map(slot => (
                                            <button
                                                key={slot.id}
                                                className={`time-button ${selectedSlotId === slot.id ? "selected" : ""}`}
                                                onClick={() => handleSelect(slot.id)}
                                                disabled={slot.booked}
                                            >
                                                {slot.time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                {/* <img data-aos="fade-right" className='fullImage' src={image} /> */}
            </div>
        </section >
    )
}