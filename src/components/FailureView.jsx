import React from 'react'

import './FailureView.css'

function FailureView({ onRetry }) {
  return (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/dxv77whnp/image/upload/v1655018649/Group_7522_rpl79k.png"
        alt="failure view"
        className="not-found-image"
      />

      <p className="failure-text">
        Something went wrong. Please try again
      </p>

      <button type="button" className="retry-button" onClick={onRetry}>
        Try again
      </button>
    </div>
  )
}

export default FailureView