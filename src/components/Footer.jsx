import { TOOLS_URL } from '../constants';
import { SITE_CONFIG } from '../config';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Brand */}
                    <div className="footer-brand">
                        <h2 className="footer-logo gradient-text">Aditya Kumar Kori</h2>
                        <p>Backend Developer crafting scalable APIs & robust systems.</p>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#skills">Skills</a></li>
                            <li><a href="#projects">Projects</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#contact">Contact</a></li>
                            <li>
                                <a href={TOOLS_URL} target="_blank" rel="noopener noreferrer" className="footer-tools-link">
                                    <i className='bx bx-rocket'></i> Tools &amp; Products
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div className="footer-social">
                        <h3>Connect</h3>
                        <div className="social-links">
                            <a href={SITE_CONFIG.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <i className='bx bxl-github'></i>
                            </a>
                            <a href={SITE_CONFIG.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <i className='bx bxl-linkedin-square'></i>
                            </a>
                            <a href={`mailto:${SITE_CONFIG.email}`} aria-label="Email">
                                <i className='bx bx-envelope'></i>
                            </a>
                            <a href={`tel:${SITE_CONFIG.phone}`} aria-label="Phone">
                                <i className='bx bx-phone'></i>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="footer-bottom">
                    <p>© {currentYear} Aditya Kumar Kori — All rights reserved.</p>
                    <p>Built with ❤️ using React & Vite</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
