import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import './Navbar.css';
import logo from '../assets/logo.jpeg';

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { id: 'hero', label: t('navbar.hero') },
    { id: 'about', label: t('navbar.about') },
    { id: 'mission-vision', label: t('navbar.missionVision') },
    { id: 'choose-us', label: t('navbar.chooseUs') },
    { id: 'equipments', label: t('navbar.equipments') },
    // { id: 'projects', label: t('navbar.projects') },
    { id: 'clients', label: t('navbar.clients') },
    { id: 'contact', label: t('navbar.contact') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Background change on scroll
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Scroll progress indicator
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Detect active section
      const scrollPosition = window.scrollY + 100;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [language]);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed navbar
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

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <nav className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
      {/* Scroll Progress Bar */}
      <div 
        className="scroll-progress" 
        style={{ width: `${scrollProgress}%` }}
        id="scroll-progress-bar"
      />
      
      <div className="navbar">
        {/* Brand Logo */}
        <a href="#hero" className="nav-brand" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }} id="nav-brand-logo">
          <img src={logo} className="nav-brand-icon" alt='logo' width={60} height={60} />
          {language === 'ar' ? (
            <> مؤسسة<span> فهد مشبب الدوسري</span></>
          ) : (
            <>Fahad M Al Dossary <span>Est</span></>
          )}
        </a>

        {/* Desktop Links */}
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <span
                onClick={() => scrollToSection(item.id)}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                id={`nav-link-${item.id}`}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA Actions */}
        <div className="nav-actions">
          {/* Language Toggle Button */}
          <button 
            className="lang-toggle-btn"
            onClick={toggleLanguage}
            id="lang-toggle-btn"
            aria-label="Toggle Language"
          >
            <Globe size={16} />
            <span>{t('navbar.languageToggle')}</span>
          </button>

          <a href="tel:+966500000000" className="nav-cta" id="nav-cta-btn">
            <Phone size={16} />
            <span>{t('navbar.cta')}</span>
          </a>
          
          <button 
            className="mobile-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (AnimatePresence handles exit animations smoothly) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu open"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            id="mobile-nav-drawer"
          >
            {navItems.map((item) => (
              <span
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                id={`mobile-nav-link-${item.id}`}
              >
                {item.label}
              </span>
            ))}
            <div className="nav-actions" style={{ flexDirection: 'column', width: '100%', gap: '12px' }}>
              <button 
                className="lang-toggle-btn"
                onClick={toggleLanguage}
                style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                id="mobile-lang-toggle-btn"
              >
                <Globe size={18} />
                <span>{t('navbar.languageToggle')}</span>
              </button>

              <a href="tel:+966500000000" className="nav-cta" id="mobile-nav-cta-btn" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                <Phone size={18} />
                <span>{t('navbar.cta')}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

