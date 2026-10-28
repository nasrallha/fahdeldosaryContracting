import React, { useState } from 'react';
import { Drill, Truck, HardHat, ArrowLeft, Layers,Road  } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

import './Equipments.css';



const categoryIcons = {
  drilling: <Drill size={16} />,
  transport: <Truck size={16} />,
  loading: <HardHat size={16} />,
  paving: <Road size={16} />
};

const Equipments = () => {
  const { language, t, equipments } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleRequestRental = (equipmentName) => {
    // Dispatch event to pre-fill select value in Contact Form
    // Find the closest matching option value in Contact form select
    let selectVal = "الحفارات ومعدات الحفر"; // default fallback
    const lowerName = equipmentName.toLowerCase();
    
    if (lowerName.includes("حفر") || lowerName.includes("rig") || lowerName.includes("excavator")) {
      selectVal = language === 'ar' ? "الحفارات ومعدات الحفر" : "Excavators & Drilling Equipment";
    } else if (lowerName.includes("نقل") || lowerName.includes("truck") || lowerName.includes("trailer")) {
      selectVal = language === 'ar' ? "البلدوزرات ومعدات التمهيد" : "Bulldozers & Grading Equipment";
    } else if (lowerName.includes("شوكية") || lowerName.includes("لودر") || lowerName.includes("forklift") || lowerName.includes("loader")) {
      selectVal = language === 'ar' ? "الرافعات ومعدات الرفع" : "Cranes & Hoisting Equipment";
    }

    const event = new CustomEvent('selectEquipmentCategory', { detail: selectVal });
    window.dispatchEvent(event);

    // Scroll smoothly to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = contactSection.getBoundingClientRect().top;
      window.scrollTo({
        top: elementRect - bodyRect - offset,
        behavior: 'smooth'
      });
    }
  };

  const filteredEquipments = selectedFilter === 'all'
    ? equipments
    : equipments.filter(item => item.category === selectedFilter);

  const filters = [
    { id: 'all', label: t('equipments.filters.all'), icon: <Layers size={16} /> },
    { id: 'drilling', label: t('equipments.filters.drilling'), icon: <Drill size={16} /> },
    { id: 'transport', label: t('equipments.filters.transport'), icon: <Truck size={16} /> },
    { id: 'loading', label: t('equipments.filters.loading'), icon: <HardHat size={16} /> },
    { id: 'paving', label: t('equipments.filters.paving'), icon: <HardHat size={16} /> }
  ];

  return (
    <section className="section equipments-section" id="equipments">
      <div className="equipments-bg-glow-1"></div>
      <div className="equipments-bg-glow-2"></div>
      
      <div className="container">
        <h2 className="section-title gradient-text">{t('equipments.title')}</h2>
        <p className="section-subtitle">{t('equipments.subtitle')}</p>

        {/* Filter Navigation */}
        <div className="equipments-filters" id="equipments-filter-bar">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`filter-btn ${selectedFilter === filter.id ? 'active' : ''}`}
              id={`filter-btn-${filter.id}`}
            >
              {filter.icon}
              <span>{filter.label}</span>
            </button>
          ))}
        </div>

        {/* Equipment Grid */}
        <motion.div 
          layout
          className="equipments-grid"
          id="equipments-grid-container"
        >
          <AnimatePresence mode="popLayout">
            {filteredEquipments.map((item) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="equipment-card glass-panel" 
                key={item.id}
                id={`equipment-card-${item.id}`}
              >
                <div className="equipment-image-container">
                  <img 
                    src={item.image} 
                    alt={item.name[language]} 
                    className="equipment-img"
                    id={`equipment-img-${item.id}`}
                  />
                  <div className="equipment-category-badge">
                    {categoryIcons[item.category]}
                    <span>{t(`equipments.filters.${item.category}`)}</span>
                  </div>
                </div>

                <div className="equipment-card-content">
                  <h3 className="equipment-card-title">{item.name[language]}</h3>
                  <p className="equipment-card-use">{item.use[language]}</p>
                  
                  <button 
                    className="equipment-action-btn"
                    onClick={() => handleRequestRental(item.name[language])}
                    id={`equipment-btn-${item.id}`}
                  >
                    <span>{t('equipments.ctaRequest')}</span>
                    <ArrowLeft 
                      size={16} 
                      style={language === 'ar' ? { marginRight: '4px' } : { marginLeft: '4px', transform: 'rotate(180deg)' }} 
                    />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

    </section>
  );
};

export default Equipments;
