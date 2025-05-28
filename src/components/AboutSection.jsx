import jess from '../assets/jess.jpg'

export default function AboutSection() {
    return (
        <section id="about" >
            <div className="section-body" >
                <div className='responsive-content'>
                    <div className='media-content'>
                        <div data-aos="zoom-in" data-aos-anchor-placement="center-bottom" className="profile-image-container">
                            <img src={jess} className="profile-image" />
                        </div>
                    </div>
                    <div className='text-content'>
                        <a href='#about'><h1 data-aos="fade-right" data-aos-anchor-placement="bottom-bottom" >About Me</h1></a>
                        <p data-aos="fade-right" >My name is <b>Jess</b>, I'm the makeup artist behind <b>QB Beauty</b>, based in Sheffield.</p>
                        <p data-aos="fade-right" >I offer all types of <b>glam</b> makeup e.g <b>soft glam</b>, <b>full glam</b>, <b>dewy</b> and <b>nude</b> looks. As well as classic lashes <a href='#services'>services</a>.</p>
                        {/* TODO: Include this line after setting up booking functionality */}
                        {/* <p data-aos="fade-right" ><a href='#services'>Appointments</a> can be requested through the booking form</p> */}
                        <p data-aos="fade-right" ><a href='#contact'>Contact</a> me directly for general enquiries.</p>
                    </div>
                </div>
            </div>
        </section >
    );
}