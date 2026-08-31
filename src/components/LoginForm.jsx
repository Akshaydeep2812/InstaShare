import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

import './LoginForm.css'

function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmitSuccess = (jwtToken) => {
    Cookies.set('jwt_token', jwtToken, 30)
    navigate('/', { replace: true })
  }

  const handleSubmitFailure = (message) => {
    setShowSubmitError(true)
    setErrorMsg(message)
  }

  const submitForm = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await axios.post('/login', {
        username,
        password,
      })

      handleSubmitSuccess(response.data.jwt_token)
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.error_msg
          ? error.response.data.error_msg
          : 'Something went wrong. Please try again.'

      handleSubmitFailure(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="login-page">
      <div className="login-image-container">
        <img
          src="/website-login.svg"
          alt="website login"
          className="login-image"
        />
      </div>

      <form className="login-form" onSubmit={submitForm}>
        <img
          src="/insta-share-logo.svg"
          alt="website logo"
          className="login-website-logo"
        />

        <h1 className="login-title">Insta Share</h1>

        <div className="input-field">
          <label htmlFor="username">USERNAME</label>
          <input
            id="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className="input-field">
          <label htmlFor="password">PASSWORD</label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        {showSubmitError && <p className="error-message">{errorMsg}</p>}

        <button type="submit" className="login-button" disabled={isSubmitting}>
          Login
        </button>

        <p className="login-hint">Use rahul / rahul&#64;2021 to explore</p>
      </form>
    </main>
  )
}

export default LoginForm

