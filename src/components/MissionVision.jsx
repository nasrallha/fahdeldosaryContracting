import React, { useState } from 'react';
import { Target, Eye, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import './MissionVision.css';

const MissionVision = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('mission');

  const tabs = [
    {
      id: 'mission',
      icon: <Target size={22} />,
      title: t('missionVision.tabs.mission.title'),
      subtitle: t('missionVision.tabs.mission.subtitle')
    },
    {
      id: 'vision',
      icon: <Eye size={22} />,
      title: t('missionVision.tabs.vision.title'),
      subtitle: t('missionVision.tabs.vision.subtitle')
    },
    {
      id: 'values',
      icon: <Sparkles size={22} />,
      title: t('missionVision.tabs.values.title'),
      subtitle: t('missionVision.tabs.values.subtitle')
    }
  ];

  const contentIcons = {
    mission: <Target size={44} />,
    vision: <Eye size={44} />,
    values: <Sparkles size={44} />
  };

  const currentContent = t('missionVision.details.' + activeTab) || {};

  return (
    <section className="section mission-vision-section" id="mission-vision">
      <div className="glow-effect" style={{ bottom: '10%', right: '20%' }}></div>

      <div className="container">
        <h2 className="section-title gradient-text">{t('missionVision.title')}</h2>
        <p className="section-subtitle">
          {t('missionVision.subtitle')}
        </p>

        <div className="mv-grid">
          {/* Right/Left: Tabs Selectors */}
          <div className="mv-tabs-wrapper">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`mv-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                id={`mv-tab-btn-${tab.id}`}
              >
                <div className="mv-tab-btn-icon">
                  {tab.icon}
                </div>
                <div className="mv-tab-btn-text-wrapper">
                  <span className="mv-tab-btn-title">{tab.title}</span>
                  <span className="mv-tab-btn-subtitle">{tab.subtitle}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Right/Left: Content Output */}
          <div className="mv-content-display glass-panel" id="mv-content-display">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <div className="mv-content-icon">
                  {contentIcons[activeTab]}
                </div>
                <h3 className="mv-content-title">{currentContent.title}</h3>
                <p className="mv-content-text">{currentContent.text}</p>

                {currentContent.list && (
                  <ul className="mv-values-list">
                    {currentContent.list.map((item, idx) => (
                      <li className="mv-value-item" key={idx}>
                        <div className="mv-value-item-header">
                          {activeTab === 'values' ? (
                            <div className="mv-value-item-dot"></div>
                          ) : (
                            <CheckCircle2 size={16} style={{ color: 'var(--primary)' }} />
                          )}
                          <span className="mv-value-item-text">{item.title}</span>
                        </div>
                        <p className="mv-value-item-body"> {item.text} </p>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;

