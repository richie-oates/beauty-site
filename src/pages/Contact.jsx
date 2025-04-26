import React from 'react';

function Contact() {
    return (
        <section>
            <h1>Contact Us</h1>
            <p>Get in touch for bookings or inquiries.</p>
            <form>
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Your Email" />
                <textarea placeholder="Your Message"></textarea>
                <button type="submit">Send Message</button>
            </form>
        </section>
    );
}

export default Contact;