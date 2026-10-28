import React from 'react';
import { ShieldCheck, Flame, Compass, BadgeCheck, Clock, Hammer } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import './About.css';

const About = () => {
  const { t } = useLanguage();

  const scrollRevealVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const icons = [
    <ShieldCheck size={24} />,
    <Clock size={24} />,
    <Flame size={24} />,
    <Compass size={24} />
  ];

  const features = t('about.features') || [];
  const highlights = t('about.highlights') || [];

  return (
    <section className="section about-section" id="about">
      <div className="glow-effect" style={{ top: '20%', left: '10%' }}></div>
      
      <div className="container">
        <div className="about-grid">
          
          {/* Right Column: About Content */}
          <motion.div 
            className="about-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scrollRevealVariants}
          >
            <span className="about-tagline">{t('about.tagline')}</span>
            <h2 className="about-title">
              {t('about.title')}<br />
              <span>{t('about.titleSpan')}</span>
            </h2>
            <p className="about-text">
              {t('about.text')}
            </p>
            
            <div className="about-features">
              {Array.isArray(features) && features.map((item, index) => (
                <div className="about-feature-item" key={index} id={`about-feature-${index}`}>
                  <div className="about-feature-icon-wrapper">
                    {icons[index] || <BadgeCheck size={30} />}
                  </div>
                  <div>
                    <h4 className="about-feature-title">{item.title}</h4>
                    <p className="about-feature-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Left Column: Stats & Highlight Panel */}
          <motion.div 
            className="about-visual"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="about-highlight-card glass-panel" id="about-highlight-card">
              <div className="about-decor-circle"></div>
              
              <h3 className="about-highlight-header">
                <Hammer size={24} style={{ color: 'var(--primary)' }} />
                {t('about.highlightsTitle')}
              </h3>
              
              <div className="about-highlight-list">
                {Array.isArray(highlights) && highlights.map((item, index) => (
                  <div className="about-highlight-item" key={index} id={`about-stat-${index}`}>
                    <div className="about-highlight-label">
                      <BadgeCheck size={18} style={{ color: 'var(--secondary)' }} />
                      <span>{item.label}</span>
                    </div>
                    <div className="about-highlight-value">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default About;

