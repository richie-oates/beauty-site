import logo from '../assets/qb_logo.jpg'

import makeup_s from '../assets/makeup_02_small.jpg'
import makeup_m from '../assets/makeup_02_med.jpg'
import makeup_l from '../assets/makeup_02_large.jpg'
import { useMediaQuery } from 'react-responsive';

function select_image() {
    if (useMediaQuery({ query: '(max-width: 600px' })) return makeup_s
    else return makeup_l
}

export default function HomeSection() {
    return (
        <section id="home" >
            <div data-aos="fade-down" className="impact-image-container">
                <img className="impact-image" src={select_image()} />
            </div>
            <div className="section-body">
                <h1 data-aos="fade-right" >Welcome to QB Beauty</h1>
                <p data-aos="fade-left" >Your beauty, our passion.</p>
                <p data-aos="fade-right">Explore our services and book your appointment today!</p>
                <img data-aos="fade-up" className="main-logo" src={logo}></img>
            </div>
        </section>
    );
}