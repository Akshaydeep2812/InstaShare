import React from 'react'
import { BsGrid3X3 } from 'react-icons/bs'
import { BiCamera } from 'react-icons/bi'

import './Profile.css'

function Profile({ profileDetails, altPrefix }) {
  const {
    user_id,
    user_name,
    profile_pic,
    posts_count,
    followers_count,
    following_count,
    user_bio,
    posts = [],
    stories = [],
  } = profileDetails

  const hasPosts = posts && posts.length > 0

  return (
    <div className="profile">
      <div className="profile-header">
        <img
          src={profile_pic}
          alt={`${altPrefix} profile`}
          className="profile-pic"
        />

        <div className="profile-info">
          <h1 className="profile-username">{user_name}</h1>

          <ul className="profile-stats">
            <li className="stat-item">
              <span className="stat-count">{posts_count}</span> posts
            </li>
            <li className="stat-item">
              <span className="stat-count">{followers_count}</span> followers
            </li>
            <li className="stat-item">
              <span className="stat-count">{following_count}</span> following
            </li>
          </ul>

          <p className="profile-user-id">{user_id}</p>
          <p className="profile-bio">{user_bio}</p>
        </div>
      </div>

      <ul className="profile-stories">
        {stories.map((eachStory) => (
          <li key={eachStory.id}>
            <img
              src={eachStory.image}
              alt={`${altPrefix} story`}
              className="profile-story-image"
            />
          </li>
        ))}
      </ul>

      <div className="posts-section">
        <div className="posts-heading-container">
          <BsGrid3X3 className="posts-grid-icon" />
          <h1 className="posts-heading">Posts</h1>
        </div>

        {hasPosts ? (
          <ul className="posts-grid">
            {posts.map((eachPost) => (
              <li key={eachPost.id} className="grid-post-item">
                <img
                  src={eachPost.image}
                  alt={`${altPrefix} post`}
                  className="grid-post-image"
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-posts-view">
            <div className="no-posts-icon-container">
              <BiCamera className="no-posts-icon" />
            </div>
            <h1 className="no-posts-heading">No Posts</h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile

