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
            <div className="impact-image-container">
                <img className="impact-image" src={select_image()} />
            </div>
            <div class="section-body">
                <h1 >Welcome to QB Beauty</h1>
                <p >Your beauty, our passion.</p>
                <p>Explore our services and book your appointment today!</p>
                <img className="main-logo" src={logo}></img>
            </div>
        </section>
    );
}