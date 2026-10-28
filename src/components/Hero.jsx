import React from 'react';
import { ArrowLeft, ClipboardList, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import heroExcavator from '../assets/hero.jpeg';
import './Hero.css';

const Hero = () => {
  const { language, t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const stats = t('hero.stats') || [];

  return (
    <section className="hero-section" id="hero">
      <div className="hero-geometric-1"></div>
      <div className="hero-geometric-2"></div>
      
      <div className="container">
        <div className="hero-grid">
          
          {/* Right Column: Content */}
          <motion.div 
            className="hero-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="hero-tagline" variants={itemVariants}>
              <span className="hero-tagline-dot"></span>
              <span>{t('hero.tagline')}</span>
            </motion.div>
            
            <motion.h1 className="hero-title" variants={itemVariants}>
              {t('hero.title')}<br />
              <span>{t('hero.titleSpan')}</span>
            </motion.h1>
            
            <motion.p className="hero-description" variants={itemVariants}>
              {t('hero.description')}
            </motion.p>
            
            <motion.div className="hero-buttons" variants={itemVariants}>
              <button 
                onClick={() => scrollToSection('equipments')} 
                className="btn btn-primary"
                id="hero-cta-explore"
              >
                {t('hero.ctaExplore')}
                <ArrowLeft 
                  size={18} 
                  style={language === 'ar' ? { marginRight: '4px' } : { marginLeft: '4px', transform: 'rotate(180deg)' }} 
                />
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="btn btn-secondary"
                id="hero-cta-consult"
              >
                {t('hero.ctaConsult')}
              </button>
            </motion.div>
            
            <motion.div className="hero-stats" variants={itemVariants}>
              {Array.isArray(stats) && stats.map((stat, index) => (
                <div className="hero-stat-card" key={index}>
                  <div className="hero-stat-number">{stat.value}</div>
                  <div className="hero-stat-label">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Left Column: Visual */}
          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.8, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.4 }}
          >
            <div className="hero-image-wrapper">
              <div className="hero-bg-glow"></div>
              <motion.img 
                src={heroExcavator} 
                alt={t('hero.tagline')} 
                className="hero-image"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                id="hero-excavator-image"
              />
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;

