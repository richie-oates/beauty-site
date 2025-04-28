import React from 'react'
import ReactDOM from 'react-dom'
import image from '../assets/availability.jpg'

export default function AvailabilitySection() {
    return (
        <section id="availability" >
            <div className="section-body">
                <h1 data-aos="fade-right" data-aos-anchor-placement="bottom-bottom" >Availability</h1>
                <img data-aos="fade-right" className='fullImage' src={image} />
            </div>
        </section >
    )
}