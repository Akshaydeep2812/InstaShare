import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

import './PostsList.css'
import Loader from './Loader'
import FailureView from './FailureView'
import Post from './Post'

const postsApiUrl = '/api/insta-share/posts'

function PostsList({ searchInput }) {
  const [posts, setPosts] = useState([])
  const [apiStatus, setApiStatus] = useState('loading')

  const getPosts = async () => {
    setApiStatus('loading')

    try {
      const requestUrl = searchInput
        ? `${postsApiUrl}?search=${encodeURIComponent(searchInput)}`
        : postsApiUrl

      const jwtToken = Cookies.get('jwt_token')
      const response = await axios.get(requestUrl, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })

      setPosts(response.data.posts)
      setApiStatus('success')
    } catch (error) {
      setApiStatus('failure')
    }
  }

  useEffect(() => {
    getPosts()
  }, [searchInput])

  const renderNoResultsView = () => (
    <div className="search-not-found-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="search not found"
        className="not-found-image"
      />
      <h1 className="search-not-found-heading">Search Not Found</h1>
      <p className="search-not-found-text">
        Try different keyword or search again
      </p>
    </div>
  )

  switch (apiStatus) {
    case 'loading':
      return <Loader />

    case 'failure':
      return <FailureView onRetry={getPosts} />

    default:
      if (posts.length === 0) {
        return searchInput ? (
          renderNoResultsView()
        ) : (
          <div className="no-posts-view">
            <h1>No Posts Yet</h1>
          </div>
        )
      }

      return (
        <div className="posts-container">
          {searchInput && <h1 className="search-results-heading">Search Results</h1>}
          <ul className="posts-list">
            {posts.map((eachPost) => (
              <Post key={eachPost.post_id} post={eachPost} />
            ))}
          </ul>
        </div>
      )
  }
}

export default PostsList

