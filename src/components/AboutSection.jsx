import jess from '../assets/jess.jpg'

export default function AboutSection() {
    return (
        <section id="about" >
            <div className="section-body" >
                <h1 data-aos="fade-right" >About</h1>
                <div data-aos="fade-zoom-in" data-aos-anchor-placement="center-bottom" className="profile-image-container">
                    <img src={jess} className="profile-image" />
                </div>
                <p data-aos="fade-right" >My name's Jess, I'm the makeup artist behind Queen Bee Beauty, based in Sheffield.</p>
                <p data-aos="fade-right" >I specialise in all types of glam makeup e.g soft glam, full glam, dewy and nude looks.</p>
                <p data-aos="fade-right" >Prices are £15-£20 (cash only).</p>
                <p data-aos="fade-right" >Appointments available on Saturdays.</p>
                <p data-aos="fade-right" >Please leave me a dm or message me to book and discuss your needs.</p>
            </div>
        </section>
    );
}