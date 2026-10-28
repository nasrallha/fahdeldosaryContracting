import React from 'react';
import { Star, Building } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import './Clients.css';

const Clients = () => {
  const { t } = useLanguage();

  const partners = t('clients.partners') || [];
  // Double partners list for infinite scroll loop
  const doublePartners = [...partners, ...partners];

  const testimonials = t('clients.list') || [];

  const cardContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="section clients-section" id="clients">
      <div className="glow-effect" style={{ top: '30%', right: '10%' }}></div>
      
      <div className="container">
        <h2 className="section-title">{t('clients.title')}</h2>
        <p className="section-subtitle">
          {t('clients.subtitle')}
        </p>
      </div>

      {/* Infinite Scroll Logo Marquee */}
      <div className="logo-marquee-container" id="logo-marquee-scroller">
        <div className="logo-track">
          {doublePartners.map((partner, idx) => (
            <div className="logo-item" key={idx}>
              <span className="logo-item-icon"><Building size={20} /></span>
              <span>{partner}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        {/* Testimonials */}
        <motion.div 
          className="testimonials-grid"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* {Array.isArray(testimonials) && testimonials.map((test, index) => (
            <motion.div 
              className="testimonial-card glass-panel" 
              key={index}
              variants={cardVariants}
              id={`testimonial-card-${index}`}
            >
              <div className="testimonial-stars">
                {[...Array(5)].map((_, sIdx) => (
                  <Star key={sIdx} size={16} fill="var(--primary)" color="var(--primary)" />
                ))}
              </div>
              <p className="testimonial-quote">"{test.quote}"</p>
              
              <div className="testimonial-user">
                <div className="testimonial-avatar">
                  {test.initials}
                </div>
                <div className="testimonial-info">
                  <span className="testimonial-name">{test.name}</span>
                  <span className="testimonial-role">{test.role}</span>
                </div>
              </div>
            </motion.div>
          ))} */}
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;

