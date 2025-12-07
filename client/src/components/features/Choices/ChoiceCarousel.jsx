import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import './Choices.css';
import { ChoiceCard } from '../../common/Card';

const ChoiceCarousel = forwardRef(({ 
  choices = [],
  selectedChoices = [],
  onSelect,
  onIndexChange,
  expandedCardId = null,
  onExpandChange, // callback when card expand state changes
  layout = 'horizontal' // 'vertical' for scrolling list, 'horizontal' for carousel
  , isQ2 = false, isQ3 = false
}, ref) => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Expose scrollToIndex to parent
  useImperativeHandle(ref, () => ({
    scrollToIndex: (index) => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      const cardWidth = carousel.firstChild?.offsetWidth || 0;
      const gap = 16;
      carousel.scrollTo({
        left: index * (cardWidth + gap),
        behavior: 'smooth'
      });
      setActiveIndex(index);
      onIndexChange?.(index);
    }
  }));

  useEffect(() => {
    if (layout !== 'horizontal') return;
    
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const scrollLeft = carousel.scrollLeft;
      const cardWidth = carousel.firstChild?.offsetWidth || 0;
      const gap = 16;
      const index = Math.round(scrollLeft / (cardWidth + gap));
      const newIndex = Math.min(Math.max(0, index), choices.length - 1);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
        onIndexChange?.(newIndex);
      }
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, [choices.length, layout, activeIndex, onIndexChange]);

  if (layout === 'vertical') {
    return (
      <div className="choice-list">
        {choices.map((choice) => (
          <ChoiceCard
            key={choice.id}
            choice={choice}
            isSelected={selectedChoices.includes(choice.id)}
            isExpanded={expandedCardId === choice.id}
            onSelect={onSelect}
            onExpand={onExpandChange}
              isQ2={isQ2}
              isQ3={isQ3}
          />
        ))}
      </div>
    );
  }

  return (
    <div 
      ref={carouselRef} 
      className="choice-list choice-list--horizontal hide-scrollbar"
    >
      {choices.map((choice) => (
        <ChoiceCard
          key={choice.id}
          choice={choice}
          isSelected={selectedChoices.includes(choice.id)}
          isExpanded={expandedCardId === choice.id}
          onSelect={onSelect}
          onExpand={onExpandChange}
            isQ2={isQ2}
            isQ3={isQ3}
        />
      ))}
    </div>
  );
});

export default ChoiceCarousel;
