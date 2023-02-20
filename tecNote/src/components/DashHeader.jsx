import React from 'react'
import { Link } from 'react-router-dom'

const DashHeader = () => {
    const content =(
        <header className="dash-header">
            <div className="dash_header_container">
                <Link to='/dash'>
                    <h1 className="dash_header_title">tecNote</h1>
                </Link>
                <nav className="dash-header_nav">
                    {/* add nav button later */}
                </nav>
            </div>
        </header>
    )
  return content
}

export default DashHeader
