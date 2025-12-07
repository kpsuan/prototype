import React from 'react';
import './QuestionIntro.css';
import { TwoColumnLayout, QuestionPanel, ContentPanel } from '../../layout';
import { PrimaryButton } from '../../common/Button';
import { TeamVisibility } from '../../features/Team';

const QuestionIntro = ({ 
  question,
  team = [],
  progress = { current: 1, total: 4 },
  onContinue,
  onBack
}) => {
  const { title, subtitle, description, image } = question || {};

  return (
    <TwoColumnLayout>
      <QuestionPanel progress={progress} showBack={progress.current > 1} onBack={onBack}>
        <div className="question-intro">
          <div className="question-intro__header">
            {subtitle && <span className="question-intro__subtitle">{subtitle}</span>}
            <h1 className="question-intro__title">{title}</h1>
          </div>
          
          {description && <p className="question-intro__description">{description}</p>}

          <div className="question-intro__team">
            <TeamVisibility team={team} message="Who will see your choices" />
          </div>
        </div>
      </QuestionPanel>

      <ContentPanel>
        <div className="question-intro__content">
          {image && (
            <div className="question-intro__image">
              <img src={image} alt={title} />
            </div>
          )}
          
          <div className="question-intro__action">
            <PrimaryButton onClick={onContinue}>Continue</PrimaryButton>
          </div>
        </div>
      </ContentPanel>
    </TwoColumnLayout>
  );
};

export default QuestionIntro;
