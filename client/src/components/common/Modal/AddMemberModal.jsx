import React, { useState } from 'react';
import Modal from './Modal';
import './AddMemberModal.css';

// Team icon for header
const TeamIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="10" r="4" fill="#B432A3"/>
    <circle cx="8" cy="12" r="3" fill="#5C40FB"/>
    <circle cx="24" cy="12" r="3" fill="#5C40FB"/>
    <path d="M16 16C12 16 9 19 9 22V24H23V22C23 19 20 16 16 16Z" fill="#B432A3"/>
    <path d="M8 17C5.5 17 4 19 4 21V23H9V21C9 19.5 9.5 18 10.5 17H8Z" fill="#5C40FB"/>
    <path d="M24 17H21.5C22.5 18 23 19.5 23 21V23H28V21C28 19 26.5 17 24 17Z" fill="#5C40FB"/>
  </svg>
);

const AddMemberModal = ({
  isOpen,
  onClose,
  onAddMember,
  onInviteMember,
  onRemind,
  onRevoke,
  sentInvites = [],
  userName = "Norman",
  userAvatar = "https://i.pravatar.cc/82?img=12"
}) => {
  const [activeTab, setActiveTab] = useState('invite'); // 'invite' or 'sent'
  const [emails, setEmails] = useState('');
  const [role, setRole] = useState('family');
  const [selectedInvites, setSelectedInvites] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default sent invites for demo
  const defaultSentInvites = [
    { id: 1, email: "gillian.anderson@gmail.com", status: "joined", date: "9:35 AM FRI 12 SEP 2025" },
    { id: 2, email: "charlize.theron@gmail.com", status: "sent", date: "9:35 AM FRI 12 SEP 2025" },
    { id: 3, email: "ana.de.armas@gmail.com", status: "opened", date: "9:35 AM FRI 12 SEP 2025" }
  ];

  const displayInvites = sentInvites.length > 0 ? sentInvites : defaultSentInvites;

  // Calculate stats
  const stats = {
    sent: displayInvites.length,
    opened: displayInvites.filter(i => i.status === 'opened' || i.status === 'joined').length,
    joined: displayInvites.filter(i => i.status === 'joined').length
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emails.trim()) return;

    setIsSubmitting(true);
    try {
      // Parse multiple emails (comma or newline separated)
      const emailList = emails.split(/[,\n]/).map(e => e.trim()).filter(e => e);

      for (const email of emailList) {
        if (onInviteMember) {
          await onInviteMember({ email, role });
        } else if (onAddMember) {
          await onAddMember({ email, role });
        }
      }
      // Reset form
      setEmails('');
      setRole('family');
      // Switch to sent tab to show the invites
      setActiveTab('sent');
    } catch (error) {
      console.error('Error sending invites:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmails('');
    setRole('family');
    setActiveTab('invite');
    setSelectedInvites([]);
    onClose();
  };

  const toggleInviteSelection = (inviteId) => {
    setSelectedInvites(prev =>
      prev.includes(inviteId)
        ? prev.filter(id => id !== inviteId)
        : [...prev, inviteId]
    );
  };

  const handleRemind = () => {
    if (onRemind && selectedInvites.length > 0) {
      onRemind(selectedInvites);
    }
  };

  const handleRevoke = () => {
    if (onRevoke && selectedInvites.length > 0) {
      onRevoke(selectedInvites);
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'joined': return 'JOINED';
      case 'opened': return 'OPENED';
      case 'sent': return 'SENT';
      default: return 'PENDING';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'joined': return 'add-member-modal__invite-status--joined';
      case 'opened': return 'add-member-modal__invite-status--opened';
      default: return 'add-member-modal__invite-status--sent';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} showCloseButton={false} size="medium">
      <div className="add-member-modal">
        {/* Header */}
        <div className="add-member-modal__header">
          <TeamIcon />
          <h2 className="add-member-modal__title">Create your Care Team</h2>
        </div>

        {/* Tabs */}
        <div className="add-member-modal__tabs">
          <button
            type="button"
            className={`add-member-modal__tab ${activeTab === 'invite' ? 'add-member-modal__tab--active' : ''}`}
            onClick={() => setActiveTab('invite')}
          >
            Invite by Email
          </button>
          <button
            type="button"
            className={`add-member-modal__tab ${activeTab === 'sent' ? 'add-member-modal__tab--active' : ''}`}
            onClick={() => setActiveTab('sent')}
          >
            Sent Invites
          </button>
        </div>

        {/* Invite Tab Content */}
        {activeTab === 'invite' && (
          <form onSubmit={handleSubmit} className="add-member-modal__invite-form">
            {/* Email Input */}
            <div className="add-member-modal__field">
              <input
                type="text"
                className="add-member-modal__email-input"
                placeholder="Add multiple email addresses here..."
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
              />
            </div>

            {/* Role Selection */}
            <div className="add-member-modal__field">
              <label htmlFor="member-role" className="add-member-modal__label">
                Role
              </label>
              <select
                id="member-role"
                className="add-member-modal__select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="family">Family Member</option>
                <option value="doctor">Doctor / Physician</option>
                <option value="nurse">Nurse</option>
                <option value="caregiver">Caregiver</option>
                <option value="friend">Friend</option>
                <option value="other">Other</option>
              </select>
            </div>

            <p className="add-member-modal__limit-text">
              Maximum 5 members that join your care team (for optimal decision-making and collaboration).
            </p>

            {/* Message Preview */}
            <div className="add-member-modal__message-preview">
              <div className="add-member-modal__message-header">
                <img
                  src={userAvatar}
                  alt={userName}
                  className="add-member-modal__message-avatar"
                />
                <span className="add-member-modal__message-greeting">Hello there!</span>
              </div>
              <p className="add-member-modal__message-text">
                I'm reaching out to ask you to join my advance care team so we can teamwork and see through our advance care plans together, interdependently, as A Whole Family Matter. Thank you!
              </p>
            </div>

            {/* Actions */}
            <div className="add-member-modal__actions">
              <button
                type="submit"
                className="add-member-modal__btn add-member-modal__btn--primary"
                disabled={isSubmitting || !emails.trim()}
              >
                {isSubmitting ? 'Sending...' : 'Send Invites'}
                <span className="add-member-modal__btn-arrow">→</span>
              </button>
              <button
                type="button"
                className="add-member-modal__btn add-member-modal__btn--secondary"
                onClick={handleClose}
              >
                Exit
                <span className="add-member-modal__btn-arrow">←</span>
              </button>
            </div>
          </form>
        )}

        {/* Sent Invites Tab Content */}
        {activeTab === 'sent' && (
          <div className="add-member-modal__sent-content">
            {/* Stats */}
            <div className="add-member-modal__stats">
              <div className="add-member-modal__stat">
                <span className="add-member-modal__stat-number">{stats.sent}</span>
                <span className="add-member-modal__stat-label">Sent</span>
              </div>
              <div className="add-member-modal__stat">
                <span className="add-member-modal__stat-number">{stats.opened}</span>
                <span className="add-member-modal__stat-label">Opened</span>
              </div>
              <div className="add-member-modal__stat">
                <span className="add-member-modal__stat-number">{stats.joined}</span>
                <span className="add-member-modal__stat-label">Joined</span>
              </div>
            </div>

            {/* Invite List */}
            <div className="add-member-modal__invite-list">
              {displayInvites.map((invite) => (
                <div
                  key={invite.id}
                  className={`add-member-modal__invite-item ${selectedInvites.includes(invite.id) ? 'add-member-modal__invite-item--selected' : ''}`}
                  onClick={() => toggleInviteSelection(invite.id)}
                >
                  <div className="add-member-modal__invite-checkbox">
                    <div className={`add-member-modal__checkbox ${selectedInvites.includes(invite.id) ? 'add-member-modal__checkbox--checked' : ''}`}>
                      {selectedInvites.includes(invite.id) && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="add-member-modal__invite-details">
                    <span className="add-member-modal__invite-email">{invite.email}</span>
                    <span className={`add-member-modal__invite-status ${getStatusClass(invite.status)}`}>
                      {getStatusLabel(invite.status)} {invite.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="add-member-modal__actions">
              <button
                type="button"
                className="add-member-modal__btn add-member-modal__btn--primary"
                onClick={handleRemind}
                disabled={selectedInvites.length === 0}
              >
                Remind
              </button>
              <button
                type="button"
                className="add-member-modal__btn add-member-modal__btn--secondary"
                onClick={handleRevoke}
                disabled={selectedInvites.length === 0}
              >
                Revoke
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default AddMemberModal;
