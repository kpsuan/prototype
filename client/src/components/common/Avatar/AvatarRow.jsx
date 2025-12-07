import React from 'react';
import './Avatar.css';
import UserAvatar from './UserAvatar';

const AvatarRow = ({ 
  users = [],
  size = 'md',
  maxVisible = 4,
  overlap = true
}) => {
  const visibleUsers = users.slice(0, maxVisible);
  const remainingCount = users.length - maxVisible;

  return (
    <div className={`avatar-row ${overlap ? 'avatar-row--overlap' : ''}`}>
      {visibleUsers.map((user, index) => (
        <UserAvatar
          key={user.id || index}
          name={user.name}
          imageUrl={user.avatar}
          color={user.color}
          size={size}
        />
      ))}
      {remainingCount > 0 && (
        <div className={`avatar avatar--${size} avatar--more`}>
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export default AvatarRow;
