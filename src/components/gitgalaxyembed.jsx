import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SITE_CONFIG } from '../config';
import './GitGalaxyEmbed.css';

const GitGalaxyEmbed = ({ username = SITE_CONFIG.githubUsername, height = 600 }) => {
  const [sectionRef, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section 
      id="galaxy" 
      ref={sectionRef}
      className={`galaxy-section reveal ${isVisible ? 'active' : ''}`}
    >
      <div className="container galaxy-container">
        <div className="galaxy-header">
          <h2 className="section-title">
            <span className="gradient-text">Git Galaxy</span> Profile <i className='bx bx-planet' style={{ fontSize: '0.9em', verticalAlign: 'middle', color: 'var(--primary)' }}></i>
          </h2>
        </div>
        
        <div className="galaxy-frame glass-card">
          <div className="galaxy-iframe-wrapper" style={{ height: `${height}px` }}>
            <iframe
              src={`https://gitgalaxy.netlify.app/${username}?embed=true`}
              width="100%"
              height="100%"
              style={{ border: 'none', display: 'block' }}
              allow="accelerometer; gyroscope"
              title={`${username}'s Git Galaxy`}
            />
          </div>
        </div>

        <div className="galaxy-footer">
          <p className="galaxy-caption">
            Powered by <span className="gradient-text">Git Galaxy API</span> 
          </p>
          <a 
            href={`https://gitgalaxy.netlify.app/${username}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <i className='bx bx-rocket'></i>
            Launch Full Explorer
          </a>
        </div>
      </div>
    </section>
  );
};

export default GitGalaxyEmbed;
