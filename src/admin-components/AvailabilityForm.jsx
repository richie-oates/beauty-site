import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { DateTime } from 'luxon';

export default function AvailabilityForm({ onNewSlot }) {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [duration, setDuration] = useState(60); // keep as number
    const [service, setService] = useState("General");

    async function handleSubmit(e) {
        e.preventDefault();

        const localStart = DateTime.fromISO(`${date}T${time}`, { zone: 'Europe/London' });
        const startUTC = localStart.toUTC().toISO();
        const endUTC = localStart.plus({ minutes: duration }).toUTC().toISO();

        const { error } = await supabase.from("availability").insert({
            date,
            start_time: startUTC,
            end_time: endUTC,
            service,
            booked: false,
        });

        if (!error) {
            onNewSlot();
            setDate("");
            setTime("");
            setDuration(60);
            setService("General");
        } else {
            console.error(error);
        }
    }

    function generateTimeOptions() {
        const times = [];
        for (let hour = 8; hour <= 18; hour++) {
            for (let min = 0; min < 60; min += 15) {
                const time = `${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
                times.push(
                    <option key={time} value={time}>
                        {time}
                    </option>
                );
            }
        }
        return times;
    }

    return (
        <form onSubmit={handleSubmit} className="availability-form">
            <h2>Add Available Slot</h2>

            <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                required
            />

            <select value={time} onChange={e => setTime(e.target.value)} required>
                <option value="">-- Select Time --</option>
                {generateTimeOptions()}
            </select>

            <select
                value={duration}
                onChange={e => setDuration(Number(e.target.value))} // cast to number
                required
            >
                <option value={15}>15 min</option>
                <option value={30}>30 min</option>
                <option value={45}>45 min</option>
                <option value={60}>60 min</option>
                <option value={90}>90 min</option>
            </select>

            <input
                type="text"
                value={service}
                onChange={e => setService(e.target.value)}
                placeholder="Service type"
            />

            <button type="submit">Add Slot</button>
        </form>
    );
}
