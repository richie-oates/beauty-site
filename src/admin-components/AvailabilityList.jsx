import React from "react";
import { supabase } from "../supabaseClient";
import { DateTime } from 'luxon';

export default function AvailabilityList({ availability, onChange }) {
    async function deleteSlot(id) {
        await supabase.from("availability").delete().eq("id", id);
        onChange();
    }

    async function bookSlot(id) {
        const client_name = prompt("Enter client name:");
        if (!client_name) return; // If canceled, do nothing

        const { error } = await supabase
            .from("availability")
            .update({ booked: true, client_name })
            .eq("id", id);

        if (error) console.error(error);
        onChange();
    }

    async function cancelBooking(id) {
        const { error } = await supabase
            .from("availability")
            .update({ booked: false, client_name: null })
            .eq("id", id);

        if (error) console.error(error);
        onChange();
    }

    function londonTime(utcTime) {
        return DateTime.fromISO(utcTime).setZone("Europe/London").toFormat("HH:mm")
    }

    function formatDate(isoDate) {
        return DateTime.fromISO(isoDate).toFormat("dd-MM-yyyy");
    }

    // Filter to show only slots starting today or in the future
    const today = DateTime.local().startOf("day");
    const filteredSlots = availability
        .filter((slot) => DateTime.fromISO(slot.date) >= today)
        .sort((a, b) => {
            // Sort first by date, then by start_time
            const dateA = DateTime.fromISO(a.date);
            const dateB = DateTime.fromISO(b.date);
            if (dateA < dateB) return -1;
            if (dateA > dateB) return 1;

            // If dates are the same, sort by start_time
            const timeA = DateTime.fromISO(a.start_time);
            const timeB = DateTime.fromISO(b.start_time);
            return timeA - timeB;
        });

    return (
        <div className="availability-list">
            <h2>Current Availability</h2>
            {filteredSlots.length === 0 && <p>No upcoming slots available.</p>}
            {filteredSlots.map(slot => (
                <div key={slot.id} className="slot">
                    <span>{formatDate(slot.date)} | {londonTime(slot.start_time)} - {londonTime(slot.end_time)}</span>
                    {slot.booked && (
                        <>
                            <span> | Booked by: {slot.client_name}</span>
                            <button onClick={() => cancelBooking(slot.id)}>❌ Cancel Booking</button>
                        </>
                    )}
                    {!slot.booked && (
                        <>
                            <button onClick={() => bookSlot(slot.id)}>✅ Book</button>
                            <button onClick={() => deleteSlot(slot.id)}>🗑️ Delete</button>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}
