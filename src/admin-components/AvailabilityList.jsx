import React from "react";
import { supabase } from "../supabaseClient";
import { DateTime } from 'luxon';

export default function AvailabilityList({ availability, onChange }) {
    async function deleteSlot(id) {
        await supabase.from("availability").delete().eq("id", id);
        onChange();
    }

    function londonTime(utcTime) {
        return DateTime.fromISO(utcTime).setZone("Europe/London").toFormat("HH:mm")
    }

    return (
        <div className="availability-list">
            <h2>Current Availability</h2>
            {availability.map(slot => (
                <div key={slot.id} className="slot">
                    <span>{slot.date} | {londonTime(slot.start_time)} - {londonTime(slot.end_time)} ({slot.service})</span>
                    {!slot.booked && (
                        <button onClick={() => deleteSlot(slot.id)}>🗑️ Delete</button>
                    )}
                    {slot.booked && <span className="booked-tag">Booked</span>}
                </div>
            ))}
        </div>
    );
}
