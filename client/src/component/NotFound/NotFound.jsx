import React from 'react'
import { Link } from 'react-router-dom'
import "./NotFound.scss"
function NotFound() {
  return (
    <div className="notFound">
      <div className="details">
        <h1>404 (Not Found) 😫</h1>
        <Link to="/">Return to HomePage</Link>
      </div>
    </div>
  );
}

export default NotFound