import React, { useState } from 'react'

import './CommentSection.css'

function CommentSection({ comments }) {
  const [allComments, setAllComments] = useState(comments)
  const [newComment, setNewComment] = useState('')

  const handleAddComment = (event) => {
    event.preventDefault()

    const commentText = newComment.trim()

    if (commentText === '') {
      return
    }

    setAllComments((previousComments) => [
      ...previousComments,
      { comment: commentText, user_id: 'you', user_name: 'You' },
    ])

    setNewComment('')
  }

  return (
    <div className="comments-section">
      <ul className="comments-list">
        {allComments.map((eachComment, index) => (
          <li key={`${eachComment.user_id}-${index}`} className="comment-item">
            <span className="comment-user">{eachComment.user_name}</span>
            <p className="comment-text">{eachComment.comment}</p>
          </li>
        ))}
      </ul>

      <form className="comment-form" onSubmit={handleAddComment}>
        <input
          type="text"
          className="comment-input"
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
          placeholder="Type a comment..."
        />

        <button type="submit" className="comment-add-button">
          Add
        </button>
      </form>
    </div>
  )
}

export default CommentSection
