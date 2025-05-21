import example_1 from '../assets/qb_example_01.jpg'
import example_2 from '../assets/qb_example_03.jpg'
import example_3 from '../assets/qb_example_02.jpg'
import example_4 from '../assets/qb_example_04_nude.jpg'

export default function ServicesSection() {
    return (
        <section id="services" >
            <div className="section-body">
                <a href='#services'><h1 data-aos="fade-right" >Services</h1></a>
                <div className='responsive-content' styles="width:90%">
                    <div className="text-column box-shadow" data-aos="fade-right">
                        <h2>Makeup</h2>
                        <ul className="services-list">
                            <li>Soft Glam</li>
                            <li>Full Glam</li>
                            <li>Dewy look</li>
                            <li>Nude look</li>
                        </ul>
                    </div>
                    <div className="text-column box-shadow" data-aos="fade-right">
                        <h2>Lashes</h2>
                        <ul className="services-list">
                            <li>Classic lashes</li>
                            <li>Classic lash infills</li>
                            <li>Classic lash removal</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <div className="example-images">
                        <div data-aos="fade-right" className='example-image-container'>
                            <img id="soft-glam" className="example-image" src={example_1} />
                            <div className="example-image-label">
                                <p>Soft Glam</p>
                            </div>
                        </div>
                        <div data-aos="fade-right" className='example-image-container'>
                            <img className="example-image" src={example_2} />
                            <div className="example-image-label">
                                <p>Full Glam</p>
                            </div>
                        </div>
                        <div data-aos="fade-right" className='example-image-container'>
                            <img className="example-image" src={example_3} />
                            <div className="example-image-label">
                                <p>Nude Look</p>
                            </div>
                        </div>
                        <div data-aos="fade-right" className='example-image-container'>
                            <img className="example-image" src={example_4} />
                            <div className="example-image-label">
                                <p>Nude Look</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}