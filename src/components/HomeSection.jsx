import logo from '../assets/qb_logo.jpg'

import makeup_s from '../assets/makeup_02_small.jpg'
import makeup_m from '../assets/makeup_02_med.jpg'
import makeup_l from '../assets/makeup_02_large.jpg'
import demo_vid from '../assets/demo_vid_boomerang_cropped.mp4'

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
                <p data-aos="fade-right" data-aos-delay="800" >Your <b>beauty</b>, our <b>passion</b>.</p>
                <p data-aos="fade-right" data-aos-delay="1600">Explore our <a href='#services'>services</a> and <a href='#contact'>book</a> your appointment today!</p>
                {/* <img data-aos="fade-up" data-aos-delay="2400" className="main-logo" src={logo}></img> */}
                <div data-aos="zoom-in-up" data-aos-delay="1800" className='video-container'>
                    <video className='demo-video'
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source src={demo_vid} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>

        </section>
    );
}