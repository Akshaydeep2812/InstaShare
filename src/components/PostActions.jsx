import React from 'react'
import { BsHeart } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa'
import { BiShareAlt } from 'react-icons/bi'
import { FcLike } from 'react-icons/fc'

import './PostActions.css'

function PostActions({ liked, onToggleLike }) {
  return (
    <div className="post-actions">
      <button
        type="button"
        className="action-button"
        data-testid={liked ? 'unLikeIcon' : 'likeIcon'}
        aria-label={liked ? 'Unlike post' : 'Like post'}
        onClick={onToggleLike}
      >
        {liked ? <FcLike /> : <BsHeart />}
      </button>

      <button
        type="button"
        className="action-button"
        aria-label="Comment on post"
      >
        <FaRegComment />
      </button>

      <button type="button" className="action-button" aria-label="Share post">
        <BiShareAlt />
      </button>
    </div>
  )
}

export default PostActions

