import React from 'react'
import { Link } from 'react-router-dom'

import './NotFound.css'

function NotFound() {
  return (
    <main className="not-found-view">
      <img
        src="https://res.cloudinary.com/dxv77whnp/image/upload/v1655018650/Group_7737_y1bg7a.png"
        alt="page not found"
        className="not-found-image"
      />

      <h1 className="not-found-heading">PAGE NOT FOUND</h1>

      <p className="failure-text">
        we are sorry, the page you requested could not be found
      </p>

      <Link to="/">
        <button type="button" className="go-home-button">
          Home Page
        </button>
      </Link>
    </main>
  )
}

export default NotFound

