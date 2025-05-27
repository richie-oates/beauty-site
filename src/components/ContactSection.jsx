import React from 'react'
import ReactDOM from 'react-dom'
import { SocialIcon } from 'react-social-icons'

export default function ContactSection() {
    return (
        <section id="contact" >
            <div className="section-body">
                <a href="#contact"><h1 >Contact</h1></a>
                <p>Find me on facebook and insta!</p>
                <div className='socials'>
                    <SocialIcon className='social-icon' url='https://www.facebook.com/jessica.broxholme.50' />
                    <SocialIcon className='social-icon' url='https://www.instagram.com/qb.beauty.official/' />
                </div>
                <p >Get in touch for bookings or enquiries.</p>
                <p>Email: <a href="mailto:qb.beauty.official@gmail.com">qb.beauty.official@gmail.com</a></p>
                <p>or use this form:</p>
                <form className='contact-form' >
                    <input type="text" placeholder="Your Name" />
                    <input type="email" placeholder="Your Email" />
                    <textarea placeholder="Your Message"></textarea>
                    <button type="submit">Send Message</button>
                </form>

            </div>
        </section>
    );
}