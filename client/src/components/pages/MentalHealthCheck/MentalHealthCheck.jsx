import React from 'react';
import './MentalHealthCheck.css';
import { TwoColumnLayout, QuestionPanel, ContentPanel } from '../../layout';
import { PrimaryButton, SecondaryButton } from '../../common/Button';
import image1 from '../../../styles/image1.png';
import logo from '../../../styles/logo.png';


// Illustration for mental health check - tired person resting
const mentalHealthIllustration = "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=300&fit=crop";

const MentalHealthCheck = ({ 
  question,
  progress = { current: 1, total: 4 },
  onContinue,
  onBack,
  onBackHome,
  variant = 'doing-great' // 'doing-great', 'almost-there', 'take-break'
}) => {
  const { title, subtitle, sectionLabel, checkpointLabel } = question || {
    title: "How important is staying alive even if you have substantial physical limitations?",
    subtitle: "Question 10 A",
    sectionLabel: "Advance Care Planning",
    checkpointLabel: ""
  };

  // Get content based on variant
  const getContent = () => {
    switch (variant) {
      case 'almost-there':
        return {
          sectionLabel: 'Advance Care Planning',
          reflectionLabel: 'Q10A Reflection 2',
          heading: 'Almost There...',
          description: 'We know this may feel like a lot. Breathe and give yourself space to process. You can continue whenever you\'re ready.'
        };
      case 'take-break':
        return {
          sectionLabel: 'Advance Care Planning',
          reflectionLabel: 'Q10A Reflection 3',
          heading: 'Take a Break',
          description: 'It\'s okay to pause. These are important decisions. Come back when you feel ready to continue.'
        };
      case 'doing-great':
      default:
        return {
          sectionLabel: 'Advance Care Planning',
          reflectionLabel: 'Q10A Reflection 1',
          heading: 'You\'re Doing Great!',
          description: 'We know this may feel like a lot. Breathe and give yourself space to process. You can continue whenever you\'re ready.'
        };
    }
  };

  const content = getContent();

  return (
    <TwoColumnLayout>
      <QuestionPanel progress={progress} showBack={true} onBack={onBack} hideProgress={true}>
              <div className="main-screen__left">
                <div className="main-screen__icon">
                  <div className="main-screen__icon-outer">
                    <div className="main-screen__icon-inner">
                      <img src={logo} alt="AWFM Logo" className="main-screen__logo-img" />
                    </div>
                  </div>
                </div>
                
                <div className="main-screen__question-info">
                  <span className="main-screen__section-label">{sectionLabel || "Advance Care Planning"}</span>
                  <span className="main-screen__question-number">{subtitle || "Question 10 A"}</span>
                  <h1 className="main-screen__question-title">{title}</h1>
                </div>
              </div>
        </QuestionPanel>

      <ContentPanel>
        <div className="mental-health-check__content">
          {/* Mobile/Tablet header - shown only on smaller screens */}
          <div className="mental-health-check__mobile-header">
            <div className="mental-health-check__mobile-image">
              <img src={image1} alt="Question illustration" />
            </div>
            <div className="mental-health-check__mobile-info">
              {checkpointLabel && subtitle && (
                <span className="mental-health-check__mobile-label">
                  {checkpointLabel}: {subtitle}
                </span>
              )}
              <h2 className="mental-health-check__mobile-title">
                {title || "How important is staying alive even if you have substantial physical limitations?"}
              </h2>
            </div>
          </div>

          <div className="mental-health-check__right-content">
            {/* Section labels */}
            <div className="mental-health-check__labels">
              <span className="mental-health-check__section-label">{content.sectionLabel}</span>
              <span className="mental-health-check__reflection-label">{content.reflectionLabel}</span>
            </div>

            {/* Main heading */}
            <h2 className="mental-health-check__heading">{content.heading}</h2>

            {/* Description */}
            <p className="mental-health-check__description">{content.description}</p>

            {/* Illustration */}
            <div className="mental-health-check__illustration">
              <svg width="228" height="200" viewBox="0 0 228 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Tired person illustration - simplified SVG */}
                <ellipse cx="114" cy="180" rx="80" ry="15" fill="url(#breatheGradient)" fillOpacity="0.3"/>
                {/* Person body */}
                <path d="M50 140 C50 140, 80 160, 140 160 C200 160, 180 140, 180 140" stroke="#333" strokeWidth="3" fill="none"/>
                {/* Head */}
                <circle cx="70" cy="120" r="25" fill="#FFE4D4" stroke="#333" strokeWidth="2"/>
                {/* Eyes closed */}
                <path d="M60 118 Q65 115, 70 118" stroke="#333" strokeWidth="2" fill="none"/>
                <path d="M75 118 Q80 115, 85 118" stroke="#333" strokeWidth="2" fill="none"/>
                {/* Smile */}
                <path d="M65 130 Q70 135, 75 130" stroke="#333" strokeWidth="2" fill="none"/>
                {/* Low battery */}
                <rect x="85" y="70" width="30" height="18" rx="3" stroke="#666" strokeWidth="2" fill="white"/>
                <rect x="115" y="75" width="4" height="8" rx="1" fill="#666"/>
                <rect x="88" y="73" width="8" height="12" rx="1" fill="#EF4444"/>
                {/* Blanket/pillow */}
                <path d="M90 130 C100 120, 160 125, 180 140 L180 170 C160 165, 100 160, 90 150 Z" fill="#22D3EE" fillOpacity="0.8"/>
                <defs>
                  <linearGradient id="breatheGradient" x1="34" y1="180" x2="194" y2="180">
                    <stop offset="0%" stopColor="#5C40FB"/>
                    <stop offset="100%" stopColor="#F23B8B"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Actions */}
          <div className="mental-health-check__actions">
            <PrimaryButton onClick={onContinue} fullWidth>
              I'm Okay
              <span className="mental-health-check__arrow">→</span>
            </PrimaryButton>
            <SecondaryButton onClick={onBackHome} fullWidth>
              <span className="mental-health-check__back-arrow">←</span>
              Go Home
            </SecondaryButton>
          </div>
        </div>
      </ContentPanel>
    </TwoColumnLayout>
  );
};

export default MentalHealthCheck;
