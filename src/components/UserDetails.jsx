import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'

import Header from './Header'
import Loader from './Loader'
import FailureView from './FailureView'
import Profile from './Profile'

const userApiUrl = '/api/insta-share/users/'

function UserDetails() {
  const { id } = useParams()
  const [profileDetails, setProfileDetails] = useState(null)
  const [apiStatus, setApiStatus] = useState('loading')

  const getUserProfile = async () => {
    setApiStatus('loading')

    try {
      const jwtToken = Cookies.get('jwt_token')
      const response = await axios.get(`${userApiUrl}${id}`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })

      setProfileDetails(response.data.user_details)
      setApiStatus('success')
    } catch (error) {
      setApiStatus('failure')
    }
  }

  useEffect(() => {
    getUserProfile()
  }, [id])

  return (
    <>
      <Header />

      <main className="page profile-page">
        {apiStatus === 'loading' && <Loader />}
        {apiStatus === 'failure' && <FailureView onRetry={getUserProfile} />}
        {apiStatus === 'success' && profileDetails && (
          <Profile profileDetails={profileDetails} altPrefix="user" />
        )}
      </main>
    </>
  )
}

export default UserDetails

