import React from 'react';
import './CompletionSuccess.css';
import { TwoColumnLayout, QuestionPanel, ContentPanel } from '../../layout';
import { PrimaryButton } from '../../common/Button';

const CompletionSuccess = ({ 
  title = 'Well done!',
  message = 'You have completed this section.',
  nextAction,
  onContinue
}) => {
  return (
    <TwoColumnLayout>
      <QuestionPanel hideProgress={true}>
        <div className="completion-success">
          <div className="completion-success__icon">✓</div>
          <h1 className="completion-success__title">{title}</h1>
          <p className="completion-success__message">{message}</p>
        </div>
      </QuestionPanel>

      <ContentPanel>
        <div className="completion-success__content">
          <div className="completion-success__illustration">
            <div className="completion-success__checkmark">
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" />
                <path d="M30 50 L45 65 L70 35" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          
          <div className="completion-success__actions">
            <PrimaryButton onClick={onContinue}>{nextAction || 'Continue'}</PrimaryButton>
          </div>
        </div>
      </ContentPanel>
    </TwoColumnLayout>
  );
};

export default CompletionSuccess;
