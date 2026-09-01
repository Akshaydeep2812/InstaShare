import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'

import './Post.css'
import PostActions from './PostActions'

const likePost = (postId, likeStatus) => {
  const jwtToken = Cookies.get('jwt_token')
  return axios.post(
    `/api/insta-share/posts/${postId}/like`,
    { like_status: likeStatus },
    {
      headers: { Authorization: `Bearer ${jwtToken}` },
    },
  )
}

function Post({ post }) {
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(post.likes_count)

  const handleToggleLike = async () => {
    const nextLikeStatus = !liked

    try {
      await likePost(post.post_id, nextLikeStatus)
      setLiked(nextLikeStatus)
      setLikesCount((previousCount) =>
        nextLikeStatus ? previousCount + 1 : previousCount - 1,
      )
    } catch (error) {
      return
    }
  }

  return (
    <li className="post">
      <div className="post-header">
        <Link to={`/users/${post.user_id}`} className="post-author-link">
          <img
            src={post.profile_pic}
            alt="post author profile"
            className="author-pic"
          />
          <span className="post-author-name">{post.user_name}</span>
        </Link>
      </div>

      <img src={post.post_details.image_url} alt="post" className="post-image" />

      <div className="post-body">
        <PostActions liked={liked} onToggleLike={handleToggleLike} />

        <p className="likes-count">{likesCount} likes</p>

        <p className="post-caption">{post.post_details.caption}</p>

        {post.comments && post.comments.length > 0 && (
          <ul className="comments-list">
            {post.comments.map((eachComment, index) => (
              <li key={`${eachComment.user_id}-${index}`} className="comment-item">
                <span className="comment-user-name">{eachComment.user_name}</span>
                <p className="comment-text">{eachComment.comment}</p>
              </li>
            ))}
          </ul>
        )}

        <p className="created-at">{post.created_at}</p>
      </div>
    </li>
  )
}

export default Post

