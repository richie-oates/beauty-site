import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleLogin(e) {
        e.preventDefault();
        const { error, user } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) setError(error.message);
        else onLogin();
    }

    return (
        <form onSubmit={handleLogin}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit">Log In</button>
            {error && <p>{error}</p>}
        </form>
    );
}
