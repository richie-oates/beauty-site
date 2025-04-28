import React from 'react'
import ReactDOM from 'react-dom'
import { SocialIcon } from 'react-social-icons'

export default function ContactSection() {
    return (
        <section id="contact" >
            <div className="section-body">
                <h1 data-aos="fade-right" data-aos-anchor-placement="bottom-bottom" >Contact</h1>
                <p >Get in touch for bookings or inquiries.</p>
                <p>Email: <a href="mailto:qb.beauty.official@gmail.com">qb.beauty.official@gmail.com</a></p>
                <p>or use this form:</p>
                <form className='contact-form' >
                    <input type="text" placeholder="Your Name" />
                    <input type="email" placeholder="Your Email" />
                    <textarea placeholder="Your Message"></textarea>
                    <button type="submit">Send Message</button>
                </form>
                <p>Find me on facebook and insta!</p>
                <div className='socials'>
                    <SocialIcon url='https://www.facebook.com/jessica.broxholme.50' />
                    <SocialIcon url='https://www.instagram.com/qb.beauty.official/' />
                </div>
            </div>
        </section>
    );
}