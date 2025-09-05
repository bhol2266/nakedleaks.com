import React from 'react'
import PicsThumbnail from './PicsThumbnail'

const Posts = ({ posts }) => {
  return (
    <div className="
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      xl:grid-cols-3
      2xl:grid-cols-4
      3xl:grid-cols-6
      gap-2 md:gap-3 lg:gap-4
    ">
      {posts.map((obj) => (
        <PicsThumbnail key={obj.title} data={obj} />
      ))}
    </div>
  )
}

export default Posts
