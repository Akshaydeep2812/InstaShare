import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import SliderModule from 'react-slick'

import './UserStories.css'
import Loader from './Loader'
import FailureView from './FailureView'
import UserStory from './UserStory'
import UserStoriesModal from './UserStoriesModal'

const Slider = SliderModule.default !== undefined ? SliderModule.default : SliderModule

const storiesApiUrl = '/api/insta-share/stories'

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 8,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 6, slidesToScroll: 3 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 4, slidesToScroll: 2 },
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 3, slidesToScroll: 1 },
    },
  ],
}

function UserStories() {
  const [stories, setStories] = useState([])
  const [apiStatus, setApiStatus] = useState('loading')
  const [selectedStory, setSelectedStory] = useState(null)

  const getStories = async () => {
    setApiStatus('loading')

    try {
      const jwtToken = Cookies.get('jwt_token')
      const response = await axios.get(storiesApiUrl, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })

      setStories(response.data.users_stories)
      setApiStatus('success')
    } catch (error) {
      setApiStatus('failure')
    }
  }

  useEffect(() => {
    getStories()
  }, [])

  const handleSelectStory = (story) => setSelectedStory(story)
  const handleCloseModal = () => setSelectedStory(null)

  if (apiStatus === 'loading') {
    return <Loader />
  }

  if (apiStatus === 'failure') {
    return <FailureView onRetry={getStories} />
  }

  return (
    <div className="stories">
      <ul className="stories-list">
        <Slider {...sliderSettings}>
          {stories.map((eachStory) => (
            <li key={eachStory.user_id} className="story-item">
              <UserStory
                story={eachStory}
                onSelectStory={handleSelectStory}
              />
            </li>
          ))}
        </Slider>
      </ul>

      {selectedStory !== null && (
        <UserStoriesModal story={selectedStory} onClose={handleCloseModal} />
      )}
    </div>
  )
}

export default UserStories

