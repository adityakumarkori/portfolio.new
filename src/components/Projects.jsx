import { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Loader from './Loader';
import './Projects.css';

const Projects = () => {
    const [filter, setFilter] = useState('top');
    const [isFiltering, setIsFiltering] = useState(false);
    const [isExpanding, setIsExpanding] = useState(false);
    const [projects, setProjects] = useState([]);

    const handleFilterChange = (newFilter) => {
        if (filter === newFilter) return;
        setIsFiltering(true);
        setTimeout(() => {
            setFilter(newFilter);
            setShowAll(false);
            setIsFiltering(false);
        }, 300); // 300ms smooth transition
    };

    const handleExpand = () => {
        setIsExpanding(true);
        setTimeout(() => {
            setShowAll(true);
            setIsExpanding(false);
        }, 800); // 800ms duration based on animation
    };
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [sectionRef, isSectionVisible] = useScrollReveal({ threshold: 0.1 });

    useEffect(() => {
        // Fetch projects from JSON file
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const response = await fetch('/projects.json');
                if (!response.ok) {
                    throw new Error('Failed to load projects');
                }
                const data = await response.json();
                
                // Store the original projects array
                setProjects(data.projects || []);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error('Error loading projects:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Filter and sort projects based on selected category
    const getProcessedProjects = () => {
        let processed = [...projects];

        if (filter === 'top') {
            // Featured Selection: Filter by 'top' category and sort by manual rank
            processed = processed
                .filter(p => Array.isArray(p.category) ? p.category.includes('top') : p.category === 'top')
                .sort((a, b) => {
                    const rankA = a.rank !== undefined ? a.rank : 999;
                    const rankB = b.rank !== undefined ? b.rank : 999;
                    return rankA - rankB;
                });
        } else if (filter === 'new') {
            // Recent Updates: Last added first (reverse array order), limit to 6
            processed = [...processed].reverse();
            // Note: slicing to 6 is handled by visibleProjects logic below
        } else if (filter === 'all') {
            // Full Archive: Firstly added first (original array order/position)
            processed = processed.sort((a, b) => (a.position || 0) - (b.position || 0));
        }

        return processed;
    };

    const filteredProjects = getProcessedProjects();

    // Limit visible projects initially to 6
    const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);
    const currentYear = new Date().getFullYear();
    
    return (
        <section
            id="projects"
            className={`section projects-section reveal ${isSectionVisible ? 'active' : ''}`}
            ref={sectionRef}
        >
            <div className="container projects-container">
                {/* Modern Section Header */}
                <div className="section-header">
                    <span className="section-tag">Portfolio Exhibit {currentYear}</span>
                    <h2 className="section-title">Selected Case Studies</h2>
                    <p className="section-subtitle">
                        A curation of technical architectures and digital experiences, bridging the gap between high-performance engineering and intuitive design.
                    </p>
                </div>

                {/* Categories / Filter Tabs */}
                <div className="filters-wrapper">
                    <button
                        className={`filter-btn ${filter === 'top' ? 'active' : ''}`}
                        onClick={() => handleFilterChange('top')}
                    >
                        Featured Selection
                    </button>
                    <button
                        className={`filter-btn ${filter === 'new' ? 'active' : ''}`}
                        onClick={() => handleFilterChange('new')}
                    >
                        Recent Updates
                    </button>
                    <button
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => handleFilterChange('all')}
                    >
                        Full Archive
                    </button>
                </div>

                {/* Loading / Error States */}
                {loading && (
                    <div className="state-container">
                        <Loader />
                        <div className="state-text">Synchronizing Assets...</div>
                    </div>
                )}
                
                {error && (
                    <div className="state-container error">
                        <div className="state-text">Error: {error}</div>
                    </div>
                )}

                {/* Main Grid */}
                {!loading && !error && (
                    <div className="projects-grid">
                        {isFiltering ? (
                            <div className="selection-loader-container">
                                <Loader />
                            </div>
                        ) : visibleProjects.length > 0 ? (
                            visibleProjects.map((project, index) => (
                                <div
                                    key={project.id}
                                    className="project-card"
                                    style={{ '--card-index': index % 6 }}
                                >
                                    <div className="project-image-container">
                                        <img 
                                            src={project.image} 
                                            alt={project.title} 
                                            className="project-image" 
                                            loading="lazy" 
                                        />
                                        <div className="project-overlay">
                                            <div className="overlay-content">
                                                <h3 className="overlay-title">{project.title}</h3>
                                                <div className="project-links">
                                                    {project.demo && (
                                                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link primary">
                                                            <i className='bx bx-play-circle'></i>
                                                            <span>Preview</span>
                                                        </a>
                                                    )}
                                                    {project.github && (
                                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link secondary">
                                                            <i className='bx bxl-github'></i>
                                                            <span>Code</span>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="project-info">
                                        <div className="project-meta">
                                            <span className="project-category-tag">
                                                {(Array.isArray(project.category) ? project.category[0] : project.category)
                                                    .replace('top', 'Featured')
                                                    .replace('new', 'New')
                                                    .replace('all', 'Archive')}
                                            </span>
                                            <span className="project-position-id">
                                                No. {project.position < 10 ? `0${project.position}` : project.position}
                                            </span>
                                        </div>
                                        <h3 className="project-card-title">{project.title}</h3>
                                        <p className="project-card-desc">{project.description}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="state-container empty">
                                <p className="state-text">No projects found for this selection.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Expand / Collapse Logic */}
                {filteredProjects.length > 6 && !loading && !error && (
                    <div className="expand-wrapper">
                        {!showAll ? (
                            isExpanding ? (
                                <Loader />
                            ) : (
                                <button className="expand-button" onClick={handleExpand}>
                                    <span>Explore Collection</span>
                                    <i className='bx bx-chevron-down'></i>
                                </button>
                            )
                        ) : (
                            <button className="expand-button" onClick={() => {
                                setShowAll(false);
                                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                            }}>
                                <span>Show Less</span>
                                <i className='bx bx-chevron-up'></i>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
