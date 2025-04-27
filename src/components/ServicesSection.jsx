import example_1 from '../assets/qb_example_01.jpg'
import example_2 from '../assets/qb_example_03.jpg'

export default function ServicesSection() {
    return (
        <section id="services" >
            <div >
                <h1 data-aos="fade-right" >Makeup Services</h1>
                <ul className="services-list">
                    <li data-aos="fade-right" >Soft Glam</li>
                    <li data-aos="fade-right" >Full Glam</li>
                    <li data-aos="fade-right" >Dewy look</li>
                    <li data-aos="fade-right" >Nude look</li>
                    {/* Add more services here */}
                </ul>
            </div>
            <div>
                <div data-aos="fade-zoom-in" className="example-images">
                    <div className='example-image-container'>
                        <img id="soft-glam" className="example-image" src={example_1} />
                        <div className="example-image-label">
                            <p>Soft Glam</p>
                        </div>
                    </div>
                    <div data-aos="fade-zoom-in" className='example-image-container'>
                        <img className="example-image" src={example_2} />
                        <div className="example-image-label">
                            <p>Full Glam</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}