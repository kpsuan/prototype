import React, { useState, useRef, useEffect } from 'react';
import './TeamRecordings.css';

// Icons
const HeartIcon = ({ filled }) => (
  <svg width="20" height="18" viewBox="0 0 24 22" fill={filled ? "url(#heartGradient)" : "none"} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#405cfb" />
        <stop offset="100%" stopColor="#f23b8b" />
      </linearGradient>
    </defs>
    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" stroke="url(#heartGradient)" strokeWidth="2"/>
  </svg>
);

const CommentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="commentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#405cfb" />
        <stop offset="100%" stopColor="#f23b8b" />
      </linearGradient>
    </defs>
    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="url(#commentGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shareGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#405cfb" />
        <stop offset="100%" stopColor="#f23b8b" />
      </linearGradient>
    </defs>
    <path d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12" stroke="url(#shareGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 6L12 2L8 6" stroke="url(#shareGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 2V15" stroke="url(#shareGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AiIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#405cfb" />
        <stop offset="100%" stopColor="#f23b8b" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" stroke="url(#aiGradient)" strokeWidth="2"/>
    <path d="M12 6V12L16 14" stroke="url(#aiGradient)" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const VideoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M10 8L16 12L10 16V8Z" fill="currentColor"/>
  </svg>
);

const MicIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1C11.2044 1 10.4413 1.31607 9.87868 1.87868C9.31607 2.44129 9 3.20435 9 4V12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12V4C15 3.20435 14.6839 2.44129 14.1213 1.87868C13.5587 1.31607 12.7956 1 12 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 10V12C19 13.8565 18.2625 15.637 16.9497 16.9497C15.637 18.2625 13.8565 19 12 19C10.1435 19 8.36301 18.2625 7.05025 16.9497C5.7375 15.637 5 13.8565 5 12V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 19V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 23H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TextIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PlayIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5V19L19 12L8 5Z" fill="white"/>
  </svg>
);

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Comments Panel Component
const CommentsPanel = ({ isOpen, onClose, userName, comments = [] }) => {
  const [newComment, setNewComment] = useState('');

  const mockComments = [
    { id: 1, user: 'Dr. Sarah', avatar: 'https://i.pravatar.cc/40?img=1', text: 'Thank you for sharing your perspective. This helps me understand your values better.', time: '2h ago' },
    { id: 2, user: 'Mary', avatar: 'https://i.pravatar.cc/40?img=3', text: 'I appreciate you being so open about this.', time: '1h ago' },
    { id: 3, user: 'John', avatar: 'https://i.pravatar.cc/40?img=2', text: 'This really helped me understand where you\'re coming from.', time: '30m ago' },
  ];

  if (!isOpen) return null;

  return (
    <div className="team-recordings__panel-overlay" onClick={onClose}>
      <div className="team-recordings__panel team-recordings__panel--comments" onClick={e => e.stopPropagation()}>
        <div className="team-recordings__panel-header">
          <h3>Comments</h3>
          <button className="team-recordings__panel-close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="team-recordings__comments-list">
          {mockComments.map(comment => (
            <div key={comment.id} className="team-recordings__comment">
              <img src={comment.avatar} alt={comment.user} className="team-recordings__comment-avatar" />
              <div className="team-recordings__comment-content">
                <div className="team-recordings__comment-header">
                  <span className="team-recordings__comment-user">{comment.user}</span>
                  <span className="team-recordings__comment-time">{comment.time}</span>
                </div>
                <p className="team-recordings__comment-text">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="team-recordings__comment-input">
          <input 
            type="text" 
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className="team-recordings__comment-send" disabled={!newComment.trim()}>
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

// Check Icon for affirmed items
const CheckCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="url(#checkGradient)" strokeWidth="2"/>
    <path d="M8 12L11 15L16 9" stroke="url(#checkGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="checkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#b432a3" />
        <stop offset="100%" stopColor="#ae59cf" />
      </linearGradient>
    </defs>
  </svg>
);

// Profile Summary Panel Component
const ProfileSummaryPanel = ({ isOpen, onClose, member, isCurrentUser, onAffirm, hasAffirmed, onViewFullReport }) => {
  if (!isOpen || !member) return null;

  // Mock summary data - in real app this would come from member data
  const summaryData = {
    reflections: [
      {
        id: 1,
        title: 'Reflection 1: Your Position',
        items: ['Life extension is very important regardless of function']
      },
      {
        id: 2,
        title: 'Reflection 2: Your Challenges',
        items: [
          'Worried about becoming a burden to loved ones',
          'Worried doctors might undervalue my life with disability'
        ]
      },
      {
        id: 3,
        title: 'Reflection 3: What Would Change Your Mind',
        items: ['Meeting people with disabilities living meaningful lives']
      }
    ],
    affirmations: [
      { id: 1, name: 'Sarah', avatar: 'https://i.pravatar.cc/60?img=1', affirmed: true },
      { id: 2, name: 'John', avatar: 'https://i.pravatar.cc/60?img=2', affirmed: false },
      { id: 3, name: 'Mary', avatar: 'https://i.pravatar.cc/60?img=3', affirmed: false },
    ]
  };

  return (
    <div className="team-recordings__panel-overlay" onClick={onClose}>
      <div className="team-recordings__panel team-recordings__panel--profile" onClick={e => e.stopPropagation()}>
        <div className="team-recordings__panel-header">
          <h3>{member.name}'s Summary</h3>
          <button className="team-recordings__panel-close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        
        <div className="team-recordings__profile-content">
          {/* Reflections */}
          {summaryData.reflections.map(reflection => (
            <div key={reflection.id} className="team-recordings__profile-section">
              <h4 className="team-recordings__profile-section-title">{reflection.title}</h4>
              <ul className="team-recordings__profile-items">
                {reflection.items.map((item, idx) => (
                  <li key={idx} className="team-recordings__profile-item">
                    <CheckCircleIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Affirmations Section */}
          <div className="team-recordings__profile-section">
            <h4 className="team-recordings__profile-section-title team-recordings__profile-section-title--affirm">
              Who has affirmed their commitment
            </h4>
            <p className="team-recordings__profile-affirm-note">
              Colored profiles indicate affirmation. Gray profiles indicate no affirmation yet.
            </p>
            <div className="team-recordings__profile-avatars">
              {summaryData.affirmations.map(person => (
                <div 
                  key={person.id} 
                  className={`team-recordings__profile-avatar ${person.affirmed ? 'affirmed' : ''}`}
                >
                  <img src={person.avatar} alt={person.name} />
                </div>
              ))}
            </div>
          </div>

          {/* Affirm Button - only show when viewing other people's profiles */}
          {!isCurrentUser && (
            <button 
              className={`team-recordings__affirm-btn ${hasAffirmed ? 'affirmed' : ''}`}
              onClick={onAffirm}
            >
              <span className="btn-text-default">
                {hasAffirmed ? 'Commitment Affirmed' : 'Affirm Commitment'}
              </span>
              {hasAffirmed && (
                <span className="btn-text-hover">Undo</span>
              )}
            </button>
          )}

          {/* View Full Report Button */}
          <button 
            className="team-recordings__view-report-btn"
            onClick={() => onViewFullReport && onViewFullReport(member)}
          >
            View Full Report
          </button>
        </div>
      </div>
    </div>
  );
};

// Ask AI Panel Component
const AskAIPanel = ({ isOpen, onClose, userName }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);

  const prompts = [
    { id: 1, text: 'Explain this recording', icon: '💡' },
    { id: 2, text: 'Compare with my response', icon: '🔄' },
    { id: 3, text: 'What does this mean for my care?', icon: '❤️' },
    { id: 4, text: 'Summarize key points', icon: '📝' },
    { id: 5, text: 'How do our views differ?', icon: '🤔' },
  ];

  const handlePromptClick = (prompt) => {
    setMessages([
      ...messages,
      { type: 'user', text: prompt.text },
      { type: 'ai', text: `This is a placeholder response for "${prompt.text}". In a real implementation, this would connect to an AI service to provide insights about ${userName}'s recording and how it relates to your care preferences.` }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="team-recordings__panel-overlay" onClick={onClose}>
      <div className="team-recordings__panel team-recordings__panel--ai" onClick={e => e.stopPropagation()}>
        <div className="team-recordings__panel-header">
          <h3>Ask AI</h3>
          <button className="team-recordings__panel-close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        
        <div className="team-recordings__ai-content">
          {messages.length === 0 ? (
            <div className="team-recordings__ai-prompts">
              <p className="team-recordings__ai-intro">Choose a prompt or ask your own question about {userName}'s response:</p>
              <div className="team-recordings__ai-prompt-grid">
                {prompts.map(prompt => (
                  <button 
                    key={prompt.id} 
                    className="team-recordings__ai-prompt"
                    onClick={() => handlePromptClick(prompt)}
                  >
                    <span className="team-recordings__ai-prompt-icon">{prompt.icon}</span>
                    <span>{prompt.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="team-recordings__ai-messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`team-recordings__ai-message team-recordings__ai-message--${msg.type}`}>
                  {msg.text}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="team-recordings__ai-input">
          <input 
            type="text" 
            placeholder="Ask a question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="team-recordings__ai-send" disabled={!query.trim()}>
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

// Recording Card Component
const RecordingCard = ({ recording, isActive, onClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div 
      className={`team-recordings__card ${isActive ? 'team-recordings__card--active' : ''}`}
      onClick={onClick}
    >
      {recording.type === 'video' && (
        <div className="team-recordings__card-video">
          {recording.thumbnail ? (
            <img src={recording.thumbnail} alt="Recording thumbnail" />
          ) : (
            <div className="team-recordings__card-placeholder">
              <VideoIcon />
            </div>
          )}
          {!isPlaying && (
            <button className="team-recordings__card-play" onClick={() => setIsPlaying(true)}>
              <PlayIcon />
            </button>
          )}
          <div className="team-recordings__card-gradient" />
        </div>
      )}
      {recording.type === 'audio' && (
        <div className="team-recordings__card-audio">
          <div className="team-recordings__card-audio-wave">
            {[...Array(20)].map((_, i) => (
              <span key={i} className="team-recordings__card-audio-bar" style={{ height: `${Math.random() * 60 + 20}%` }} />
            ))}
          </div>
          {!isPlaying && (
            <button className="team-recordings__card-play" onClick={() => setIsPlaying(true)}>
              <PlayIcon />
            </button>
          )}
        </div>
      )}
      {recording.type === 'text' && (
        <div className="team-recordings__card-text">
          <p>{recording.content}</p>
        </div>
      )}
    </div>
  );
};

// Main Component
const TeamRecordings = ({ 
  onSkip,
  onBackHome,
  onRecordVideo,
  onRecordAudio,
  onEnterText,
  onViewFullReport,
  currentUser = {
    id: 'user',
    name: 'Norman',
    avatar: 'https://i.pravatar.cc/125?img=12',
    description: 'Here is my explanation on my position',
  }
}) => {
  const [activeTeamMemberIndex, setActiveTeamMemberIndex] = useState(0);
  const [activeRecordingIndex, setActiveRecordingIndex] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [showAskAI, setShowAskAI] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [liked, setLiked] = useState({});
  const [affirmed, setAffirmed] = useState({});
  const carouselRef = useRef(null);

  // Mock team data - current user + care team
  const teamMembers = [
    {
      ...currentUser,
      isCurrentUser: true,
      recordings: [
        { id: 'r1', type: 'video', thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop' },
        { id: 'r2', type: 'audio', duration: '2:34' },
        { id: 'r3', type: 'text', content: 'I believe that quality of life is more important than quantity. My faith guides me to accept that there is a time for everything...' },
      ],
      stats: { likes: '10k', comments: '10k', shares: '10k' }
    },
    {
      id: 'dr_sarah',
      name: 'Dr. Sarah',
      avatar: 'https://i.pravatar.cc/125?img=1',
      description: 'My perspective as your primary care physician',
      isCurrentUser: false,
      recordings: [
        { id: 'r4', type: 'video', thumbnail: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=500&fit=crop' },
      ],
      stats: { likes: '5.2k', comments: '3.1k', shares: '1.2k' }
    },
    {
      id: 'mary',
      name: 'Mary',
      avatar: 'https://i.pravatar.cc/125?img=3',
      description: 'Supporting you through this journey',
      isCurrentUser: false,
      recordings: [
        { id: 'r5', type: 'video', thumbnail: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&h=500&fit=crop' },
        { id: 'r6', type: 'text', content: 'Dad, I understand your wishes and I want you to know that we will honor them...' },
      ],
      stats: { likes: '8.3k', comments: '4.5k', shares: '2.1k' }
    },
    {
      id: 'john',
      name: 'John',
      avatar: 'https://i.pravatar.cc/125?img=2',
      description: 'My thoughts on your care preferences',
      isCurrentUser: false,
      recordings: [
        { id: 'r7', type: 'audio', duration: '3:45' },
      ],
      stats: { likes: '6.7k', comments: '2.8k', shares: '1.5k' }
    },
  ];

  const activeMember = teamMembers[activeTeamMemberIndex];
  const activeRecording = activeMember.recordings[activeRecordingIndex];

  const handleSwipe = (direction) => {
    if (direction === 'left' && activeTeamMemberIndex < teamMembers.length - 1) {
      setActiveTeamMemberIndex(prev => prev + 1);
      setActiveRecordingIndex(0);
    } else if (direction === 'right' && activeTeamMemberIndex > 0) {
      setActiveTeamMemberIndex(prev => prev - 1);
      setActiveRecordingIndex(0);
    }
  };

  const handleRecordingDotClick = (index) => {
    setActiveRecordingIndex(index);
  };

  const handleLike = () => {
    setLiked(prev => ({
      ...prev,
      [activeMember.id]: !prev[activeMember.id]
    }));
  };

  const handleAffirm = () => {
    setAffirmed(prev => ({
      ...prev,
      [activeMember.id]: !prev[activeMember.id]
    }));
  };

  const handleNameClick = () => {
    setShowProfile(true);
  };

  // Touch handling for swipe
  const touchStartX = useRef(0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 50) {
      handleSwipe(diff > 0 ? 'left' : 'right');
    }
  };

  return (
    <div className="team-recordings">
      {/* Background */}
      <div className="team-recordings__background"></div>

      {/* Recording Carousel */}
      <div 
        className="team-recordings__carousel"
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="team-recordings__carousel-track"
          style={{ transform: `translateX(-${activeTeamMemberIndex * 100}%)` }}
        >
          {teamMembers.map((member, memberIdx) => (
            <div key={member.id} className="team-recordings__carousel-slide">
              <RecordingCard 
                recording={member.recordings[memberIdx === activeTeamMemberIndex ? activeRecordingIndex : 0]}
                isActive={memberIdx === activeTeamMemberIndex}
              />
            </div>
          ))}
        </div>

        {/* Recording Indicator Dots (like Instagram stories) */}
        {activeMember.recordings.length > 1 && (
          <div className="team-recordings__recording-indicators">
            {activeMember.recordings.map((_, idx) => (
              <button
                key={idx}
                className={`team-recordings__recording-dot ${idx === activeRecordingIndex ? 'active' : ''}`}
                onClick={() => handleRecordingDotClick(idx)}
              />
            ))}
          </div>
        )}

        {/* Navigation Arrows (desktop) */}
        {activeTeamMemberIndex > 0 && (
          <button 
            className="team-recordings__nav-btn team-recordings__nav-btn--prev"
            onClick={() => handleSwipe('right')}
          >
            ‹
          </button>
        )}
        {activeTeamMemberIndex < teamMembers.length - 1 && (
          <button 
            className="team-recordings__nav-btn team-recordings__nav-btn--next"
            onClick={() => handleSwipe('left')}
          >
            ›
          </button>
        )}
      </div>

      {/* User Info */}
      <div className="team-recordings__user-info">
        <div className="team-recordings__avatar" onClick={handleNameClick}>
          <img src={activeMember.avatar} alt={activeMember.name} />
        </div>
        <h2 className="team-recordings__name team-recordings__name--clickable" onClick={handleNameClick}>
          {activeMember.name}
        </h2>
        <p className="team-recordings__description">{activeMember.description}</p>

        {/* Affirm Button - Only for other team members */}
        {!activeMember.isCurrentUser && (
          <button 
            className={`team-recordings__affirm-btn ${affirmed[activeMember.id] ? 'affirmed' : ''}`}
            onClick={handleAffirm}
          >
            <span className="btn-text-default">
              {affirmed[activeMember.id] ? 'Commitment Affirmed' : 'Affirm Commitment'}
            </span>
            {affirmed[activeMember.id] && (
              <span className="btn-text-hover">Undo</span>
            )}
          </button>
        )}

        {/* Social Interactions */}
        <div className="team-recordings__social">
          <button 
            className={`team-recordings__social-btn ${liked[activeMember.id] ? 'liked' : ''}`}
            onClick={handleLike}
          >
            <HeartIcon filled={liked[activeMember.id]} />
            <span>{activeMember.stats.likes}</span>
          </button>
          <button 
            className="team-recordings__social-btn"
            onClick={() => setShowComments(true)}
          >
            <CommentIcon />
            <span>{activeMember.stats.comments}</span>
          </button>
          <button className="team-recordings__social-btn">
            <ShareIcon />
            <span>{activeMember.stats.shares}</span>
          </button>
          <button 
            className="team-recordings__social-btn team-recordings__social-btn--ai"
            onClick={() => setShowAskAI(true)}
          >
            <AiIcon />
            <span>Ask AI</span>
          </button>
        </div>

        {/* Record Options - Only for current user */}
        {activeMember.isCurrentUser && (
          <div className="team-recordings__record-options">
            <button className="team-recordings__record-option" onClick={onRecordVideo}>
              <div className="team-recordings__record-icon">
                <VideoIcon />
              </div>
              <span>RECORD<br/>VIDEO</span>
            </button>
            <button className="team-recordings__record-option" onClick={onRecordAudio}>
              <div className="team-recordings__record-icon">
                <MicIcon />
              </div>
              <span>RECORD<br/>AUDIO</span>
            </button>
            <button className="team-recordings__record-option" onClick={onEnterText}>
              <div className="team-recordings__record-icon">
                <TextIcon />
              </div>
              <span>ENTER<br/>TEXT</span>
            </button>
          </div>
        )}
      </div>

      {/* Team Member Dots */}
      <div className="team-recordings__team-dots">
        {teamMembers.map((member, idx) => (
          <button
            key={member.id}
            className={`team-recordings__team-dot ${idx === activeTeamMemberIndex ? 'active' : ''}`}
            onClick={() => {
              setActiveTeamMemberIndex(idx);
              setActiveRecordingIndex(0);
            }}
          >
            <img src={member.avatar} alt={member.name} />
          </button>
        ))}
      </div>

      {/* Back to Home Button */}
      <div className="team-recordings__actions">
        <button className="team-recordings__skip-btn" onClick={onBackHome}>
          Back to Home
        </button>
      </div>

      {/* Panels */}
      <CommentsPanel 
        isOpen={showComments} 
        onClose={() => setShowComments(false)}
        userName={activeMember.name}
      />
      <AskAIPanel 
        isOpen={showAskAI} 
        onClose={() => setShowAskAI(false)}
        userName={activeMember.name}
      />
      <ProfileSummaryPanel 
        isOpen={showProfile} 
        onClose={() => setShowProfile(false)}
        member={activeMember}
        isCurrentUser={activeMember.isCurrentUser}
        onAffirm={handleAffirm}
        hasAffirmed={affirmed[activeMember.id]}
        onViewFullReport={onViewFullReport}
      />
    </div>
  );
};

export default TeamRecordings;
