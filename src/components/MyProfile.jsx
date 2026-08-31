import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

import Header from './Header'
import Loader from './Loader'
import FailureView from './FailureView'
import Profile from './Profile'

const myProfileApiUrl = '/insta-share/my-profile'

function MyProfile() {
  const [profileDetails, setProfileDetails] = useState(null)
  const [apiStatus, setApiStatus] = useState('loading')

  const getMyProfile = async () => {
    setApiStatus('loading')

    try {
      const jwtToken = Cookies.get('jwt_token')
      const response = await axios.get(myProfileApiUrl, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })

      setProfileDetails(response.data.profile)
      setApiStatus('success')
    } catch (error) {
      setApiStatus('failure')
    }
  }

  useEffect(() => {
    getMyProfile()
  }, [])

  return (
    <>
      <Header />

      <main className="page profile-page">
        {apiStatus === 'loading' && <Loader />}
        {apiStatus === 'failure' && <FailureView onRetry={getMyProfile} />}
        {apiStatus === 'success' && profileDetails && (
          <Profile profileDetails={profileDetails} altPrefix="my" />
        )}
      </main>
    </>
  )
}

export default MyProfile

