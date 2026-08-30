import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Skills.css';

const Skills = () => {
    const [sectionRef, isSectionVisible] = useScrollReveal({ threshold: 0.1 });
    const [selectedSkill, setSelectedSkill] = useState(null);

    const marqueeRows = [
        {
            direction: 'forward',
            skills: [
                { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', category: 'Languages', level: 'Expert', experience: '3+ Years', description: 'Primary backend language. FastAPI/Django development, RBAC, payment integrations and scalable API design at Codeholic IT Service.' },
                { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', category: 'Backend', level: 'Expert', experience: '2+ Years', description: 'Built 15+ scalable REST APIs with FastAPI, async handling, validation and high-traffic optimization.' },
                { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', category: 'Backend', level: 'Advanced', experience: '2+ Years', description: 'Django for CRM, inventory and enterprise modules with ORM optimization and secure auth.' },
                { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', category: 'Languages', level: 'Advanced', experience: '2+ Years', description: 'Object-oriented programming, Spring Boot basics and enterprise logic.' },
                { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', category: 'Languages', level: 'Advanced', experience: '2+ Years', description: 'ES6+, async programming and frontend integration with React.' },
                { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', category: 'Backend', level: 'Intermediate', experience: '1+ Year', description: 'Spring Boot for Java backend services and microservice architecture.' },
            ]
        },
        {
            direction: 'reverse',
            skills: [
                { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', category: 'Frontend', level: 'Advanced', experience: '2+ Years', description: 'React for frontend integration with backend APIs, component architecture and state handling.' },
                { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', category: 'Backend', level: 'Intermediate', experience: '1+ Year', description: 'Express.js for Node-based services and REST API development.' },
                { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', category: 'Backend', level: 'Intermediate', experience: '1+ Year', description: 'Node.js runtime for scalable backend services.' },
                { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', category: 'Frontend', level: 'Advanced', experience: '3+ Years', description: 'Semantic HTML and portfolio UI structure.' },
                { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', category: 'Frontend', level: 'Advanced', experience: '3+ Years', description: 'Modern layouts, Flex/Grid and responsive design.' },
                { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', category: 'Database', level: 'Intermediate', experience: '1+ Year', description: 'Redis for caching, real-time inventory sync and performance boost.' },
            ]
        },
        {
            direction: 'forward',
            skills: [
                { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', category: 'Database', level: 'Expert', experience: '2+ Years', description: 'Schema design and complex query optimization for enterprise workloads.' },
                { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', category: 'Database', level: 'Advanced', experience: '2+ Years', description: 'Relational DB management, joins and query tuning for CRM/e-commerce.' },
                { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', category: 'Database', level: 'Advanced', experience: '2+ Years', description: 'NoSQL design for flexible document storage and product catalogs.' },
                { name: 'SQL', icon: 'https://img.icons8.com/color/48/sql.png', category: 'Database', level: 'Advanced', experience: '3+ Years', description: 'Complex queries, indexing and schema optimization across projects.' },
            ]
        },
        {
            direction: 'reverse',
            skills: [
                { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', category: 'DevOps', level: 'Expert', experience: '3+ Years', description: 'Version control, Gitflow and collaborative workflows on GitHub.' },
                { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', category: 'DevOps', level: 'Expert', experience: '3+ Years', description: 'Repository management, CI basics and portfolio hosting.' },
                { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', category: 'DevOps', level: 'Advanced', experience: '1+ Year', description: 'Containerization for FastAPI/Django services and local dev environments.' },
                { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', category: 'Tools', level: 'Advanced', experience: '2+ Years', description: 'Linux server management, deployment and shell workflows.' },
                { name: 'REST APIs', icon: 'https://img.icons8.com/color/48/api-settings.png', category: 'Backend', level: 'Expert', experience: '2+ Years', description: 'Designed 15+ RESTful APIs with RBAC, pagination and payment integrations.' },
                { name: 'Postman', icon: 'https://img.icons8.com/dusk/48/postman-api.png', category: 'Tools', level: 'Expert', experience: '2+ Years', description: 'API testing, collections and documentation for backend verification.' },
            ]
        }
    ];

    const MarqueeRow = ({ skills, direction }) => {
        // Double the skills for seamless loop
        const doubledSkills = [...skills, ...skills];

        return (
            <div className={`marquee-row ${direction === 'reverse' ? 'reverse' : ''}`}>
                <div className="marquee-track">
                    {doubledSkills.map((skill, index) => (
                        <div
                            key={index}
                            className="skill-bubble"
                            onClick={() => setSelectedSkill(skill)}
                        >
                            <img src={skill.icon} alt={skill.name} />
                            <span className="skill-name">{skill.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <section
            id="skills"
            className={`section skills-section reveal ${isSectionVisible ? 'active' : ''}`}
            ref={sectionRef}
        >
            <div className="container">
                <h2 className="section-title">Skills & Expertise</h2>

                <div className="skills-layout-wrapper">
                    <div className="skills-visual">
                        <div className="visual-card glass-card">
                            <img
                                src="https://i.pinimg.com/originals/54/1f/1c/541f1c2e739aac67a89026fe0def22eb.gif"
                                alt="Creative Visual"
                                className="pinterest-gif"
                            />
                            <div className="visual-overlay"></div>
                        </div>
                    </div>

                    <div className="skills-marquee-container">
                        {marqueeRows.map((row, index) => (
                            <MarqueeRow
                                key={index}
                                skills={row.skills}
                                direction={row.direction}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Reactive Detail Overlay */}
            <div
                className={`reactive-detail-overlay ${selectedSkill ? 'active' : ''}`}
                onClick={() => setSelectedSkill(null)}
            >
                {selectedSkill && (
                    <div className="detail-content" onClick={(e) => e.stopPropagation()}>
                        <i
                            className="bx bx-x close-detail"
                            onClick={() => setSelectedSkill(null)}
                        ></i>

                        <div className="detail-header">
                            <img src={selectedSkill.icon} alt={selectedSkill.name} className="detail-icon" />
                            <div className="detail-info">
                                <span className="detail-category">{selectedSkill.category}</span>
                                <h2>{selectedSkill.name}</h2>
                            </div>
                        </div>

                        <div className="detail-body">
                            <p>{selectedSkill.description}</p>

                            <div className="skill-stats">
                                <div className="stat-item">
                                    <span className="stat-label">Proficiency</span>
                                    <span className="stat-value">{selectedSkill.level}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Experience</span>
                                    <span className="stat-value">{selectedSkill.experience}</span>
                                </div>
                            </div>

                            <div className="detail-actions">
                                <a 
                                    href="#projects" 
                                    className="see-projects-btn" 
                                    onClick={() => setSelectedSkill(null)}
                                >
                                    <span>Explore Projects</span>
                                    <i className='bx bx-right-arrow-alt'></i>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Skills;
