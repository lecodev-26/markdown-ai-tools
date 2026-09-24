import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link
          to="/"
          className="brand"
          aria-label="Markdown AI Tools home"
        >
          <img
            src="/apple-touch-icon.png"
            alt=""
            width="32"
            height="32"
            className="brand-logo"
          />

          <span className="brand-name">
            Markdown AI Tools
          </span>
        </Link>

        <nav
          className="site-nav mono"
          aria-label="Main navigation"
        >
          <NavLink
            to="/text-to-table"
            className="nav-link"
          >
            Text → Table
          </NavLink>

          <NavLink
            to="/csv-to-table"
            className="nav-link"
          >
            CSV → MD
          </NavLink>

          <NavLink
            to="/cleaner"
            className="nav-link"
          >
            Cleaner
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
