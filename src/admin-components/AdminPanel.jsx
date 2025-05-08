import React, { useState, useEffect } from "react";
import AvailabilityForm from "./AvailabilityForm";
import AvailabilityList from "./AvailabilityList";
import { supabase } from "../supabaseClient";

export default function AdminPanel() {
    const [availability, setAvailability] = useState([]);

    useEffect(() => {
        fetchAvailability();
    }, []);

    async function fetchAvailability() {
        const { data, error } = await supabase
            .from("availability")
            .select("*")
            .order("date", { ascending: true });
        if (!error) setAvailability(data);
    }

    return (
        <div className="admin-panel">
            <h1>Manage Availability</h1>
            <AvailabilityForm onNewSlot={fetchAvailability} />
            <AvailabilityList
                availability={availability}
                onChange={fetchAvailability}
            />
        </div>
    );
}
