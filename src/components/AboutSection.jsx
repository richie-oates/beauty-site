import jess from '../assets/jess.jpg'

export default function AboutSection() {
    return (
        <section id="about" >
            <div className="section-body" >
                <h1 data-aos="fade-right" >About</h1>
                <div data-aos="fade-zoom-in" data-aos-anchor-placement="center-bottom" className="profile-image-container">
                    <img src={jess} className="profile-image" />
                </div>
                <p data-aos="fade-right" >My name is <b>Jess</b>, I'm the makeup artist behind <b>QB Beauty</b>, based in Sheffield.</p>
                <p data-aos="fade-right" >I'm <b>passionate</b> about all types of <b>glam</b> makeup e.g <b>soft glam</b>, <b>full glam</b>, <b>dewy</b> and <b>nude</b> looks.</p>
                <p data-aos="fade-right" >Prices are £15-£20 (cash only).</p>
                <p data-aos="fade-right" >Appointments available on <b>Saturdays</b>.</p>
                <p data-aos="fade-right" ><a href='#contact'>Contact</a> me to book and discuss your needs.</p>
            </div>
        </section>
    );
}