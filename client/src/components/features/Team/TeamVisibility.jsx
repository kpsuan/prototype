import React from 'react';
import './Team.css';
import { AvatarRow } from '../../common/Avatar';

const TeamVisibility = ({ 
  team = [],
  message = "Who will see your choices",
  variant = 'default'
}) => {
  const displayedTeam = variant === 'compact' ? team.slice(0, 3) : team;
  const remainingCount = team.length - displayedTeam.length;

  return (
    <div className={`team-visibility team-visibility--${variant}`}>
      {variant !== 'inline' && (
        <h4 className="team-visibility__title">{message}</h4>
      )}
      
      <div className="team-visibility__content">
        <AvatarRow 
          users={displayedTeam}
          size={variant === 'compact' ? 'sm' : 'md'}
          maxVisible={variant === 'compact' ? 3 : 5}
          overlap={true}
        />
        
        {variant === 'inline' && (
          <span className="team-visibility__message">{message}</span>
        )}
      </div>

      {remainingCount > 0 && (
        <span className="team-visibility__more">+{remainingCount} more</span>
      )}
    </div>
  );
};

export default TeamVisibility;
