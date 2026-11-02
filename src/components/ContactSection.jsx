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
                <p>Get in touch to discuss your beauty needs.</p>
                <p>Email: <a href="mailto:qb.beauty.official@gmail.com">qb.beauty.official@gmail.com</a></p>

            </div>
        </section>
    );
}