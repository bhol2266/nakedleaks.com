import React from 'react'
import { DiscussionEmbed } from 'disqus-react'

const DisqusComments = ({ data }) => {


  const pageurl = typeof window !== 'undefined' ? window.location.href : ""
  const disqusConfig = {
    url: pageurl,
    identifier: data.identifier,
    title: data.title
  }
  return (
    <div className='mt-6'>

      <DiscussionEmbed shortname='https-www-hindisexstory-app' config={disqusConfig} />

    </div>

  )
}

export default DisqusComments