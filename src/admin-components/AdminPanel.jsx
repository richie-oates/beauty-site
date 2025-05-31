import React, { useState, useEffect } from "react";
import AvailabilityForm from "./AvailabilityForm";
import AvailabilityList from "./AvailabilityList";
import { supabase } from "../supabaseClient";
import Login from "./Login";

import '../styles/Admin.css'
import AdminServices from "./AdminServices";

const ADMIN_EMAILS = ["richoates2020@gmail.com", "qb.beauty.official@gmail.com"];

export default function AdminPanel() {
    const [session, setSession] = useState(null);
    const [availability, setAvailability] = useState([]);

    useEffect(() => {
        // Initial session check
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    async function handleLogout() {
        await supabase.auth.signOut();
        setSession(null);
    }

    useEffect(() => {
        if (session && ADMIN_EMAILS.includes(session.user.email)) {
            fetchAvailability();
        }
    }, [session]);

    async function fetchAvailability() {
        const { data, error } = await supabase
            .from("availability")
            .select("*")
            .order("date", { ascending: true });
        if (!error) setAvailability(data);
    }

    if (!session) return <Login onLogin={() => window.location.reload()} />;

    const userEmail = session.user.email;
    const isAdmin = ADMIN_EMAILS.includes(userEmail);

    if (!isAdmin) {
        return <p>Access denied. You do not have permission to view this page.</p>;
    }

    return (
        <div className="admin-panel">
            <header className="admin-header">
                <button onClick={handleLogout}>Log Out</button>
                <button onClick={() => location.href = '/'}>Go to Main Site</button>


            </header>

            <h1>QBBeauty Site Admin</h1>
            <div className="admin-user-info">
                Logged in as: <strong>{session.user.email}</strong>
            </div>
            <AvailabilityForm onNewSlot={fetchAvailability} />
            <AvailabilityList
                availability={availability}
                onChange={fetchAvailability}
            />
            <AdminServices />
        </div>
    );
}
