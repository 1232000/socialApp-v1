import React from 'react'
import error from '../../../assets/images/error.png';

export default function NotFound() {
  return (
  <>
    <div className="container">
      <div className="min-h-page flex justify-center items-center">
        <img src={error} alt="Error 404" />
      </div>
    </div>
  </>

  )
}
