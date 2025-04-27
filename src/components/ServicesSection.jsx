import example_1 from '../assets/qb_example_01.jpg'
import example_2 from '../assets/qb_example_03.jpg'

export default function ServicesSection() {
    return (
        <section id="services" >
            <div >
                <h1 >Makeup Services</h1>
                <ul className="services-list">
                    <li>Soft Glam</li>
                    <li>Full Glam</li>
                    <li>Dewy look</li>
                    <li>Nude look</li>
                    {/* Add more services here */}
                </ul>
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