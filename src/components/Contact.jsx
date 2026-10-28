import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import './Contact.css';

const Contact = () => {
  const { language, t } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pre-fill equipment category when event is dispatched from Equipments section
  useEffect(() => {
    const handleSelectCategory = (e) => {
      if (e.detail) {
        setEquipmentType(e.detail);
      }
    };
    window.addEventListener('selectEquipmentCategory', handleSelectCategory);
    return () => window.removeEventListener('selectEquipmentCategory', handleSelectCategory);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      alert(t('contact.form.alertFields'));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://fmdcon.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          message
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitting(false);
        setIsSubmitted(true);

        // تفريغ الحقول بعد النجاح
        setName('');
        setPhone('');
        setEmail('');
        setMessage('');
      } else {
        throw new Error(data.message || 'حدث خطأ في السيرفر');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setIsSubmitting(false);
      alert('عذراً، فشل إرسال الرسالة. يرجى التحقق من اتصال السيرفر والمحاولة مرة أخرى.');
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <h2 className="section-title gradient-text">{t('contact.title')}</h2>
        <p className="section-subtitle">{t('contact.subtitle')}</p>

        <div className="contact-grid">

          {/* Left Column: Contact Form */}
          <div className="contact-form-wrapper">
            {!isSubmitted ? (
              <form onSubmit={handleFormSubmit} autoComplete='off' className="contact-form-panel glass-panel" id="contact-form-element">


                <input type="text" style={{ display: 'none' }} autoComplete="chrome-off" />
                <input type="email" style={{ display: 'none' }} autoComplete="chrome-off" />
                <input type="tel" style={{ display: 'none' }} autoComplete="chrome-off" />

                <h3 className="contact-form-title">{t('contact.form.title')}</h3>
                <p className="contact-form-subtitle">{t('contact.form.subtitle')}</p>

                <div className="contact-form-group">
                  <label htmlFor="name-input" className="contact-form-label">{t('contact.form.nameLabel')}</label>
                  <input
                    type="text"
                    id="name-input"
                    className="form-input"
                    autoComplete="new-password"
                    placeholder={t('contact.form.namePlaceholder')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="contact-grid-fields" style={{ marginBottom: '20px' }}>
                  <div className="contact-form-group" style={{ marginBottom: 0 }}>
                    <label htmlFor="phone-input" className="contact-form-label">{t('contact.form.phoneLabel')}</label>
                    <input
                      type="tel"
                      id="phone-input"
                      className="form-input"
                      placeholder={t('contact.form.phonePlaceholder')}
                      value={phone}
                      autoComplete="one-time-code"
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="contact-form-group" style={{ marginBottom: 0 }}>
                    <label htmlFor="email-input" className="contact-form-label">{t('contact.form.emailLabel')}</label>
                    <input
                      type="email"
                      id="email-input"
                      className="form-input"
                      autoComplete="new-password"
                      placeholder={t('contact.form.emailPlaceholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="contact-form-group">
                  <label htmlFor="message-textarea" className="contact-form-label">{t('contact.form.messageLabel')}</label>
                  <textarea
                    id="message-textarea"
                    className="form-input"
                    rows="4"
                    placeholder={t('contact.form.messagePlaceholder')}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '14px' }}
                  disabled={isSubmitting}
                  id="contact-submit-btn"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" style={language === 'ar' ? { marginLeft: '6px' } : { marginRight: '6px' }} />
                      <span>{t('contact.form.submitting')}</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} style={language === 'ar' ? { marginLeft: '6px' } : { marginRight: '6px', transform: language === 'en' ? 'rotate(180deg)' : 'none' }} />
                      <span>{t('contact.form.submitBtn')}</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                className="contact-success-alert glass-panel"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                id="contact-success-panel"
              >
                <div className="contact-success-icon">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="contact-success-title">{t('contact.form.successTitle')}</h3>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {t('contact.form.successDesc')}
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn btn-secondary"
                  style={{ marginTop: '12px' }}
                  id="contact-back-btn"
                >
                  {t('contact.form.backBtn')}
                </button>
              </motion.div>
            )}
          </div>

          {/* Right Column: Contact Details & Map */}
          <div className="contact-info-panel">
            <div className="contact-details-box">
              <div className="contact-detail-item" id="contact-info-address">
                <div className="contact-detail-icon">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="contact-detail-label">{t('contact.info.addressLabel')}</span>
                  <div className="contact-detail-val">{t('contact.info.addressVal')}</div>
                </div>
              </div>
              <div className='phons-emails1'>
                <div className="contact-detail-item phon-email-box" id="contact-info-phone">
                  <div className="contact-detail-icon">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="contact-detail-label">{t('contact.info.phoneLabel1')}</span>
                    <div className="contact-detail-val" style={{ direction: 'ltr', textAlign: 'right' }}> 0559112777 / 0578175097 </div>
                  </div>
                </div>

                <div className="contact-detail-item phon-email-box" id="contact-info-email">
                  <div className="contact-detail-icon">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="contact-detail-label">{t('contact.info.emailLabell')}</span>
                    <div className="contact-detail-val">info@fmdcon.com</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="map">
              <iframe
                title="office-location"
                src="https://maps.google.com/maps?q=25.406468,49.462265&z=15&output=embed"
                width="100%"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;