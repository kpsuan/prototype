import React from 'react';
import './Avatar.css';

const UserAvatar = ({ 
  name, 
  imageUrl, 
  size = 'md',
  color
}) => {
  const initials = name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const sizeClasses = {
    sm: 'avatar--sm',
    md: 'avatar--md',
    lg: 'avatar--lg'
  };

  return (
    <div 
      className={`avatar ${sizeClasses[size]}`}
      style={{ backgroundColor: color || 'var(--color-primary)' }}
      title={name}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="avatar__image" />
      ) : (
        <span className="avatar__initials">{initials}</span>
      )}
    </div>
  );
};

export default UserAvatar;
