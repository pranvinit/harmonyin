import React from 'react';
import { Post } from './post'
import './posts.css'

export function Posts({ posts, admin, addAdminOptions, handleDeleteRes }) {
    return (
        <div className="postContainer">
            {
                posts.map((post, index) => {
                    return <Post key={index} post={post} index={index} admin={admin} addAdminOptions={addAdminOptions} handleDeleteRes={handleDeleteRes} />
                })
            }
        </div>

    )
}
