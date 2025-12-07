import React from 'react';
import './RecordingComplete.css';

// Arrow Right Icon
const ArrowRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// User avatars - using placeholder images from the design
const userAvatars = [
  { id: 1, src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face', alt: 'Team member 1' },
  { id: 2, src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', alt: 'Team member 2' },
  { id: 3, src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', alt: 'Team member 3' },
  { id: 4, src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', alt: 'Team member 4' },
  { id: 5, src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face', alt: 'Team member 5' },
  { id: 6, src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face', alt: 'Team member 6' },
  { id: 7, src: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=face', alt: 'Team member 7' },
  { id: 8, src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=face', alt: 'Team member 8' },
];

// Top row avatars (will scroll left to right)
const topRowAvatars = userAvatars.slice(0, 5);
// Bottom row avatars (will scroll right to left) - different order
const bottomRowAvatars = [...userAvatars.slice(3), ...userAvatars.slice(0, 3)];

const RecordingComplete = ({ 
  onReady, 
  onSkip 
}) => {
  return (
    <div className="recording-complete">
      {/* Illustration Area with Avatars */}
      <div className="recording-complete__illustration">
        <div className="recording-complete__gradient-bg"></div>
        
        {/* Avatar Rows - duplicated for seamless infinite scroll */}
        <div className="recording-complete__avatars">
          <div className="recording-complete__avatar-row recording-complete__avatar-row--top">
            {/* First set */}
            {topRowAvatars.map((avatar) => (
              <div
                key={`top-1-${avatar.id}`}
                className="recording-complete__avatar"
              >
                <img src={avatar.src} alt={avatar.alt} />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {topRowAvatars.map((avatar) => (
              <div
                key={`top-2-${avatar.id}`}
                className="recording-complete__avatar"
              >
                <img src={avatar.src} alt={avatar.alt} />
              </div>
            ))}
          </div>
          <div className="recording-complete__avatar-row recording-complete__avatar-row--bottom">
            {/* First set */}
            {bottomRowAvatars.map((avatar, index) => (
              <div
                key={`bottom-1-${avatar.id}-${index}`}
                className="recording-complete__avatar"
              >
                <img src={avatar.src} alt={avatar.alt} />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {bottomRowAvatars.map((avatar, index) => (
              <div
                key={`bottom-2-${avatar.id}-${index}`}
                className="recording-complete__avatar"
              >
                <img src={avatar.src} alt={avatar.alt} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="recording-complete__content">
        <div className="recording-complete__text-block">
          <h2 className="recording-complete__title">A Whole Family Matter</h2>
          <p className="recording-complete__description">
            Now that you've explained your reasoning, it's time to hear what your care team thinks. Because you deserve to be heard, and so do they.
          </p>
        </div>

        {/* Buttons */}
        <div className="recording-complete__actions">
          <button 
            className="recording-complete__btn recording-complete__btn--primary"
            onClick={onReady}
          >
            <span>I'm Ready</span>
            <ArrowRightIcon />
          </button>
          <button 
            className="recording-complete__btn recording-complete__btn--secondary"
            onClick={onSkip}
          >
            Skip for Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordingComplete;
