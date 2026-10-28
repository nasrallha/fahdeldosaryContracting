import React, { useState } from 'react';
import { HardHat, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import projectDesert from '../assets/project_desert.png';
import projectCity from '../assets/project_city.png';
import './Projects.css';

const Projects = () => {
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState('all');

  const filterItems = [
    { id: 'all', label: t('projects.filters.all') },
    { id: 'infrastructure', label: t('projects.filters.infrastructure') },
    { id: 'transport', label: t('projects.filters.transport') },
    { id: 'energy', label: t('projects.filters.energy') },
  ];

  const projectsData = t('projects.list') || [];
  const projectImages = [projectDesert, projectCity, projectDesert, projectCity];

  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(proj => proj.category === filter);

  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <h2 className="section-title gradient-text">{t('projects.title')}</h2>
        <p className="section-subtitle">{t('projects.subtitle')}</p>

        {/* Filters */}
        <div className="projects-filters" id="projects-filters-list">
          {filterItems.map(item => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              className={`filter-btn ${filter === item.id ? 'active' : ''}`}
              id={`project-filter-btn-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Grid Container */}
        <motion.div 
          className="projects-grid"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const projectImage = projectImages[idx % projectImages.length];
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="project-card"
                  id={`project-card-${project.id}`}
                >
                  <div className="project-img-wrapper">
                    <img src={projectImage} alt={project.title} className="project-image" />
                    <div className="project-overlay">
                      <span className="project-tag">{project.tag}</span>
                      <h3 className="project-card-title">{project.title}</h3>
                      <p className="project-card-desc">{project.desc}</p>
                      
                      <div className="project-meta">
                        <div className="project-meta-item">
                          <HardHat size={16} style={{ color: 'var(--primary)' }} />
                          <span>{language === 'ar' ? 'الأسطول:' : 'Fleet:'}</span> {project.machinery}
                        </div>
                        <div className="project-meta-item">
                          <Calendar size={16} style={{ color: 'var(--primary)' }} />
                          <span>{language === 'ar' ? 'مدة التعاقد:' : 'Duration:'}</span> {project.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

