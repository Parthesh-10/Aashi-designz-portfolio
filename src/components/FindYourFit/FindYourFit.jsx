'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import './FindYourFit.css';
import {
  STRATEGY_CARD_CONFIG,
  FINISH_LINE_OPTIONS,
  CHANNEL_OPTIONS,
  DECISION_MAKER_OPTIONS,
  BUDGET_OPTIONS,
  PLAN_OPTIONS,
} from '@/constant/findyourfit';

// Small inline SVGs
function CheckIcon({ stroke = '#ffffff', size = 12, strokeWidth = 2.4 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 12" fill="none" aria-hidden="true">
      <path
        d="M2 6L5.2 9.5L12 2.5"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RightArrowIcon({ stroke = '#ffffff', size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M2.5 7H11.5M11.5 7L7.5 3M11.5 7L7.5 11"
        stroke={stroke}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UpRightArrowIcon({ stroke = '#333943', size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DownArrowIcon({ stroke = '#ffffff', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 2.5V13.5M8 13.5L3.5 9M8 13.5L12.5 9"
        stroke={stroke}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AlertIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="#6F45C2" strokeWidth="1.8" />
      <path d="M8 4.5V9" stroke="#6F45C2" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="8" cy="11.5" r="0.9" fill="#6F45C2" />
    </svg>
  );
}

export default function FindYourFit() {
  // Screen Flow: '1A' -> '1B' -> '2' -> 'thankyou'
  const [currentScreen, setCurrentScreen] = useState('1A');
  const [outgoingScreen, setOutgoingScreen] = useState(null);
  const [direction, setDirection] = useState('forward'); // 'forward' | 'backward'

  // Form selections state
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
  const [shareStatus, setShareStatus] = useState(null); // 'copied' | null

  // Card height animation refs
  const cardRef = useRef(null);
  const incomingScreenRef = useRef(null);
  const titleHeadingRef = useRef(null);

  // Measure and animate card height smoothly
  const updateCardHeight = useCallback(() => {
    if (!cardRef.current || !incomingScreenRef.current) return;
    const incomingHeight = incomingScreenRef.current.offsetHeight;
    if (incomingHeight > 0) {
      const headerEl = cardRef.current.querySelector('.findyourfit-header');
      let headerHeightWithMargin = 0;
      if (headerEl && currentScreen !== 'thankyou') {
        const headerStyle = window.getComputedStyle(headerEl);
        const headerMarginBottom = parseFloat(headerStyle.marginBottom) || 0;
        headerHeightWithMargin = headerEl.offsetHeight + headerMarginBottom;
      }
      const cardStyle = window.getComputedStyle(cardRef.current);
      const padTop = parseFloat(cardStyle.paddingTop) || 0;
      const padBottom = parseFloat(cardStyle.paddingBottom) || 0;
      const totalH = Math.ceil(incomingHeight + headerHeightWithMargin + padTop + padBottom);
      cardRef.current.style.height = `${totalH}px`;
    }
  }, [currentScreen]);

  useEffect(() => {
    updateCardHeight();
    const handleResize = () => updateCardHeight();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateCardHeight, currentScreen, outgoingScreen]);

  // Navigate between screens with smooth staggered transitions
  const navigateTo = useCallback(
    (newScreen, dir = 'forward') => {
      if (newScreen === currentScreen) return;
      setDirection(dir);
      setOutgoingScreen(currentScreen);
      setCurrentScreen(newScreen);

      // Move focus & ensure card is in view
      setTimeout(() => {
        setOutgoingScreen(null);
        if (titleHeadingRef.current) {
          titleHeadingRef.current.focus({ preventScroll: true });
        }
        if (cardRef.current) {
          const rect = cardRef.current.getBoundingClientRect();
          if (rect.top < 80) {
            window.scrollBy({ top: rect.top - 100, behavior: 'smooth' });
          }
        }
      }, 550);
    },
    [currentScreen]
  );

  // Field selection handler
  const handleSelect = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Web Share or Clipboard Copy
  const handleShare = async () => {
    if (typeof window !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    if (typeof window !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShareStatus('copied');
        setTimeout(() => setShareStatus(null), 2000);
      } catch (err) {
        console.error('Copy link error:', err);
      }
    }
  };

  // Step 2 Form Validation
  const validateField = (field, value) => {
    let err = '';
    if (field === 'businessName') {
      const trimmed = value.trim();
      if (!trimmed || trimmed.length < 2) {
        err = 'Business name must be at least 2 characters.';
      }
    } else if (field === 'phone') {
      const rawDigits = value.replace(/\D/g, '');
      if (rawDigits.length !== 10) {
        err = 'Please enter a valid 10-digit mobile number.';
      }
    }
    setErrors((prev) => ({ ...prev, [field]: err }));
    return !err;
  };

  const handlePhoneChange = (e) => {
    const rawVal = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: rawVal }));
    if (errors.phone && rawVal.length === 10) {
      setErrors((prev) => ({ ...prev, phone: '' }));
    }
  };

  const handleBusinessNameChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, businessName: val }));
    if (errors.businessName && val.trim().length >= 2) {
      setErrors((prev) => ({ ...prev, businessName: '' }));
    }
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const isNameValid = validateField('businessName', formData.businessName);
    const isPhoneValid = validateField('phone', formData.phone);

    if (!isNameValid || !isPhoneValid) {
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
        hp_company_url: honeypot,
        submittedAt: new Date().toISOString(),
      };

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        navigateTo('thankyou', 'forward');
      } else {
        setServerError('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setServerError('Something went wrong. Please try again.');
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

  // Validation rules for Next buttons
  const is1AComplete = Boolean(formData.finishLine && formData.channel && formData.decisionMaker);
  const is1BComplete = Boolean(formData.budget && formData.plan);

  // Render individual screen contents
  const renderScreen = (screenName) => {
    switch (screenName) {
      case '1A':
        return (
          <div className="findyourfit-screen-inner">
            {/* Group 1: YOUR FINISH LINE */}
            <div className="findyourfit-group">
              <span id="label-finishline" className="findyourfit-group-label">
                YOUR FINISH LINE
              </span>
              <div
                className="findyourfit-finish-cards"
                role="radiogroup"
                aria-labelledby="label-finishline"
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
                      className={`findyourfit-card-opt ${isSelected ? 'selected' : ''}`}
                    >
                      <span className="findyourfit-card-circle" aria-hidden="true">
                        {isSelected && <CheckIcon size={12} stroke="#ffffff" />}
                      </span>
                      <span className="findyourfit-card-title">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Group 2: CHANNEL PILLS */}
            <div className="findyourfit-group">
              <div
                className="findyourfit-pills-row"
                role="radiogroup"
                aria-label="Marketing channel"
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
                      className={`findyourfit-outline-pill ${isSelected ? 'selected' : ''}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Group 3: WHO DECIDES? */}
            <div className="findyourfit-group">
              <span id="label-whodecides" className="findyourfit-group-label">
                WHO DECIDES?
              </span>
              <div
                className="findyourfit-decides-row"
                role="radiogroup"
                aria-labelledby="label-whodecides"
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
                  className="findyourfit-send-btn"
                  aria-label="Send this form to decision maker"
                >
                  <span>{shareStatus === 'copied' ? 'Link copied' : 'Send this to them'}</span>
                  <span className="findyourfit-send-arrow-circle" aria-hidden="true">
                    {shareStatus === 'copied' ? (
                      <CheckIcon size={12} stroke="#333943" strokeWidth={2.4} />
                    ) : (
                      <UpRightArrowIcon size={12} stroke="#333943" />
                    )}
                  </span>
                </button>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="findyourfit-actions-row right-only">
              <button
                type="button"
                disabled={!is1AComplete}
                onClick={() => navigateTo('1B', 'forward')}
                className="findyourfit-lime-btn"
                aria-label="Next step"
              >
                <span>Next</span>
                <span className="findyourfit-lime-arrow-wrap" aria-hidden="true">
                  <RightArrowIcon size={12} stroke="#ffffff" />
                </span>
              </button>
            </div>
          </div>
        );

      case '1B':
        return (
          <div className="findyourfit-screen-inner">
            {/* Group 1: RIGHT NOW MY BUDGET IS... */}
            <div className="findyourfit-group">
              <span id="label-budget" className="findyourfit-group-label">
                RIGHT NOW MY BUDGET IS…
              </span>
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
                      className={`findyourfit-outline-pill ${isSelected ? 'selected' : ''}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Group 2: CHOOSE YOUR PLAN (Staircase) */}
            <div className="findyourfit-group">
              <span id="label-plan" className="findyourfit-group-label">
                CHOOSE YOUR PLAN
              </span>
              <div
                className="findyourfit-staircase-grid"
                role="radiogroup"
                aria-labelledby="label-plan"
              >
                {PLAN_OPTIONS.map((plan) => {
                  const isSelected = formData.plan === plan.title;
                  return (
                    <button
                      key={plan.title}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => handleSelect('plan', plan.title)}
                      className={`findyourfit-plan-stair ${plan.stepClass} ${
                        isSelected ? 'selected' : ''
                      }`}
                    >
                      <h4 className="findyourfit-plan-heading">{plan.title}</h4>
                      <p className="findyourfit-plan-paragraph">{plan.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions Row: Subtle Back + Lime Get free strategy */}
            <div className="findyourfit-actions-row">
              <button
                type="button"
                onClick={() => navigateTo('1A', 'backward')}
                className="findyourfit-back-text-btn"
              >
                Back
              </button>

              <button
                type="button"
                disabled={!is1BComplete}
                onClick={() => navigateTo('2', 'forward')}
                className="findyourfit-lime-btn"
              >
                <span>Get free strategy</span>
                <span className="findyourfit-lime-arrow-wrap" aria-hidden="true">
                  <RightArrowIcon size={12} stroke="#ffffff" />
                </span>
              </button>
            </div>
          </div>
        );

      case '2':
        return (
          <div className="findyourfit-screen-inner">
            <div className="findyourfit-step2-grid">
              {/* Left Column: Form Fields */}
              <form onSubmit={handleSubmit} className="findyourfit-step2-form" noValidate>
                {/* Honeypot field */}
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

                {/* Business Name Field */}
                <div className="findyourfit-field-wrap">
                  <label htmlFor="fit-business-name" className="findyourfit-group-label">
                    BUSINESS NAME
                  </label>
                  <input
                    id="fit-business-name"
                    type="text"
                    value={formData.businessName}
                    onChange={handleBusinessNameChange}
                    onBlur={() => validateField('businessName', formData.businessName)}
                    placeholder="Your business name"
                    className={`findyourfit-input-rounded ${errors.businessName ? 'has-error' : ''}`}
                    required
                  />
                  {errors.businessName && (
                    <div className="findyourfit-error-msg" role="alert">
                      <AlertIcon />
                      <span>{errors.businessName}</span>
                    </div>
                  )}
                </div>

                {/* Phone Number Field */}
                <div className="findyourfit-field-wrap">
                  <label htmlFor="fit-phone" className="findyourfit-group-label">
                    PHONE NUMBER
                  </label>
                  <div
                    className={`findyourfit-phone-pill-wrap ${errors.phone ? 'has-error' : ''}`}
                  >
                    <span className="findyourfit-phone-chip">+91</span>
                    <input
                      id="fit-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      onBlur={() => validateField('phone', formData.phone)}
                      placeholder="98765 43210"
                      className="findyourfit-phone-input"
                      inputMode="numeric"
                      required
                    />
                  </div>
                  {errors.phone && (
                    <div className="findyourfit-error-msg" role="alert">
                      <AlertIcon />
                      <span>{errors.phone}</span>
                    </div>
                  )}
                </div>

                {/* WhatsApp Checkbox */}
                <label className="findyourfit-checkbox-row">
                  <input
                    type="checkbox"
                    checked={formData.whatsappOptIn}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, whatsappOptIn: e.target.checked }))
                    }
                    className="findyourfit-hidden-cb"
                  />
                  <span
                    className={`findyourfit-cb-box ${formData.whatsappOptIn ? 'checked' : ''}`}
                    aria-hidden="true"
                  >
                    {formData.whatsappOptIn && <CheckIcon size={11} stroke="#ffffff" />}
                  </span>
                  <span className="findyourfit-cb-label">Send my plan on WhatsApp</span>
                </label>

                {/* Server Error Message */}
                {serverError && (
                  <div className="findyourfit-server-error" aria-live="polite">
                    <AlertIcon />
                    <span>{serverError}</span>
                  </div>
                )}

                {/* Actions: Purple Submit Button + Subtle Back */}
                <div className="findyourfit-step2-actions">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="findyourfit-purple-submit-btn"
                  >
                    <span>{isSubmitting ? 'Sending…' : 'Get my free strategy'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateTo('1B', 'backward')}
                    className="findyourfit-back-text-btn"
                  >
                    Back
                  </button>
                </div>
              </form>

              {/* Right Column: Purple Media Strategy Card */}
              <div className="findyourfit-media-card">
                <div>
                  <span className="findyourfit-media-badge">{STRATEGY_CARD_CONFIG.badge}</span>
                  <h3 className="findyourfit-media-title">{STRATEGY_CARD_CONFIG.title}</h3>

                  <ul className="findyourfit-media-bullets">
                    {STRATEGY_CARD_CONFIG.bullets.map((bullet) => (
                      <li key={bullet} className="findyourfit-media-bullet">
                        <span className="findyourfit-bullet-circle" aria-hidden="true">
                          <CheckIcon size={10} stroke="#ffffff" strokeWidth={2.4} />
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="findyourfit-media-price-row">
                  <span className="findyourfit-media-price-old">
                    {STRATEGY_CARD_CONFIG.originalPrice}
                  </span>
                  <span className="findyourfit-media-price-free">
                    {STRATEGY_CARD_CONFIG.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'thankyou':
        return (
          <div className="findyourfit-thankyou-screen">
            <div className="findyourfit-thankyou-circle" aria-hidden="true">
              <CheckIcon size={24} stroke="#ffffff" strokeWidth={2.8} />
            </div>

            <h2 className="findyourfit-thankyou-title">Thank you for filling the form!</h2>

            <p className="findyourfit-thankyou-subtitle">
              You&apos;ll receive a researched plan and strategy, custom to your business, in 24 hours. Free.
            </p>

            {/* 3-Node Tracker */}
            <div className="findyourfit-tracker-row" aria-label="Strategy generation progress">
              <div className="findyourfit-tracker-node">
                <div className="findyourfit-node-circle node-1" aria-label="Step 1: Form received">
                  <CheckIcon size={14} stroke="#ffffff" strokeWidth={2.4} />
                </div>
                <span className="findyourfit-node-label">Form received</span>
              </div>

              <div className="findyourfit-tracker-line-container" aria-hidden="true">
                <div className="findyourfit-tracker-line-fill" />
              </div>

              <div className="findyourfit-tracker-node">
                <div className="findyourfit-node-circle node-2" aria-label="Step 2: We research">
                  2
                </div>
                <span className="findyourfit-node-label">We research</span>
              </div>

              <div className="findyourfit-tracker-line-container" aria-hidden="true">
                <div className="findyourfit-tracker-line-fill" />
              </div>

              <div className="findyourfit-tracker-node">
                <div className="findyourfit-node-circle node-3" aria-label="Step 3: Plan in 24 hrs">
                  3
                </div>
                <span className="findyourfit-node-label">Plan in 24 hrs</span>
              </div>
            </div>

            {/* Smooth Scroll Next Button */}
            <button
              type="button"
              onClick={handleScrollNext}
              className="findyourfit-down-scroll-btn"
              aria-label="Scroll down to next section"
              title="Next section"
            >
              <DownArrowIcon size={15} stroke="#ffffff" />
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const isStep2 = currentScreen === '2';
  const isThankYou = currentScreen === 'thankyou';

  return (
    <section className="findyourfit-wrapper container" aria-label="Find your fit qualification">
      <div ref={cardRef} className="findyourfit-card">
        {/* Shared Header (Screens 1A, 1B, 2) */}
        {!isThankYou && (
          <header className="findyourfit-header">
            <div className="findyourfit-header-left">
              <h2
                ref={titleHeadingRef}
                tabIndex={-1}
                className="findyourfit-header-title"
              >
                {isStep2 ? 'Almost there.' : 'Find your fit.'}
              </h2>
              <p className="findyourfit-header-subtitle">
                {isStep2 ? 'Where should we send your plan?' : 'Tap to answer. No typing.'}
              </p>
            </div>

            <div
              className="findyourfit-header-right"
              aria-label={`Step ${isStep2 ? '2' : '1'} of 2`}
            >
              <span className="findyourfit-step-pill">
                {isStep2 ? 'STEP 2 OF 2' : 'STEP 1 OF 2'}
              </span>

              <div className="findyourfit-progress-track" aria-hidden="true">
                <div className="findyourfit-progress-bar-slot">
                  <div className="findyourfit-progress-bar-fill filled" />
                </div>
                <div className="findyourfit-progress-bar-slot">
                  <div
                    className={`findyourfit-progress-bar-fill ${isStep2 ? 'filled' : ''}`}
                  />
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Screens Stage */}
        <div className="findyourfit-screens-stage">
          {outgoingScreen && (
            <div
              className={`findyourfit-screen outgoing ${direction}`}
              aria-hidden="true"
            >
              {renderScreen(outgoingScreen)}
            </div>
          )}

          <div
            ref={incomingScreenRef}
            className={`findyourfit-screen incoming ${direction}`}
          >
            {renderScreen(currentScreen)}
          </div>
        </div>
      </div>
    </section>
  );
}
