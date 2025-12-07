import React from 'react';
import './Indicator.css';

const CarouselIndicator = ({ 
  total, 
  active = 0,
  onClick,
  variant = 'bars', // 'dots', 'bars'
  showCounter = true
}) => {
  return (
    <div className={`carousel-indicator carousel-indicator--${variant}`}>
      <div className="carousel-indicator__bars">
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator__bar ${index === active ? 'carousel-indicator__bar--active' : ''}`}
            onClick={() => onClick?.(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === active ? 'true' : 'false'}
          />
        ))}
      </div>
      {showCounter && (
        <span className="carousel-indicator__counter">
          {active + 1}/{total}
        </span>
      )}
    </div>
  );
};

export default CarouselIndicator;
