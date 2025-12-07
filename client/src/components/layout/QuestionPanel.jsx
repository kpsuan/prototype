import React from 'react';
import './Layout.css';
import { ProgressFrame } from '../common/Navigation';
import { ArrowLeftIcon } from '../common/Icons/Icons';

const QuestionPanel = ({ 
  children, 
  progress,
  showBack = false,
  onBack,
  hideProgress = false
}) => {
  return (
    <div className="question-panel">
      <div className="question-panel__header">
        <div className="question-panel__nav-row">
          <div className="question-panel__back-wrapper">
            {showBack && (
              <button 
                className="question-panel__back"
                onClick={onBack}
                aria-label="Go back"
              >
                <ArrowLeftIcon size={20} />
              </button>
            )}
          </div>
          {!hideProgress && progress && (
            <ProgressFrame 
              current={progress.current}
              total={progress.total}
            />
          )}
        </div>
      </div>
      <div className="question-panel__content">
        {children}
      </div>
    </div>
  );
};

export default QuestionPanel;
