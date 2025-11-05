import { useState } from 'react'

const Blog = ({ blog }) => {
    const [isDetailed, setIsDetailed] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={blogStyle}>
            <h3>{blog.title} <button onClick={() => setIsDetailed(p => !p)}>{isDetailed ? 'Hide details' : 'Show details'}</button></h3>
            {
                isDetailed && (
                    <div>
                        <p>Author: {blog.author}</p>
                        <p>Likes: {blog.likes} <button>Like</button></p>
                        <p>URL: {blog.url}</p>
                        <p>Submitted by: {blog.user.username}</p>
                    </div>
                )
            }
        </div>
    )
}

export default Blog