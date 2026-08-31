import React from 'react'

import './Loader.css'

function Loader() {
  return (
    <div className="loader-container" data-testid="loader">
      <div className="spinner" />
    </div>
  )
}

export default Loader
