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

    const [showBookingForm, setShowBookingForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    return (
        <section id="availability" >
            <div className="section-body">
                <a href='#availability' ><h1 data-aos="fade-right" data-aos-anchor-placement="bottom-bottom" >Availability</h1></a>
                <div className="booking-calendar box-shadow">
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
                {selectedSlotId && (
                    <div style={{ marginTop: "1rem" }}>
                        <button
                            className="request-button"
                            onClick={() => setShowBookingForm(true)}
                        >
                            Request Appointment
                        </button>
                    </div>
                )}
                {showBookingForm && (
                    <div className="booking-form-overlay">
                        <div className="booking-form">
                            <h2>Request Appointment</h2>
                            <p>
                                You are requesting to book:
                                <strong>
                                    {" "}
                                    {DateTime.fromISO(
                                        allSlots.find(s => s.id === selectedSlotId).start_time
                                    )
                                        .setZone("Europe/London")
                                        .toFormat("cccc dd LLLL yyyy 'at' HH:mm")}
                                </strong>
                            </p>
                            <form
                                name="appointment-request"
                                method="POST"
                                data-netlify="true"
                                netlify-honeypot="bot-field"
                            >
                                <input type="hidden" name="form-name" value="appointment-request" />
                                <input type="hidden" name="slot-time" value={DateTime.fromISO(
                                    allSlots.find(s => s.id === selectedSlotId).start_time
                                )
                                    .setZone("Europe/London")
                                    .toFormat("cccc dd LLLL yyyy 'at' HH:mm")} />
                                <input
                                    type="hidden"
                                    name="bookingLink"
                                    value={`https://qbbeauty.netlify.app/book-slot?id=${selectedSlotId}&client=${encodeURIComponent(formData.name)}`}
                                />

                                <p hidden>
                                    <label>
                                        Don’t fill this out if you’re human:{" "}
                                        <input name="bot-field" />
                                    </label>
                                </p>

                                <label>
                                    Name:
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={e =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        required
                                    />
                                </label>
                                <label>
                                    Email:
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={e =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        required
                                    />
                                </label>
                                <label>
                                    Phone:
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={e =>
                                            setFormData({ ...formData, phone: e.target.value })
                                        }
                                    />
                                </label>
                                <label>
                                    Message:
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={e =>
                                            setFormData({ ...formData, message: e.target.value })
                                        }
                                    />
                                </label>

                                <div className="form-actions">
                                    <button type="submit">Send Request</button>
                                    <button
                                        type="button"
                                        onClick={() => setShowBookingForm(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {/* <img data-aos="fade-right" className='fullImage' src={image} /> */}
            </div>
        </section >
    )
}