import example_1 from '../assets/qb_example_01.jpg'
import example_2 from '../assets/qb_example_03.jpg'
import example_3 from '../assets/qb_example_02.jpg'
import example_4 from '../assets/qb_example_04_nude.jpg'

// import images from "../data/images";

import CustomSlider from "./CustomCarousel";

const images = [
    {
        src: '/src/assets/qb_example_01.jpg',
        imgAlt: "example-image-1",
        text: "Glam"
    },
    {
        src: '/src/assets/qb_example_03.jpg',
        imgAlt: "example-image-2",
        text: "Glam"
    },
    {
        src: '/src/assets/qb_example_02.jpg',
        imgAlt: "example-image-3",
        text: "Glam"
    },
    {
        src: '/src/assets/qb_example_04_nude.jpg',
        imgAlt: "example-image-4",
        text: "Glam"
    },
]

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
            <CustomSlider>
                {images.map((image, index) => {
                    return <img key={index} src={image.src} alt={image.imgAlt} />;
                })}
            </CustomSlider>
        </div>
    )

}