import React from 'react';
import { Award, ShieldAlert, BadgePercent, Users2, MapPin, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import './ChooseUs.css';

const ChooseUs = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const icons = [
    <ShieldAlert size={30} />,
    <Award size={30} />,
    <BadgePercent size={30} />,
    <Users2 size={30} />,
    <MapPin size={30} />,
    <Gauge size={30} />
  ];

  const reasons = t('chooseUs.reasons') || [];

  return (
    <section className="section choose-us-section" id="choose-us">
      <div className="choose-decor-line"></div>
      
      <div className="container">
        <h2 className="section-title gradient-text">{t('chooseUs.title')}</h2>
        <p className="section-subtitle">
          {t('chooseUs.subtitle')}
        </p>

        <motion.div 
          className="choose-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {Array.isArray(reasons) && reasons.map((item, index) => (
            <motion.div 
              className="choose-card glass-panel" 
              key={index}
              variants={cardVariants}
              id={`choose-card-${index}`}
            >
              <div className="choose-icon-container">
                {icons[index] || <Award size={30} />}
              </div>
              <h3 className="choose-card-title">{item.title}</h3>
              <p className="choose-card-desc">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ChooseUs;

