import React from 'react'
import ReactDOM from 'react-dom'
import { SocialIcon } from 'react-social-icons'

export default function ContactSection() {
    return (
        <section id="contact" >
            <div >
                <h1 >Contact</h1>
                <p >Get in touch for bookings or inquiries.</p>
                <p>Email: <a href="mailto:qb.beauty.official@gmail.com">qb.beauty.official@gmail.com</a></p>
                <p>or use this form:</p>
                <form className='contact-form' >
                    <input type="text" placeholder="Your Name" />
                    <input type="email" placeholder="Your Email" />
                    <textarea placeholder="Your Message"></textarea>
                    <button type="submit">Send Message</button>
                </form>
                <p>Follow us on socials!</p>
                <SocialIcon url='https://www.instagram.com/qb.beauty.official/' />
            </div>
        </section>
    );
}