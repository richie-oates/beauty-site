import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useSearchParams } from "react-router-dom";
import Login from "./Login";

export default function BookSlotPage() {
    const [searchParams] = useSearchParams();
    const [session, setSession] = useState(null);
    const [message, setMessage] = useState("");

    // Check if logged in
    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
        };

        fetchSession();

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    useEffect(() => {
        if (!session) return;

        const slotId = searchParams.get("id");
        const clientName = searchParams.get("client");

        if (!slotId || !clientName) {
            setMessage("Missing booking information.");
            return;
        }

        async function bookSlot() {
            const { error } = await supabase
                .from("availability")
                .update({ booked: true, client_name: clientName })
                .eq("id", slotId);

            if (error) {
                setMessage("Error booking slot: " + error.message);
            } else {
                setMessage("Slot successfully booked for " + clientName + "!");
            }
        }

        bookSlot();
    }, [searchParams, session]);

    if (!session) return <Login onLogin={() => window.location.reload()} />;

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Booking Confirmation</h1>
            <p>{message}</p>
            <a href='/admin' >Go to to admin panel</a>
        </div>
    );
}
