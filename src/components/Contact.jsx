import { useState } from 'react';
import { CONTACT_SCRIPT_URL } from '../config';
import './Contact.css';
import MessageSentButton from './message-sent-button';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState({ loading: false, message: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, message: '' });

        const scriptURL = CONTACT_SCRIPT_URL;

        // If placeholder, show instructions instead of failing silently
        if (scriptURL.includes('PLACEHOLDER')) {
            setStatus({
                loading: false,
                message: 'Contact form not configured yet. Please email adityakori2003425@gmail.com directly. ✉️'
            });
            setTimeout(() => setStatus({ loading: false, message: '' }), 6000);
            return;
        }

        try {
            const response = await fetch(scriptURL, {
                method: 'POST',
                body: new FormData(e.target)
            });

            if (response.ok) {
                setStatus({
                    loading: false,
                    message: 'Thank you! Your message has been sent successfully. 🎉'
                });
                setFormData({ name: '', email: '', message: '' });

                setTimeout(() => {
                    setStatus({ loading: false, message: '' });
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error!', error.message);
            setStatus({
                loading: false,
                message: 'Oops! Something went wrong. Please try email: adityakori2003425@gmail.com ❌'
            });
        }
    };

    return (
        <section id="contact" className="section contact-section">
            <div className="container">
                <h2 className="section-title">Get In Touch</h2>
                <p className="contact-subtitle">
                    Have a project in mind? Let's work together to create something amazing!
                </p>

                <form className="contact-form glass-card" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your Message"
                            rows="6"
                            required
                            className="form-input"
                        ></textarea>
                    </div>

                    <div className="submit-btn-wrapper">
                        <MessageSentButton 
                            type="submit" 
                            disabled={status.loading || !!status.message} 
                            isActive={status.loading || !!status.message}
                        />
                    </div>

                    {status.message && (
                        <div className="form-message success">
                            {status.message}
                        </div>
                    )}
                    <p style={{textAlign:'center', marginTop:'1rem', fontSize:'0.85rem', color:'var(--text-tertiary)'}}>
                        Or reach me directly: <a href="mailto:adityakori2003425@gmail.com" style={{color:'var(--primary)'}}>adityakori2003425@gmail.com</a> • <a href="tel:+916268572954" style={{color:'var(--primary)'}}>+91-6268572954</a>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Contact;
