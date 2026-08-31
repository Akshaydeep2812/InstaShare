import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
import { IoCloseCircle } from 'react-icons/io5'

import './Header.css'

function Header({ onSearch }) {
  const [searchInput, setSearchInput] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const navigate = useNavigate()

  const handleSearchSubmit = (event) => {
    if (event) {
      event.preventDefault()
    }
    if (onSearch) {
      onSearch(searchInput.trim())
    }
  }

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', { replace: true })
  }

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="website-logo-link">
          <img
            src="/insta-share-logo.svg"
            alt="website logo"
            className="website-logo"
          />
          <h1 className="website-title">Insta Share</h1>
        </Link>

        {/* Desktop Search & Nav */}
        <div className="desktop-header-right">
          <form className="search-container" onSubmit={handleSearchSubmit}>
            <input
              type="search"
              className="search-input"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search Caption"
            />
            <button
              type="submit"
              data-testid="searchIcon"
              className="search-button"
              aria-label="Search"
              onClick={handleSearchSubmit}
            >
              <FaSearch className="search-icon" />
            </button>
          </form>

          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/my-profile" className="nav-link">
                Profile
              </Link>
            </li>
          </ul>

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* Mobile Header Controls */}
        <div className="mobile-header-controls">
          <button
            type="button"
            className="mobile-icon-button"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            aria-label="Toggle Search"
          >
            <FaSearch />
          </button>
          <button
            type="button"
            className="mobile-icon-button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            <FiMenu />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <form className="mobile-search-bar" onSubmit={handleSearchSubmit}>
          <input
            type="search"
            className="search-input"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search Caption"
          />
          <button
            type="submit"
            data-testid="searchIcon"
            className="search-button"
            aria-label="Search"
            onClick={handleSearchSubmit}
          >
            <FaSearch className="search-icon" />
          </button>
        </form>
      )}

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="mobile-menu-dropdown">
          <ul className="mobile-nav-links">
            <li>
              <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/my-profile"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button
            type="button"
            className="mobile-close-button"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close Menu"
          >
            <IoCloseCircle />
          </button>
        </div>
      )}
    </header>
  )
}

export default Header

