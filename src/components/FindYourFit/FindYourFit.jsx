'use client';

import React, { useState } from 'react';
import './FindYourFit.css';

const FINISH_LINE_OPTIONS = ['Sales', 'Trust', 'Eyes', 'All'];
const CHANNEL_OPTIONS = ['Organic', 'Paid', 'Both', 'Not sure'];
const DECISION_MAKER_OPTIONS = ['Me', 'Me + 1'];
const BUDGET_OPTIONS = [
  'Budget is tight',
  "Still deciding if it's worth it",
  'Not sure, suggest for me',
];
const PLAN_OPTIONS = [
  {
    title: '1 Month Plan',
    desc: 'See how we work and build your digital foundation.',
    className: 'plan-1',
  },
  {
    title: '3 Month Plan',
    desc: 'Build a strategy, test what works, and bring in better leads.',
    className: 'plan-3',
  },
  {
    title: '6 Month Plan',
    desc: 'A long-term growth plan with better insights, smarter campaigns, and a focus on consistent results.',
    className: 'plan-6',
  },
];

export default function FindYourFit() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    finishLine: null,
    channel: null,
    decisionMaker: null,
    budget: null,
    plan: null,
    businessName: '',
    phone: '',
    whatsappOptIn: true,
  });

  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Check if all 5 questions in Step 1 are selected
  const isStep1Complete = Boolean(
    formData.finishLine &&
    formData.channel &&
    formData.decisionMaker &&
    formData.budget &&
    formData.plan
  );

  const handleSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleShare = async () => {
    if (typeof window !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
        return;
      } catch {
        // Fall back to clipboard if user cancels or share fails
      }
    }

    if (typeof window !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2500);
      } catch (err) {
        console.error('Copy link failed:', err);
      }
    }
  };

  const handlePhoneChange = (e) => {
    const rawVal = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: rawVal }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: '' }));
    }
  };

  const handleBusinessNameChange = (e) => {
    setFormData((prev) => ({ ...prev, businessName: e.target.value }));
    if (errors.businessName) {
      setErrors((prev) => ({ ...prev, businessName: '' }));
    }
  };

  const validateStep2 = () => {
    const newErrors = {};
    const trimmedName = formData.businessName.trim();

    if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 80) {
      newErrors.businessName = 'Please enter a business name between 2 and 80 characters.';
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number starting with 6-9.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validateStep2()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        finishLine: formData.finishLine,
        channel: formData.channel,
        decisionMaker: formData.decisionMaker,
        budget: formData.budget,
        plan: formData.plan,
        businessName: formData.businessName.trim(),
        phone: `+91${formData.phone}`,
        whatsappOptIn: formData.whatsappOptIn,
        sourcePage: '/service/branddesign',
        submittedAt: new Date().toISOString(),
        hp_company_url: honeypot,
      };

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setStep(3);
      } else {
        setServerError(data.error || 'Failed to submit the form. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setServerError('A network error occurred. Please check your connection and retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScrollNext = () => {
    if (typeof document !== 'undefined') {
      const target = document.querySelector('.container4');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="findyourfit-wrapper" aria-label="Find your fit qualification">
      <div className="findyourfit-card">
        {/* =========================================================================
            STATE 1: Qualifying Questions
            ========================================================================= */}
        {step === 1 && (
          <div className="findyourfit-state-animate" key="step-1">
            <header className="findyourfit-header">
              <div className="findyourfit-header-left">
                <h2 className="findyourfit-title">Find your fit.</h2>
                <p className="findyourfit-subtitle">Tap to answer. No typing.</p>
              </div>
              <div className="findyourfit-step-indicator" aria-label="Step 1 of 2">
                <span className="findyourfit-step-pill">STEP 1 OF 2</span>
                <div className="findyourfit-progress-bar" aria-hidden="true">
                  <div className="findyourfit-progress-segment active" />
                  <div className="findyourfit-progress-segment" />
                </div>
              </div>
            </header>

            {/* Q1: YOUR FINISH LINE */}
            <div className="findyourfit-group">
              <p id="label-finish-line" className="findyourfit-label">
                YOUR FINISH LINE
              </p>
              <div
                className="findyourfit-finish-grid"
                role="radiogroup"
                aria-labelledby="label-finish-line"
              >
                {FINISH_LINE_OPTIONS.map((opt) => {
                  const isSelected = formData.finishLine === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => handleSelect('finishLine', opt)}
                      className={`findyourfit-finish-card ${isSelected ? 'selected' : ''}`}
                    >
                      {isSelected ? (
                        <span className="findyourfit-finish-check" aria-hidden="true">
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path
                              d="M1.5 4L3.8 6.5L8.5 1.5"
                              stroke="#ffffff"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      ) : (
                        <span className="findyourfit-finish-dot" aria-hidden="true" />
                      )}
                      <span className="findyourfit-finish-text">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Q2: CHANNEL PILL ROW */}
            <div className="findyourfit-group">
              <div
                className="findyourfit-pills-row"
                role="radiogroup"
                aria-label="Channel"
              >
                {CHANNEL_OPTIONS.map((opt) => {
                  const isSelected = formData.channel === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => handleSelect('channel', opt)}
                      className={`findyourfit-pill-btn ${isSelected ? 'selected' : ''}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Q3: WHO DECIDES? */}
            <div className="findyourfit-group">
              <p id="label-who-decides" className="findyourfit-label">
                WHO DECIDES?
              </p>
              <div
                className="findyourfit-decides-row"
                role="radiogroup"
                aria-labelledby="label-who-decides"
              >
                {DECISION_MAKER_OPTIONS.map((opt) => {
                  const isSelected = formData.decisionMaker === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => handleSelect('decisionMaker', opt)}
                      className={`findyourfit-circle-btn ${isSelected ? 'selected' : ''}`}
                    >
                      {opt}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={handleShare}
                  className="findyourfit-share-btn"
                  title="Share page"
                >
                  <span>{shareSuccess ? 'Link copied!' : 'Send this to them'}</span>
                  <span className="findyourfit-share-icon" aria-hidden="true">
                    {shareSuccess ? (
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M2.5 7.5L5.5 10.5L11.5 3.5"
                          stroke="#1e2229"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                          stroke="#1e2229"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                </button>
              </div>
            </div>

            {/* Q4: RIGHT NOW MY BUDGET IS... */}
            <div className="findyourfit-group">
              <p id="label-budget" className="findyourfit-label">
                RIGHT NOW MY BUDGET IS...
              </p>
              <div
                className="findyourfit-pills-row"
                role="radiogroup"
                aria-labelledby="label-budget"
              >
                {BUDGET_OPTIONS.map((opt) => {
                  const isSelected = formData.budget === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => handleSelect('budget', opt)}
                      className={`findyourfit-pill-btn ${isSelected ? 'selected' : ''}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Q5: CHOOSE YOUR PLAN */}
            <div className="findyourfit-group">
              <p id="label-plan" className="findyourfit-label">
                CHOOSE YOUR PLAN
              </p>
              <div
                className="findyourfit-plans-grid"
                role="radiogroup"
                aria-labelledby="label-plan"
              >
                {PLAN_OPTIONS.map((planObj) => {
                  const isSelected = formData.plan === planObj.title;
                  return (
                    <button
                      key={planObj.title}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => handleSelect('plan', planObj.title)}
                      className={`findyourfit-plan-card ${planObj.className} ${
                        isSelected ? 'selected' : ''
                      }`}
                    >
                      <h4 className="findyourfit-plan-title">{planObj.title}</h4>
                      <p className="findyourfit-plan-desc">{planObj.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Button */}
            <div className="findyourfit-step1-actions">
              <button
                type="button"
                disabled={!isStep1Complete}
                onClick={() => setStep(2)}
                className="findyourfit-primary-btn"
              >
                <span>Get free strategy</span>
                <span className="findyourfit-btn-arrow-circle" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2.5 7H11.5M11.5 7L7.5 3M11.5 7L7.5 11"
                      stroke="#a166f3"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            STATE 2: Almost There (Contact Details)
            ========================================================================= */}
        {step === 2 && (
          <div className="findyourfit-state-animate" key="step-2">
            <header className="findyourfit-header">
              <div className="findyourfit-header-left">
                <h2 className="findyourfit-title">Almost there.</h2>
                <p className="findyourfit-subtitle">Where should we send your plan?</p>
              </div>
              <div className="findyourfit-step-indicator" aria-label="Step 2 of 2">
                <span className="findyourfit-step-pill">STEP 2 OF 2</span>
                <div className="findyourfit-progress-bar" aria-hidden="true">
                  <div className="findyourfit-progress-segment active" />
                  <div className="findyourfit-progress-segment active" />
                </div>
              </div>
            </header>

            <div className="findyourfit-step2-grid">
              {/* Left Column: Form */}
              <form onSubmit={handleSubmit} className="findyourfit-step2-form" noValidate>
                {/* Honeypot field (hidden from view) */}
                <input
                  type="text"
                  name="hp_company_url"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {/* Business Name */}
                <div className="findyourfit-group">
                  <label htmlFor="fit-business-name" className="findyourfit-label">
                    BUSINESS NAME
                  </label>
                  <input
                    id="fit-business-name"
                    type="text"
                    value={formData.businessName}
                    onChange={handleBusinessNameChange}
                    placeholder="Your business name"
                    className="findyourfit-input-text"
                    required
                  />
                  {errors.businessName && (
                    <p className="findyourfit-field-error" role="alert">
                      {errors.businessName}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="findyourfit-group">
                  <label htmlFor="fit-phone" className="findyourfit-label">
                    PHONE NUMBER
                  </label>
                  <div
                    className={`findyourfit-phone-container ${
                      phoneFocused ? 'focused' : ''
                    }`}
                  >
                    <span className="findyourfit-phone-prefix">+91</span>
                    <input
                      id="fit-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      onFocus={() => setPhoneFocused(true)}
                      onBlur={() => setPhoneFocused(false)}
                      placeholder="98765 43210"
                      className="findyourfit-input-phone"
                      inputMode="numeric"
                      required
                    />
                  </div>
                  {errors.phone && (
                    <p className="findyourfit-field-error" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* WhatsApp Checkbox */}
                <label className="findyourfit-checkbox-row">
                  <input
                    type="checkbox"
                    checked={formData.whatsappOptIn}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        whatsappOptIn: e.target.checked,
                      }))
                    }
                    style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                  />
                  <span
                    className={`findyourfit-checkbox-custom ${
                      formData.whatsappOptIn ? 'checked' : ''
                    }`}
                    aria-hidden="true"
                  >
                    {formData.whatsappOptIn && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path
                          d="M1.5 4L3.8 6.5L8.5 1.5"
                          stroke="#ffffff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span className="findyourfit-checkbox-label">
                    Send my plan on WhatsApp
                  </span>
                </label>

                {/* Server Error Message */}
                {serverError && (
                  <div className="findyourfit-server-error" aria-live="polite">
                    <span>{serverError}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="findyourfit-step2-submit-btn"
                >
                  {isSubmitting ? 'Sending...' : 'Get my free strategy'}
                </button>

                {/* Back Button */}
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="findyourfit-back-btn"
                >
                  Back
                </button>
              </form>

              {/* Right Column: Purple Info Card */}
              <div className="findyourfit-info-card">
                <div>
                  <span className="findyourfit-lime-pill">FREE</span>
                  <h3 className="findyourfit-info-title">Media strategy</h3>
                  <ul className="findyourfit-info-list">
                    <li className="findyourfit-info-item">
                      <span className="findyourfit-info-check" aria-hidden="true">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path
                            d="M1.5 4L3.8 6.5L8.5 1.5"
                            stroke="#ffffff"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span>Researched plan</span>
                    </li>
                    <li className="findyourfit-info-item">
                      <span className="findyourfit-info-check" aria-hidden="true">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path
                            d="M1.5 4L3.8 6.5L8.5 1.5"
                            stroke="#ffffff"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span>Custom to your business</span>
                    </li>
                    <li className="findyourfit-info-item">
                      <span className="findyourfit-info-check" aria-hidden="true">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path
                            d="M1.5 4L3.8 6.5L8.5 1.5"
                            stroke="#ffffff"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span>Ready in 24 hours</span>
                    </li>
                  </ul>
                </div>

                <div className="findyourfit-price-row">
                  <span className="findyourfit-price-old">₹999</span>
                  <span className="findyourfit-price-free">₹0</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            STATE 3: Thank You
            ========================================================================= */}
        {step === 3 && (
          <div className="findyourfit-state-animate findyourfit-thankyou-container" key="step-3">
            <div className="findyourfit-thankyou-icon-wrap" aria-hidden="true">
              <svg width="28" height="22" viewBox="0 0 14 12" fill="none">
                <path
                  d="M2 6L5.2 9.5L12 2.5"
                  stroke="#ffffff"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h2 className="findyourfit-thankyou-heading">
              Thank you for filling the form!
            </h2>
            <p className="findyourfit-thankyou-desc">
              You&apos;ll receive a researched plan and strategy, custom to your business, in 24 hours. Free.
            </p>

            <div className="findyourfit-tracker" aria-label="Strategy progress tracker">
              <div className="findyourfit-tracker-step">
                <div className="findyourfit-tracker-badge completed" aria-label="Step 1 completed">
                  <svg width="12" height="10" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1.5 4L3.8 6.5L8.5 1.5"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="findyourfit-tracker-label">Form received</span>
              </div>

              <div className="findyourfit-tracker-line" aria-hidden="true" />

              <div className="findyourfit-tracker-step">
                <div className="findyourfit-tracker-badge current" aria-label="Step 2 in progress">
                  2
                </div>
                <span className="findyourfit-tracker-label">We research</span>
              </div>

              <div className="findyourfit-tracker-line" aria-hidden="true" />

              <div className="findyourfit-tracker-step">
                <div className="findyourfit-tracker-badge upcoming" aria-label="Step 3 upcoming">
                  3
                </div>
                <span className="findyourfit-tracker-label">Plan in 24 hrs</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleScrollNext}
              className="findyourfit-scroll-next-btn"
              aria-label="Scroll to next section"
              title="Next section"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 2.5V13.5M8 13.5L3.5 9M8 13.5L12.5 9"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
