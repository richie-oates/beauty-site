export default function ContactSection() {
    return (
        <section id="contact" >
            <div >
                <h1 >Contact</h1>
                <p >Get in touch for bookings or inquiries.</p>
                <p>email: qb.beauty.official@gmail.com</p>
                <p>or use this form:</p>
                <form className='contact-form' >
                    <input type="text" placeholder="Your Name" />
                    <input type="email" placeholder="Your Email" />
                    <textarea placeholder="Your Message"></textarea>
                    <button type="submit">Send Message</button>
                </form>
                <p>Follow us on social media!</p>
            </div>
        </section>
    );
}