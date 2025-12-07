import React from 'react';
import './Choices.css';
import { ChoiceCard } from '../../common/Card';

const ChoiceList = ({ 
  choices = [],
  selectedChoices = [],
  onSelect,
  layout = 'grid'
}) => {
  return (
    <div className={`choice-list choice-list--${layout}`}>
      {choices.map((choice) => (
        <ChoiceCard
          key={choice.id}
          choice={choice}
          isSelected={selectedChoices.includes(choice.id)}
          onSelect={onSelect}
          variant={layout === 'stack' ? 'compact' : 'default'}
        />
      ))}
    </div>
  );
};

export default ChoiceList;
