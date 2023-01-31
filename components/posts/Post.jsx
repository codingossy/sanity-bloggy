import React from 'react'
import PostCard from './PostCard'

const Post = ( {getAllPosts}) => {
    const {authorImage, name} = getAllPosts
  return (
    <section>
        <h1 className='text-center text-2xl capitalize '>all posts</h1>
        <p className='text-center italic text-gray-300'>all posts from me</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full place-items-center gap-y-10 gap-x-10 my-10 md:my-14'>
            {getAllPosts.map((posts, id) => (
                <>
                    <PostCard posts={posts} authorImage={authorImage} name={name} />
                </>
            ))}

        </div>
    </section>
  )
}

export default Post