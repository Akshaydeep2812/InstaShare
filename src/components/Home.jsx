import React, { useState } from 'react'

import './Home.css'
import Header from './Header'
import UserStories from './UserStories'
import PostsList from './PostsList'

function Home() {
  const [searchInput, setSearchInput] = useState('')

  return (
    <>
      <Header onSearch={setSearchInput} />

      <main className="home-page">
        <UserStories />

        <div className="page">
          <PostsList searchInput={searchInput} />
        </div>
      </main>
    </>
  )
}

export default Home
