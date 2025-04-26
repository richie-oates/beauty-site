import logo from '../assets/qb_logo.jpg'
import example_1 from '../assets/qb_example_01.jpg'
import example_2 from '../assets/qb_example_02.jpg'

export default function HomeSection() {
    return (
        <section id="home" >
            <div >
                <img className="main-logo" src={logo}></img>
                <h1 >Welcome to QB Beauty</h1>
                <p >Your beauty, our passion. Explore our services and book your appointment today!</p>
            </div>
            <div className="example-images">
                <div className='example-image-container'>
                    <img className="example-image" src={example_1} />
                </div>
                <div className='example-image-container'>
                    <img className="example-image" src={example_2} />
                </div>
            </div>
        </section>
    );
}