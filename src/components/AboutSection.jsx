import jess from '../assets/jess.jpg'
import jess2 from '../assets/jess2.jpg'

export default function AboutSection() {
    return (
        <section id="about" >
            <div className="section-body" >
                <div className='responsive-content'>
                    <div className='media-content'>
                        <div className='jess2-image-container' >
                            <img src={jess2} className="example-image jess2-image" />
                        </div>
                    </div>
                    <div className='text-content'>

                        <a href='#about'><h1 data-aos="fade-left" data-aos-anchor-placement="bottom-bottom" >About Me</h1></a>
                        <p data-aos="fade-left" >My name is <b>Jess</b>, I'm the makeup artist behind <b>QB Beauty</b>, based in Sheffield.</p>
                        <p data-aos="fade-left" >I'm passionate about all types of <b>glam</b> makeup; <b>soft glam</b>, <b>full glam</b>, <b>dewy</b> and <b>nude</b> looks.</p>
                        <p data-aos="fade-left">I also offer classic lashes <a href='#services'>services</a>.</p>
                        <p data-aos="fade-left" ><a href='#services'>Appointments</a> can be requested through the booking form</p>
                        <p data-aos="fade-left" ><a href='#contact'>Contact</a> me directly for general enquiries.</p>

                    </div>
                </div>
                <div data-aos="zoom-in" data-aos-anchor-placement="center-bottom" className="profile-image-container">
                    <img src={jess} className="profile-image" />
                </div>

            </div>
        </section >
    );
}