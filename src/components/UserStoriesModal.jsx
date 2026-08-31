import React from 'react'

import './UserStoriesModal.css'

function UserStoriesModal({ story, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className="modal-close-button"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        <img src={story.story_url} alt="user story" className="modal-story-image" />

        <p className="modal-username">{story.user_name}</p>
      </div>
    </div>
  )
}

export default UserStoriesModal
