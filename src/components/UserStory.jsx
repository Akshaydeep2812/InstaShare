import React from 'react'

import './UserStory.css'

function UserStory({ story, onSelectStory }) {
  const selectStory = () => onSelectStory(story)

  return (
    <button type="button" className="story" onClick={selectStory}>
      <img src={story.story_url} alt="user story" className="story-image" />
      <span className="story-name">{story.user_name}</span>
    </button>
  )
}

export default UserStory
