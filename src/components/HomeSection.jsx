import logo from '../assets/qb_logo.jpg'
import example_1 from '../assets/qb_example_01.jpg'
import example_2 from '../assets/qb_example_02.jpg'
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
            <div >
                <img className="main-logo" src={logo}></img>
                <h1 >Welcome to QB Beauty</h1>
                <p >Your beauty, our passion.</p>
                <p>Explore our services and book your appointment today!</p>
            </div>
            <div>
                <div className="example-images">
                    <div className='example-image-container'>
                        <img className="example-image" src={example_1} />
                    </div>
                    <div className='example-image-container'>
                        <img className="example-image" src={example_2} />
                    </div>
                </div>
            </div>

        </section>
    );
}