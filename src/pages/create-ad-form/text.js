import React from 'react'
import MediaComponent from '../../components/MediaComponent'
import Navbar from '../../components/Navbar'

const text = () => {
  return (
    <div>
      <Navbar />
        <MediaComponent text={"true"}/>
    </div>
  )
}

export default text