import example_1 from '../assets/qb_example_01.jpg'
import example_2 from '../assets/qb_example_03.jpg'
import example_3 from '../assets/qb_example_02.jpg'
import example_4 from '../assets/qb_example_04_nude.jpg'


export default function Examples() {
    return (
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
    )

}